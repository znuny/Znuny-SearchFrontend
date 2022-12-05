# --
# Copyright (C) 2001-2021 OTRS AG, https://otrs.com/
# Copyright (C) 2021-2022 Znuny GmbH, https://znuny.org/
# --
# This software comes with ABSOLUTELY NO WARRANTY. For details, see
# the enclosed file COPYING for license information (GPL). If you
# did not receive this file, see https://www.gnu.org/licenses/gpl-3.0.txt.
# --

package Kernel::Modules::ZnunySearchFrontend;

use strict;
use warnings;

use Kernel::System::VariableCheck qw(IsHashRefWithData IsArrayRefWithData);

our $ObjectManagerDisabled = 1;

sub new {
    my ( $Type, %Param ) = @_;

    # allocate new hash for object
    my $Self = {%Param};
    bless( $Self, $Type );

    $Self->{SearchObject} = $Kernel::OM->Get('Kernel::System::Search');

    $Self->{ActiveEngine} = $Self->{SearchObject}->{Config}->{ActiveEngine};
    $Self->{Connection} = $Self->{SearchObject}->{ConnectObject} ? 1 : 0;

    return $Self;
}

sub Run {
    my ( $Self, %Param ) = @_;

    # get needed object
    my $ConfigObject = $Kernel::OM->Get('Kernel::Config');
    my $LayoutObject = $Kernel::OM->Get('Kernel::Output::HTML::Layout');
    my $OperatorsConfig = $ConfigObject->Get('Loader::ZnunySearchFrontendOperators')->{'000-Framework'};
    my $FieldsConfig = $ConfigObject->Get('Loader::ZnunySearchFrontendFields')->{'000-Framework'};

    my $ParamObject = $Kernel::OM->Get('Kernel::System::Web::Request');
    my $JSONTicketIDs = $ParamObject->GetParam( Param => 'TicketIDs');
    my $JSONQueryParams = $ParamObject->GetParam( Param => 'QueryParams');
    my $JSONView = $ParamObject->GetParam( Param => 'View');
    
    my $JSONObject = $Kernel::OM->Get('Kernel::System::JSON');
    my $TicketIDs = $JSONObject->Decode( Data => $JSONTicketIDs);
    my $QueryParams = $JSONObject->Decode( Data => $JSONQueryParams);
    my $View = $JSONObject->Decode( Data => $JSONView);
    $View = $View ? $View : 'Small';

    my $Output = $LayoutObject->Header();
    $Output .= $LayoutObject->NavigationBar();

    # build output
    $Output .= $LayoutObject->Output(
        TemplateFile => 'ZnunySearchFrontend',
        Data => {
            ActiveEngine => $Self->{ActiveEngine},
            Connection => $Self->{Connection},
        }
    );
    

    if($Self->{Subaction} eq "GetInitialData") {
        # challenge token check for write action

        my @Config;
        my $SearchTicketObject = $Kernel::OM->Get('Kernel::System::Search::Object::Default::Ticket');
        my $Labels = $SearchTicketObject->{Fields};

        # my @Operators = map { $_ = { label => $_, code => $_ } } @{$OperatorsConfig};

        use Data::Dumper;
        $Kernel::OM->Get('Kernel::System::Log')->Log(
           Priority => 'error',
           Message  => "Run ".Dumper($OperatorsConfig )
        );

        for my $Field (keys %{ $FieldsConfig->{Ticket} }) {
            if(grep { $_ =~ $Field } keys %{ $Labels } ) {

                my $ConfigItem;

                $ConfigItem->{label} = $Field;
                my @FieldOperators;
                for my $Key (keys %{$OperatorsConfig->{$Field}}) {
                    push @FieldOperators, { label => $Key, code => $OperatorsConfig->{$Field}->{$Key} };
                }
                $ConfigItem->{operators} = \@FieldOperators;

                if($FieldsConfig->{Ticket}->{$Field} eq "values") {
                   $ConfigItem->{values} = [ "1", "2" ]; 
                   $ConfigItem->{type} = 'values';
                }
                elsif ($FieldsConfig->{Ticket}->{$Field} =~ "api") {
                    # $ConfigItem->{label} = $Field."ID";
                    my @TypeAndMethod = split /\Q|\E/, $FieldsConfig->{Ticket}->{$Field};
                    $ConfigItem->{api} = "/otrs/index.pl?Action=ZnunySearchFrontend;Subaction=$Field";
                    $ConfigItem->{type} = 'api';
                } else {
                    $ConfigItem->{type} = $FieldsConfig->{Ticket}->{$Field};
                }
                
                push @Config, $ConfigItem;
            }
        }

        my $JSON;
        if(!IsArrayRefWithData($TicketIDs)) {
            # build JSON output
            $JSON = $LayoutObject->JSONEncode(
                Data => {
                    Config => \@Config,
                    HTML => $Self->_ShowTicketList( TicketIDs => [], View => $View )
                },
            );
        }
        else {
            # build JSON output
            $JSON = $LayoutObject->JSONEncode(
                Data => {
                    Config => \@Config,
                },
            );
        }

        # send JSON response
        return $LayoutObject->Attachment(
            ContentType => 'application/json; charset=' . $LayoutObject->{Charset},
            Content     => $JSON,
            Type        => 'inline',
            NoCache     => 1,
        );
    }

    my @ApiFields = grep { $FieldsConfig->{Ticket}->{$_} =~ "api" ? $_ : undef } keys %{ $FieldsConfig->{Ticket} };

    for my $Field (@ApiFields) {
        if($Self->{Subaction} eq $Field) {

            my $Module = $Kernel::OM->Get('Kernel::System::'.$Field);
            my $Method = (split /\Q|\E/, $FieldsConfig->{Ticket}->{$Field})[1];
            my %Objects = $Module->$Method(UserID => $Self->{UserID});

            my $Values;
            for my $Key (keys %Objects) {
                push @{$Values}, { id => $Key, name => $Objects{$Key} };
            }

            my $JSON = $LayoutObject->JSONEncode(
                Data => $Values,
            );

            # send JSON response
            return $LayoutObject->Attachment(
                ContentType => 'application/json; charset=' . $LayoutObject->{Charset},
                Content     => $JSON,
                Type        => 'inline',
                NoCache     => 1,
            );
        }
    }

    if(IsArrayRefWithData($TicketIDs)) {

        $Output .= $Self->_ShowTicketList(
            %Param,
            TicketIDs => $TicketIDs,
            View => $View
        );
    }

    if($Self->{Subaction} eq "Search") {

        use Data::Dumper;
        $Kernel::OM->Get('Kernel::System::Log')->Log(
           Priority => 'error',
           Message  => "Run ".Dumper($QueryParams )
        );

        my $Result = $Self->{SearchObject}->Search(
            Objects => ["Ticket"],
            QueryParams => $QueryParams,
            Fields => [ ["TicketID"] ],
            ResultType => "ARRAY"
        );

        @{$TicketIDs} = map { $_ = $_->{TicketID} } @{$Result->{Ticket}};

        my $Response = $LayoutObject->JSONEncode( 
            Data => { 
                HTML => $Self->_ShowTicketList( TicketIDs => $TicketIDs, View => $View )
            }
        );

        return $LayoutObject->Attachment(
            ContentType => 'application/json; charset=' . $LayoutObject->{Charset},
            Content     => $Response,
            Type        => 'inline',
            NoCache     => 1,
        );
    }

    $Output .= $LayoutObject->Footer();

    return $Output;
}

sub _ShowTicketList {
    my ( $Self, %Param ) = @_;

    my $LayoutObject = $Kernel::OM->Get('Kernel::Output::HTML::Layout');

    my $Output = "<div id='TicketList'>";

    my $LinkPage = "TicketIDs=";

        $LinkPage .= $LayoutObject->JSONEncode(Data => $Param{TicketIDs}).";";
        # if(length($GetParam{Body})) {
        #    $LinkPage = $GetParam{Body};
        # }
        $Output .= $LayoutObject->TicketListShow(
            UserID => $Self->{UserID},
            TicketIDs => $Param{TicketIDs},
            Total => scalar @{$Param{TicketIDs}},
            StartWindow => 0,
            Env => {
                Action => 'ZnunySearchFrontend'
            },
            LinkPage => $LinkPage,
            View => $Param{View},
            Output => 1,
            TitleName => 'Search Results'
        )."</div>";

    return $Output;
}

1;
