# --
# Copyright (C) 2012-2022 Znuny GmbH, http://znuny.com/
# --
# This software comes with ABSOLUTELY NO WARRANTY. For details, see
# the enclosed file COPYING for license information (GPL). If you
# did not receive this file, see https://www.gnu.org/licenses/gpl-3.0.txt.
# --
## nofilter(TidyAll::Plugin::Znuny4OTRS::Legal::AGPLValidator)

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
    $Self->{Connection}   = $Self->{SearchObject}->{ConnectObject} ? 1 : 0;

    return $Self;
}

sub Run {
    my ( $Self, %Param ) = @_;

    # get needed object
    my $ConfigObject = $Kernel::OM->Get('Kernel::Config');
    my $JSONObject   = $Kernel::OM->Get('Kernel::System::JSON');
    my $LayoutObject = $Kernel::OM->Get('Kernel::Output::HTML::Layout');

    my $ParamObject = $Kernel::OM->Get('Kernel::System::Web::Request');

    my %GetParam;
    for my $Param (qw(TicketIDs QueryParams)) {
        my $ParamValue = $ParamObject->GetParam( Param => $Param );
        $GetParam{$Param} = $JSONObject->Decode( Data => $ParamValue );
    }

    my $Output = $LayoutObject->Header();
    $Output .= $LayoutObject->NavigationBar();

    # build output
    $Output .= $LayoutObject->Output(
        TemplateFile => 'ZnunySearchFrontend',
        Data         => {
            ActiveEngine => $Self->{ActiveEngine},
            Connection   => $Self->{Connection},
        }
    );

    my $OperatorsConfig = $ConfigObject->Get('Loader::ZnunySearchFrontendOperators')->{'000-Framework'};
    my $FieldsConfig    = $ConfigObject->Get('Loader::ZnunySearchFrontendFields')->{'000-Framework'};

    if ( $Self->{Subaction} eq "GetInitialData" ) {

        # challenge token check for write action

        my @Config;
        my $SearchTicketObject = $Kernel::OM->Get('Kernel::System::Search::Object::Default::Ticket');
        my $Labels             = $SearchTicketObject->{Fields};

        for my $Field ( sort keys %{ $FieldsConfig->{Ticket} } ) {
            if ( grep { $_ =~ $Field } keys %{$Labels} ) {

                my $ConfigItem;

                $ConfigItem->{label} = $Field;
                my @FieldOperators;
                for my $Key ( sort keys %{ $OperatorsConfig->{$Field} } ) {
                    push @FieldOperators,
                        {
                        label => $Key,
                        code  => $OperatorsConfig->{$Field}->{$Key}
                        };
                }
                $ConfigItem->{operators} = \@FieldOperators;

                if ( $FieldsConfig->{Ticket}->{$Field} eq "values" ) {
                    $ConfigItem->{values} = [ "1", "2" ];
                    $ConfigItem->{type}   = 'values';
                }
                elsif ( $FieldsConfig->{Ticket}->{$Field} =~ "api" ) {

                    # $ConfigItem->{label} = $Field."ID";
                    my @TypeAndMethod = split /\Q|\E/, $FieldsConfig->{Ticket}->{$Field};
                    $ConfigItem->{api}  = "/otrs/index.pl?Action=ZnunySearchFrontend;Subaction=$Field";
                    $ConfigItem->{type} = 'api';
                }
                else {
                    $ConfigItem->{type} = $FieldsConfig->{Ticket}->{$Field};
                }

                push @Config, $ConfigItem;
            }
        }

        my $JSON;
        if ( !IsArrayRefWithData( $GetParam{TicketIDs} ) ) {

            # build JSON output
            $JSON = $LayoutObject->JSONEncode(
                Data => {
                    Config => \@Config,
                    HTML   => $Self->_ShowTicketList(
                        TicketIDs => [],
                    )
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
        if ( $Self->{Subaction} eq $Field ) {

            my $Module  = $Kernel::OM->Get( 'Kernel::System::' . $Field );
            my $Method  = ( split /\Q|\E/, $FieldsConfig->{Ticket}->{$Field} )[1];
            my %Objects = $Module->$Method( UserID => $Self->{UserID} );

            my $Values;
            for my $Key ( sort keys %Objects ) {
                push @{$Values},
                    {
                    id   => $Key,
                    name => $Objects{$Key}
                    };
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

    if ( IsArrayRefWithData( $GetParam{TicketIDs} ) ) {

        $Output .= $Self->_ShowTicketList(
            %Param,
            TicketIDs => $GetParam{TicketIDs},
        );
    }

    if ( $Self->{Subaction} eq "Search" ) {

        my $GeneralStartTime = Time::HiRes::time();

        my $Result = $Self->{SearchObject}->Search(
            Objects     => ["Ticket"],
            QueryParams => $GetParam{QueryParams},
            Fields      => [ ["TicketID"] ],
            ResultType  => "ARRAY"
        );
        my $TicketIDs;
        @{$TicketIDs} = map { $_->{TicketID} } @{ $Result->{Ticket} };

        my $Response = $LayoutObject->JSONEncode(
            Data => {
                HTML => $Self->_ShowTicketList(
                    TicketIDs => $TicketIDs,
                )
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

    $LinkPage .= $LayoutObject->JSONEncode( Data => $Param{TicketIDs} ) . ";";

    # if(length($GetParam{Body})) {
    #    $LinkPage = $GetParam{Body};
    # }
    $Output .= $LayoutObject->TicketListShow(
        UserID      => $Self->{UserID},
        TicketIDs   => $Param{TicketIDs},
        Total       => scalar @{ $Param{TicketIDs} },
        StartWindow => 0,
        Env         => {
            Action => 'ZnunySearchFrontend'
        },
        LinkPage  => $LinkPage,
        View      => $Param{View},
        Output    => 1,
        TitleName => 'Search Results'
    ) . "</div>";

    return $Output;
}

1;
