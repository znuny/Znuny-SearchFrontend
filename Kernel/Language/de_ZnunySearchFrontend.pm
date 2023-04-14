# --
# Copyright (C) 2012 Znuny GmbH, https://znuny.com/
# --
# This software comes with ABSOLUTELY NO WARRANTY. For details, see
# the enclosed file COPYING for license information (AGPL). If you
# did not receive this file, see http://www.gnu.org/licenses/agpl.txt.
# --

package Kernel::Language::de_ZnunySearchFrontend;

use strict;
use warnings;
use utf8;

sub Data {
    my $Self = shift;

    #
    # SysConfig
    #
    $Self->{Translation}->{'Registration of operators for individual fields. If operators are not defined, all available operators for the type are displayed.'} = 'Registrierung der Operatoren für einzelne Felder. Falls keine Operatoren definiert werden, werden alle Operatoren eines Typs angezeigt.';
    $Self->{Translation}->{'List of all operators that are excluded from use in the Znuny frontend search component.'} = 'Liste der Operatoren, die von der Benutzung im Such-Frontend ausgeschlossen werden sollen.';
    $Self->{Translation}->{'Registers search fields for Znuny frontend search component.'} = 'Registriert Felder für das Such-Frontend.';
    $Self->{Translation}->{'Sets order for fields shown in the Znuny frontend search component.'} = 'Definiert die Reihenfolge der Felder, die im Such-Frontend angezeigt werden.';
    $Self->{Translation}->{'No engine configured'} = 'Keine Engine konfiguriert';
    $Self->{Translation}->{'Widget could not be loaded due to lack of connection to custom search engine.'} = 'Widget konnte wegen fehlender Verbindung zur Such-Engine nicht geladen werden.';
    $Self->{Translation}->{'Parameters for the dashboard backend of the open tickets overview of the agent interface. "Limit" is the number of entries shown by default. "Group" is used to restrict the access to the plugin (e. g. Group: admin;group1;group2;). "Default" determines if the plugin is enabled by default or if the user needs to enable it manually. "CacheTTLLocal" is the cache time in minutes for the plugin. "Mandatory" determines if the plugin is always shown and can not be removed by agents. Note: Only Ticket attributes and Dynamic Fields (DynamicField_NameX) are allowed for DefaultColumns. Elasticsearch supports more operators for dynamic fields. Example: "DynamicField_NameX_FullText=value;". Value can be a JSON object if needed, for example: "DynamicField_NameX_Between={"From":7,"To":10};". Please refer to the documentation for more operator usage. This config should always include the key "NeedCustomSearchEngineConnection" set to "1".'}
        = 'Legt die Parameter für das Dashboard-Backend fest. "Limit" legt die Anzahl an Einträgen fest, die standardmäßig angezeigt werden. "Group" beschränkt den Zugang zum jeweiligen Dashlet (z. B. Group: admin;group1;group2). "Default" bestimmt, ob das Dashlet standardmäßig aktiv ist oder vom Nutzer manuell aktiviert werden muss. "CacheTTLLocal" bestimmt die Cachingdauer für das Dashlet in Minuten. Mit "Mandatory" kann das Dashlet so konfiguriert werden, dass Nutzer es nicht ausblenden können. Hinweis: Für DefaultColumns sind nur Ticketattribute und dynamische Felder (DynamicField_NameX) möglich. Elasticsearch unterstützt weitere Operatoren. Beispiel: "DynamicField_NameX_FullText=value;". Der Wert kann ein JSON-Objekt sein, falls benötigt, z. B. "DynamicField_NameX_Between={"From":7,"To":10};". Bitte Dokumentation für Operatoren konsultieren. Diese Konfiguration sollte immer den Schlüssel "NeedCustomSearchEngineConnection" mit Wert "1" beinhalten.';
    $Self->{Translation}->{'Parameters for the dashboard backend of the open tickets overview of the agent interface. "Limit" is the number of entries shown by default. "Group" is used to restrict the access to the plugin (e. g. Group: admin;group1;group2;). "Default" determines if the plugin is enabled by default or if the user needs to enable it manually. "CacheTTLLocal" is the cache time in minutes for the plugin. Note: Only Ticket attributes and Dynamic Fields (DynamicField_NameX) are allowed for DefaultColumns. Elasticsearch supports more operators for dynamic fields. Example: "DynamicField_NameX_FullText=value;". Value can be a JSON object if needed, for example: "DynamicField_NameX_Between={"From":7,"To":10};". Please refer to the documentation for more operator usage. This config should always include the key "NeedCustomSearchEngineConnection" set to "1".'}
        = 'Legt die Parameter für das Dashboard-Backend fest. "Limit" legt die Anzahl an Einträgen fest, die standardmäßig angezeigt werden. "Group" beschränkt den Zugang zum jeweiligen Dashlet (z. B. Group: admin;group1;group2). "Default" bestimmt, ob das Dashlet standardmäßig aktiv ist oder vom Nutzer manuell aktiviert werden muss. "CacheTTLLocal" bestimmt die Cachingdauer für das Dashlet in Minuten. Hinweis: Für DefaultColumns sind nur Ticketattribute und dynamische Felder (DynamicField_NameX) möglich. Elasticsearch unterstützt weitere Operatoren. Beispiel: "DynamicField_NameX_FullText=value;". Der Wert kann ein JSON-Objekt sein, falls benötigt, z. B. "DynamicField_NameX_Between={"From":7,"To":10};". Bitte Dokumentation für Operatoren konsultieren. Diese Konfiguration sollte immer den Schlüssel "NeedCustomSearchEngineConnection" mit Wert "1" beinhalten.';
}

1;
