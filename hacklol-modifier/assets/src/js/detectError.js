/* Hacklol Modifier 1.4.1
 * 
 * Copyright (C) 2014-2017 Eliastik (eliastiksofts.com)
 * 
 * This file is part of Hacklol Modifier.
 * 
 * Hacklol Modifier is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * Hacklol Modifier is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with Hacklol Modifier.  If not, see <http://www.gnu.org/licenses/>.
 *  */
window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    if(errorDisabled !== null && errorDisabled === false) {
        var timeOutError = setTimeout(function() {
            $.magnificPopup.open({
              items: {
                src: '#erreur-script',
                type: 'inline'
              },
              callbacks: {
                open: function() {
                    $("body").addClass("scrollBarAuto");
                    $("html").addClass("scrollBarAuto");
                    if($.jStorage.get('flou_effet') == "Oui" && typeof(hacklol.ui.flou) != undefined) {
                        hacklol.ui.flou();
                    }
                    
                    if(typeof(colpickHide) != undefined) {
                        $('#choixCouleur').colpickHide();
                        $('#colorpicker1').colpickHide();
                        $('#colorpicker3').colpickHide();
                    }
                },
                beforeClose: function() {
                    $("body").removeClass("scrollBarAuto");
                    $("html").removeClass("scrollBarAuto");
                    if(typeof(hacklol.ui.desactivFlou) != undefined) {
                        hacklol.ui.desactivFlou();
                    }
                }
              }
            });
            var valeurTextareaErr = $("#erreurScriptTextarea").val();
            $("#erreurScriptTextarea").val(valeurTextareaErr + '\n-------------\n- Message d\'erreur : ' + errorMsg + '\n- Adresse du script : ' + url + '\n- Ligne : ' + lineNumber + '\n- Colonne : ' + column + '\n- StackTrace : ' +  errorObj);
            clearTimeout(timeOutError);
        }, 500);
    }
}
