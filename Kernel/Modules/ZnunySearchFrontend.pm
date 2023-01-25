# --
# Copyright (C) 2012 Znuny GmbH, https://znuny.com/
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

    $Self->{ActiveEngineName} = $Self->{SearchObject}->{Config}->{ActiveEngineName}
        || $Self->{SearchObject}->{Config}->{ActiveEngine};
    $Self->{Connection}  = $Self->{SearchObject}->{ConnectObject} ? 1 : 0;
    $Self->{StartHit}    = 1;
    $Self->{View}        = 'Small';
    $Self->{TicketIDs}   = [];
    $Self->{QueryParams} = {};

    return $Self;
}

sub Run {
    my ( $Self, %Param ) = @_;

    my $ConfigObject            = $Kernel::OM->Get('Kernel::Config');
    my $JSONObject              = $Kernel::OM->Get('Kernel::System::JSON');
    my $LayoutObject            = $Kernel::OM->Get('Kernel::Output::HTML::Layout');
    my $UserObject              = $Kernel::OM->Get('Kernel::System::User');
    my $ParamObject             = $Kernel::OM->Get('Kernel::System::Web::Request');
    my $SearchTicketObject      = $Kernel::OM->Get('Kernel::System::Search::Object::Default::Ticket');
    my $SearchQueryTicketObject = $Kernel::OM->Get('Kernel::System::Search::Object::Query::Ticket');

    my $ValidApiFields = $SearchQueryTicketObject->LookupTicketFieldsGet();

    my %Preferences = $UserObject->GetPreferences(
        UserID => $Self->{UserID},
    );

    my %Operators;
    my %ValidFieldsConfig;
    my %ValidFieldsOrderConfig;
    my %ValidFieldsDefinition = ();

    my $OperatorsConfig         = $ConfigObject->Get('ZnunySearchFrontend::Loader::SearchOperators')           // {};
    my $ExcludedOperatorsConfig = $ConfigObject->Get('ZnunySearchFrontend::Loader::ExcludeOperators')          // {};
    my $FieldsConfig            = $ConfigObject->Get('ZnunySearchFrontend::Loader::SearchFrontendFields')      // {};
    my $FieldsOrderConfig       = $ConfigObject->Get('ZnunySearchFrontend::Loader::SearchFrontendFieldsOrder') // {};
    my $DynamicFieldObject      = $Kernel::OM->Get('Kernel::System::DynamicField');
    my $DynamicFieldBackendObject = $Kernel::OM->Get('Kernel::System::DynamicField::Backend');

    for my $OperatorConfig ( sort values %{$OperatorsConfig} ) {
        %Operators = ( %Operators, %{$OperatorConfig} );
    }

    for my $FieldConfig ( sort values %{$FieldsConfig} ) {
        %ValidFieldsConfig = ( %ValidFieldsConfig, %{$FieldConfig} );
    }

    # fields need to contain specific type
    # otherwise do not show them
    for my $FieldType ( sort keys %ValidFieldsConfig ) {
        FIELD_CONFIG:
        for my $FieldProperty ( sort keys %{ $ValidFieldsConfig{$FieldType} } ) {
            my $FieldTypeValue = $ValidFieldsConfig{$FieldType}->{$FieldProperty};
            my %FieldDefinition;

            if ( $FieldTypeValue eq 'api' ) {
                if ( grep { $FieldProperty eq $_ } keys %{$ValidApiFields} ) {

                    my $AttributeName = $ValidApiFields->{$FieldProperty}->{AttributeName}
                        ? $ValidApiFields->{$FieldProperty}->{AttributeName}
                        : $FieldProperty . "ID";

                    %FieldDefinition = $SearchTicketObject->ValidFieldsPrepare(
                        Fields      => ["$FieldType\_$AttributeName"],
                        Object      => "Ticket",
                        QueryParams => {},
                    );

                    $ValidFieldsDefinition{$FieldType}->{$FieldProperty}
                        = $FieldDefinition{$FieldType}->{$AttributeName};
                }
            }
            elsif ( $FieldTypeValue eq 'customtext' ) {

                %FieldDefinition = $SearchTicketObject->ValidFieldsPrepare(
                    Fields      => ["$FieldType\_$FieldProperty"],
                    Object      => "Ticket",
                    QueryParams => {},
                );

                if ( !keys %FieldDefinition ) {
                    delete $ValidFieldsConfig{$FieldType}->{$FieldProperty};
                    next FIELD_CONFIG;
                }

                if ( $FieldProperty =~ /^DynamicField.+/ ) {
                    $ValidFieldsDefinition{$FieldType}->{$FieldProperty}
                        = $FieldDefinition{"$FieldType\_DynamicField"}->{$FieldProperty};
                    next FIELD_CONFIG;
                }

                $ValidFieldsDefinition{$FieldType}->{$FieldProperty} = $FieldDefinition{$FieldType}->{$FieldProperty};
            }
            else {
                delete $ValidFieldsConfig{$FieldType}->{$FieldProperty};
            }
        }
    }

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

        my @TicketIDs = map { $_->{TicketID} } @{ $Result->{Ticket} };

        my $JSONTicketIDs = $JSONObject->Encode(
            Data => \@TicketIDs,
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

        $Self->{TicketIDs} = \@TicketIDs;

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

        # prepare fields order
        my %FieldsOrder;
        for my $Index ( sort keys %{$FieldsOrderConfig} ) {
            for my $FieldName ( sort keys %{ $FieldsOrderConfig->{$Index} } ) {
                if ( $Index eq "Ticket" ) {
                    $FieldsOrder{$FieldName} = $FieldsOrderConfig->{$Index}->{$FieldName};
                }
                else {
                    $FieldsOrder{"$Index\_$FieldName"} = $FieldsOrderConfig->{$Index}->{$FieldName};
                }
            }
        }
        my @FieldsOrder;
        for my $FieldName ( sort { $FieldsOrder{$a} <=> $FieldsOrder{$b} } keys %FieldsOrder ) {
            push @FieldsOrder, $FieldName;
        }

        # challenge token check for write action
        my @Config;
        my $Labels = $SearchTicketObject->{Fields};

        # last saved query parameters can have fields that
        # is no longer available due to config change
        PARAM:
        for my $Param ( sort keys %{$QueryParams} ) {
            my $ParamToCheck = $Param;
            my $IndexFieldTypeToCheck;

            if ( $Param =~ m{(.*)_*(DynamicField_.+)} ) {
                $ParamToCheck = $2;
                next PARAM if !$ParamToCheck;

                $IndexFieldTypeToCheck = $1 || 'Ticket';
            }
            elsif ( $Param =~ m{(.+)_(.+)} ) {
                $ParamToCheck          = $2;
                $IndexFieldTypeToCheck = $1;
            }
            else {
                $IndexFieldTypeToCheck = 'Ticket';
            }

            next PARAM
                if (
                $ValidFieldsConfig{$IndexFieldTypeToCheck}
                && $ValidFieldsConfig{$IndexFieldTypeToCheck}->{$ParamToCheck}
                )
                || $ParamToCheck eq 'Fulltext';
            delete $QueryParams->{$Param};
        }

        for my $FieldIndex ( sort keys %ValidFieldsConfig ) {
            my $SearchIndexObject;

            # use either Attachment or Article/Ticket
            if ( $FieldIndex eq 'Attachment' ) {
                $SearchIndexObject
                    = $Kernel::OM->Get("Kernel::System::Search::Object::Default::ArticleDataMIMEAttachment");
            }
            else {
                $SearchIndexObject = $Kernel::OM->Get("Kernel::System::Search::Object::Default::$FieldIndex");
            }

            FIELD:
            for my $Field ( sort keys %{ $ValidFieldsConfig{$FieldIndex} } ) {
                if ( $Field =~ m{^DynamicField_(.*)} ) {
                    my $DynamicFieldName = $1;

                    my $DynamicFieldConfig = $DynamicFieldObject->DynamicFieldGet(
                        Name => $DynamicFieldName,
                    );

                    next FIELD if !IsHashRefWithData($DynamicFieldConfig);
                }

                my $ConfigItem;
                my @FieldOperators;

                my @ConfigFieldOperators = $Operators{$Field} ? split( ',', $Operators{$Field} ) : ();

                if ( $FieldIndex eq "Ticket" ) {
                    my $FieldType = $ValidFieldsDefinition{$FieldIndex}->{$Field}->{Type};
                    my @FieldAvailableOperators
                        = keys %{ $SearchIndexObject->{SupportedOperators}->{$FieldType}->{Operator} };
                    for my $Operator (@ConfigFieldOperators) {
                        if ( grep { $_ eq $Operator } @FieldAvailableOperators ) {
                            push @FieldOperators, {
                                label => $Operator,
                                code  => $Operator
                            };
                        }
                    }
                    if ( !scalar @FieldOperators ) {
                        for my $Operator (@FieldAvailableOperators) {
                            if ( !grep { $_ eq $Operator } @{$ExcludedOperatorsConfig} ) {
                                push @FieldOperators, {
                                    label => $Operator,
                                    code  => $Operator
                                };
                            }
                        }
                    }
                    $ConfigItem = {
                        label     => $Field,
                        operators => \@FieldOperators,
                    };
                    if ( $ValidFieldsConfig{Ticket}->{$Field} eq 'api' ) {
                        my $Method = $ValidApiFields->{$Field}->{FunctionName};
                        $ConfigItem->{api}  = $LayoutObject->{Baselink} . "Action=ZnunySearchFrontend;Subaction=$Field";
                        $ConfigItem->{type} = 'api';
                    }
                    else {
                        $ConfigItem->{type} = $ValidFieldsConfig{Ticket}->{$Field};
                    }
                }
                else {

                    my $FieldType = $ValidFieldsDefinition{$FieldIndex}->{$Field}->{Type};
                    my @FieldAvailableOperators
                        = keys %{ $SearchIndexObject->{SupportedOperators}->{$FieldType}->{Operator} };

                    for my $Operator (@ConfigFieldOperators) {
                        if ( grep { $_ eq $Operator } @FieldAvailableOperators ) {
                            push @FieldOperators, {
                                label => $Operator,
                                code  => $Operator
                            };
                        }
                    }
                    if ( !scalar @FieldOperators ) {

                        for my $Operator (@FieldAvailableOperators) {
                            if ( !grep { $_ eq $Operator } @{$ExcludedOperatorsConfig} ) {
                                push @FieldOperators, {
                                    label => $Operator,
                                    code  => $Operator
                                };
                            }
                        }
                    }
                    $ConfigItem = {
                        label     => $FieldIndex . "_" . $Field,
                        operators => \@FieldOperators,
                    };
                    if ( $ValidFieldsConfig{$FieldIndex}->{$Field} =~ 'api' ) {
                        $ConfigItem->{api} = $LayoutObject->{Baselink}
                            . "Action=ZnunySearchFrontend;Subaction=$FieldIndex"
                            . "_$Field";
                        $ConfigItem->{type} = 'api';
                    }
                    else {
                        $ConfigItem->{type} = $ValidFieldsConfig{$FieldIndex}->{$Field};
                    }
                }

                if ( $ConfigItem->{type} ) {
                    push @Config, $ConfigItem;
                }
            }
        }
        push @Config, {
            type      => 'customtext',
            label     => 'Fulltext',
            operators => [
                {
                    label => '=',
                    code  => '='
                }
            ]
        };

        $Self->{TicketIDs}   = $TicketIDs;
        $Self->{QueryParams} = $QueryParams;

        my @LookupFieldsNames = keys %{$ValidApiFields};
        push @LookupFieldsNames, "Fulltext";

        my $JSON = $LayoutObject->JSONEncode(
            Data => {
                Config                => \@Config,
                HTML                  => $Self->_ShowTicketList(),
                LastSearchQueryParams => $QueryParams,
                StartHit              => $Self->{StartHit},
                LookupFields          => \@LookupFieldsNames,
                FieldsOrder           => \@FieldsOrder,
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
    elsif ( grep { $Self->{Subaction} eq $_ } keys %{$ValidApiFields} ) {

        my %Objects = $Self->ObjectsListGet(
            LookupField    => $Self->{Subaction},
            ValidApiFields => $ValidApiFields,
        );

        my @Values;
        for my $Key ( sort keys %Objects ) {
            push @Values, {
                id   => $Key,
                name => $Objects{$Key}
            };
        }

        my $JSON = $LayoutObject->JSONEncode(
            Data => \@Values,
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
                ActiveEngineName => $Self->{ActiveEngineName},
                Connection       => $Self->{Connection},
                StartHit         => $Self->{StartHit},
            }
        );

        $Output .= $LayoutObject->Footer();

        return $Output;
    }
}

sub ObjectsListGet {
    my ( $Self, %Param ) = @_;

    # check needed stuff
    for my $Needed (qw(LookupField ValidApiFields)) {
        if ( !$Param{$Needed} ) {
            $Kernel::OM->Get('Kernel::System::Log')->Log(
                Priority => 'error',
                Message  => "Need $Needed!"
            );
            return;
        }
    }

    my $Module = $Kernel::OM->Get( $Param{ValidApiFields}->{ $Param{LookupField} }->{Module} );
    my $Method = $Param{ValidApiFields}->{ $Param{LookupField} }->{FunctionNameList};

    my %Objects;
    if ( $Param{LookupField} eq "Customer" ) {
        my %Customers = $Module->$Method(
            UserID => $Self->{UserID},
            Valid  => 1
        );
        my @CustomerIDs = keys %Customers;
        for my $CustomerID (@CustomerIDs) {
            my %CustomerCompany = $Module->CustomerCompanyGet(
                CustomerID => $CustomerID,
            );
            if ( $CustomerCompany{CustomerCompanyName} ) {
                $Objects{$CustomerID} = $CustomerCompany{CustomerCompanyName};
            }
        }
    }
    else {
        %Objects = $Module->$Method(
            UserID => $Self->{UserID},
            Valid  => 1
        );
    }

    return %Objects;
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
