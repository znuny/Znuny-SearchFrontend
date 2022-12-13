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
    $Self->{StartHit}     = 1;
    $Self->{View}         = 'Small';
    $Self->{TicketIDs}    = [];
    $Self->{QueryParams}  = {};

    return $Self;
}

sub Run {
    my ( $Self, %Param ) = @_;

    my $ConfigObject = $Kernel::OM->Get('Kernel::Config');
    my $JSONObject   = $Kernel::OM->Get('Kernel::System::JSON');
    my $LayoutObject = $Kernel::OM->Get('Kernel::Output::HTML::Layout');
    my $UserObject   = $Kernel::OM->Get('Kernel::System::User');
    my $ParamObject  = $Kernel::OM->Get('Kernel::System::Web::Request');

    my %Preferences = $UserObject->GetPreferences(
        UserID => $Self->{UserID},
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

    my @ApiFields = grep { $Fields{Ticket}->{$_} =~ 'api' ? $_ : undef } keys %{ $Fields{Ticket} };

    for my $Param (qw(View StartHit)) {
        my $ParamValue = $ParamObject->GetParam( Param => $Param );

        if ( defined $ParamValue ) {
            $UserObject->SetPreferences(
                UserID => $Self->{UserID},
                Key    => 'ZnunySearchFrontend' . $Param,
                Value  => $ParamValue
            );
            $Self->{$Param} = $ParamValue;
        }
        else {
            $Self->{$Param} = $Preferences{ 'ZnunySearchFrontend' . $Param } || $Self->{$Param};
        }
    }

    if ( $Self->{Subaction} eq 'Search' ) {
        my $JSONQueryParams = $ParamObject->GetParam( Param => 'QueryParams' );
        my $QueryParams     = $JSONObject->Decode( Data => $JSONQueryParams );

        $UserObject->SetPreferences(
            Key    => 'LastSearchZnunySearchFrontendQueryParams',
            Value  => $JSONQueryParams,
            UserID => $Self->{UserID},
        );

        # add permissions parameter
        $QueryParams->{UserID} = $Self->{UserID};

        my $Result = $Self->{SearchObject}->Search(
            Objects     => ['Ticket'],
            QueryParams => $QueryParams,
            Fields      => [ ["Ticket_TicketID"] ],
            ResultType  => 'ARRAY',
        );

        my $TicketIDs;
        @{$TicketIDs} = map { $_->{TicketID} } @{ $Result->{Ticket} };

        my $JSONTicketIDs = $JSONObject->Encode(
            Data => $TicketIDs
        );

        $UserObject->SetPreferences(
            Key    => 'LastSearchZnunySearchFrontendTicketIDs',
            Value  => $JSONTicketIDs,
            UserID => $Self->{UserID},
        );

        $Self->{StartHit} = 1;
        $UserObject->SetPreferences(
            Key    => 'ZnunySearchFrontendStartHit',
            Value  => 1,
            UserID => $Self->{UserID},
        );

        $Self->{TicketIDs} = $TicketIDs;

        my $Response = $LayoutObject->JSONEncode(
            Data => {
                HTML                  => $Self->_ShowTicketList(),
                LastSearchQueryParams => $QueryParams,
            }
        );

        $Self->{QueryParams} = $QueryParams;

        return $LayoutObject->Attachment(
            ContentType => 'application/json; charset=' . $LayoutObject->{Charset},
            Content     => $Response,
            Type        => 'inline',
            NoCache     => 1,
        );
    }
    elsif ( $Self->{Subaction} eq 'GetInitialData' ) {

        my $JSONQueryParams = $Preferences{LastSearchZnunySearchFrontendQueryParams};
        my $JSONTicketIDs   = $Preferences{LastSearchZnunySearchFrontendTicketIDs};

        my $QueryParams;
        my $TicketIDs;
        if ( defined $JSONQueryParams ) {
            $QueryParams = $JSONObject->Decode( Data => $JSONQueryParams );
        }
        if ( defined $JSONTicketIDs ) {
            $TicketIDs = $JSONObject->Decode( Data => $JSONTicketIDs );
        }

        # challenge token check for write action
        my @Config;
        my $SearchTicketObject = $Kernel::OM->Get('Kernel::System::Search::Object::Default::Ticket');
        my $Labels             = $SearchTicketObject->{Fields};

        for my $Field ( sort keys %{ $Fields{Ticket} } ) {

            # TODO: Add checking additional fields
            if ( grep { $_ =~ $Field || $Field =~ 'Article_Body' } keys %{$Labels} ) {

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

                if ( $Fields{Ticket}->{$Field} eq 'values' ) {
                    $ConfigItem->{values} = [ "1", "2" ];
                    $ConfigItem->{type}   = 'values';
                }
                elsif ( $Fields{Ticket}->{$Field} =~ 'api' ) {
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

        $Self->{TicketIDs}   = $TicketIDs;
        $Self->{QueryParams} = $QueryParams;

        my $JSON;
        $JSON = $LayoutObject->JSONEncode(
            Data => {
                Config                => \@Config,
                HTML                  => $Self->_ShowTicketList(),
                LastSearchQueryParams => $QueryParams,
                StartHit              => $Self->{StartHit},
            },
        );

        # send JSON response
        return $LayoutObject->Attachment(
            ContentType => 'application/json; charset=' . $LayoutObject->{Charset},
            Content     => $JSON,
            Type        => 'inline',
            NoCache     => 1,
        );
    }
    elsif ( grep { $Self->{Subaction} eq $_ } @ApiFields ) {
        my $Module  = $Kernel::OM->Get( 'Kernel::System::' . $Self->{Subaction} );
        my $Method  = ( split /\Q|\E/, $Fields{Ticket}->{ $Self->{Subaction} } )[1];
        my %Objects = $Module->$Method( UserID => $Self->{UserID} );

        my $Values;
        for my $Key ( sort keys %Objects ) {
            push @{$Values}, {
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
    else {
        my $Output = $LayoutObject->Header();
        $Output .= $LayoutObject->NavigationBar();

        # build output
        $Output .= $LayoutObject->Output(
            TemplateFile => 'ZnunySearchFrontend',
            Data         => {
                ActiveEngine => $Self->{ActiveEngine},
                Connection   => $Self->{Connection},
                StartHit     => $Self->{StartHit},
            }
        );

        $Output .= $LayoutObject->Footer();

        return $Output;
    }
}

sub _ShowTicketList {
    my ( $Self, %Param ) = @_;

    my $LayoutObject = $Kernel::OM->Get('Kernel::Output::HTML::Layout');

    if ( !defined $Self->{TicketIDs} ) {
        $Self->{TicketIDs} = [];
    }

    my $Output = $LayoutObject->TicketListShow(
        TicketIDs   => $Self->{TicketIDs},
        Total       => scalar @{ $Self->{TicketIDs} },
        StartWindow => 0,
        Env         => {
            Action => 'ZnunySearchFrontend',
            UserID => $Self->{UserID},
        },
        View      => $Self->{View} || 'Small',
        Output    => 1,
        TitleName => 'Search Results',
    ) || '';

    return $Output;
}

1;
