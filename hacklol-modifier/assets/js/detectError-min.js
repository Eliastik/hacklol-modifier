window.onerror=function(e,o,r,l,i){if(null!==errorDisabled&&!1===errorDisabled)var c=setTimeout(function(){$.magnificPopup.open({items:{src:"#erreur-script",type:"inline"},callbacks:{open:function(){$("body").addClass("scrollBarAuto"),$("html").addClass("scrollBarAuto"),"Oui"==$.jStorage.get("flou_effet")&&void 0!=typeof hacklol.ui.flou&&hacklol.ui.flou(),void 0!=typeof colpickHide&&($("#choixCouleur").colpickHide(),$("#colorpicker1").colpickHide(),$("#colorpicker3").colpickHide())},beforeClose:function(){$("body").removeClass("scrollBarAuto"),$("html").removeClass("scrollBarAuto"),void 0!=typeof hacklol.ui.desactivFlou&&hacklol.ui.desactivFlou()}}});var a=$("#erreurScriptTextarea").val();$("#erreurScriptTextarea").val(a+"\n-------------\n- Message d'erreur : "+e+"\n- Adresse du script : "+o+"\n- Ligne : "+r+"\n- Colonne : "+l+"\n- StackTrace : "+i),clearTimeout(c)},500)};