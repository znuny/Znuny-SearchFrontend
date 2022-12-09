# --
# Copyright (C) 2012-2022 Znuny GmbH, https://znuny.com/
# --
# This software comes with ABSOLUTELY NO WARRANTY. For details, see
# the enclosed file COPYING for license information (AGPL). If you
# did not receive this file, see http://www.gnu.org/licenses/agpl.txt.
# --

package Kernel::Modules::ZnunySearchFrontend;

use strict;
use warnings;

use Kernel::System::VariableCheck qw(:all);

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

    my $ConfigObject = $Kernel::OM->Get('Kernel::Config');
    my $JSONObject   = $Kernel::OM->Get('Kernel::System::JSON');
    my $LayoutObject = $Kernel::OM->Get('Kernel::Output::HTML::Layout');
    my $ParamObject  = $Kernel::OM->Get('Kernel::System::Web::Request');

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

    my %Operators;
    my %Fields;

    my $OperatorsConfig = $ConfigObject->Get('ZnunySearchFrontend::Loader::SearchOperators')      // {};
    my $FieldsConfig    = $ConfigObject->Get('ZnunySearchFrontend::Loader::SearchFrontendFields') // {};

    for my $OperatorConfig ( sort values %{$OperatorsConfig} ) {
        %Operators = ( %Operators, %{$OperatorConfig} );
    }

    for my $FieldConfig ( sort values %{$FieldsConfig} ) {
        %Fields = ( %Fields, %{$FieldConfig} );
    }

    if ( $Self->{Subaction} eq "GetInitialData" ) {

        my @Config;
        my $SearchTicketObject = $Kernel::OM->Get('Kernel::System::Search::Object::Default::Ticket');
        my $Labels             = $SearchTicketObject->{Fields};

        for my $Field ( sort keys %{ $Fields{Ticket} } ) {
            if ( grep { $_ =~ $Field } keys %{$Labels} ) {

                my @FieldOperators;
                for my $Key ( sort keys %{ $Operators{$Field} } ) {
                    push @FieldOperators,
                        {
                        label => $Key,
                        code  => $Operators{$Field}->{$Key}
                        };
                }

                my $ConfigItem = {
                    label     => $Field,
                    operators => \@FieldOperators,
                };

                if ( $Fields{Ticket}->{$Field} eq "values" ) {
                    $ConfigItem->{values} = [ "1", "2" ];
                    $ConfigItem->{type}   = 'values';
                }
                elsif ( $Fields{Ticket}->{$Field} =~ "api" ) {
                    my @TypeAndMethod = split /\Q|\E/, $Fields{Ticket}->{$Field};
                    $ConfigItem->{api}  = "/otrs/index.pl?Action=ZnunySearchFrontend;Subaction=$Field";
                    $ConfigItem->{type} = 'api';
                }
                else {
                    $ConfigItem->{type} = $Fields{Ticket}->{$Field};
                }

                push @Config, $ConfigItem;
            }
        }

        my $JSON;
        if ( !IsArrayRefWithData( $GetParam{TicketIDs} ) ) {
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

    my @ApiFields = grep { $Fields{Ticket}->{$_} =~ "api" ? $_ : undef } keys %{ $Fields{Ticket} };

    for my $Field (@ApiFields) {
        if ( $Self->{Subaction} eq $Field ) {

            my $Module  = $Kernel::OM->Get( 'Kernel::System::' . $Field );
            my $Method  = ( split /\Q|\E/, $Fields{Ticket}->{$Field} )[1];
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

        my $Result = $Self->{SearchObject}->Search(
            Objects     => ["Ticket"],
            QueryParams => $GetParam{QueryParams},
            Fields      => [ ["Ticket_TicketID"] ],
            ResultType  => "ARRAY"
        );

        my @TicketIDs = map { $_->{TicketID} } @{ $Result->{Ticket} };

        my $Response = $LayoutObject->JSONEncode(
            Data => {
                HTML => $Self->_ShowTicketList(
                    TicketIDs => \@TicketIDs,
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

    my $Output   = "<div id='TicketList'>";
    my $LinkPage = "TicketIDs=";

    $LinkPage .= $LayoutObject->JSONEncode( Data => $Param{TicketIDs} ) . ";";
    $Output   .= $LayoutObject->TicketListShow(
        TicketIDs   => $Param{TicketIDs},
        Total       => scalar @{ $Param{TicketIDs} },
        StartWindow => 0,
        Env         => {
            Action => 'ZnunySearchFrontend',
            UserID => $Self->{UserID},
        },
        LinkPage  => $LinkPage,
        View      => $Param{View},
        Output    => 1,
        TitleName => 'Search Results'
    ) . "</div>";

    return $Output;
}

1;
