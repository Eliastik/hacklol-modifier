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
