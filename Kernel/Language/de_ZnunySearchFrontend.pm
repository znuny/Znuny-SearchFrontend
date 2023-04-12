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
}

1;
