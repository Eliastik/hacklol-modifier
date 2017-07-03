/* user-script.js pour Hacklol Modifier v. 1.2.3 - du 22/10/2016 */
function execUserScript() {
    var userScriptJstorage = $.jStorage.get('user-script');
    var date = new Date();
    var date_heure = "["+ date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + "]";
    if(userScriptJstorage !== null) {
        if(/eval|xhr|ajax|$.post|$.get|document.cookie|XMLHttpRequest|XMLHTTP|userScriptFunction|codeMirrorUserScript|execUserScript|new function/i.test(userScriptJstorage)) {
                    var elErr = document.createElement("p");
                    elErr.setAttribute("style", "color: red;");
                    elErr.setAttribute("class", "err");
                    elErr.innerHTML = '<span class="icon icon_fermer"></span> '+ date_heure + ' ' + i18next.t('user-script.forbidden');
                    document.getElementById("error-user-script").appendChild(elErr);
        }
        else {
            try {
                eval(userScriptJstorage);
                var elSuccess = document.createElement("p");
                elSuccess.setAttribute("style", "color: blue;");
                elSuccess.setAttribute("class", "info");
                elSuccess.innerHTML = '<span class="icon icon_infos"></span> '+ date_heure + ' ' + i18next.t('user-script.success');
                document.getElementById("error-user-script").appendChild(elSuccess);
            }
            catch(err) {
                var elErr = document.createElement("p");
                elErr.setAttribute("style", "color: red;");
                elErr.setAttribute("class", "err");
                elErr.innerHTML = '<span class="icon icon_fermer"></span> '+ date_heure + ' ' + i18next.t('user-script.error') + '<br /><u>' + i18next.t('user-script.error-code') +'</u> : ' + err;
                document.getElementById("error-user-script").appendChild(elErr);
            }
        }
    }
}
function saveUserScript() {
    codeMirrorUserScript.save();
    var userScriptValue = $("#editeur_user_script").val();
    $.jStorage.set('user-script', userScriptValue);
    alert(i18next.t('user-script.saved'));
    execUserScript();
}
function deleteUserScript() {
    if(confirm(i18next.t('user-script.reset-confirm'))) {
            $.jStorage.deleteKey('user-script');
            alert(i18next.t('user-script.deleted'));
            // code-mirror
            codeMirrorUserScript.getDoc().setValue('// exemple de script utilisateur\nalert("Hello world !");');
    }
}
$("#save-user-script").click(function(){
    saveUserScript();
});
$("#delete-user-script").click(function(){
    deleteUserScript();
});
$(document).ready(function() {
    execUserScript();
    // code-mirror
    codeMirrorUserScript = CodeMirror.fromTextArea(document.getElementById("editeur_user_script"), {
        lineNumbers: true,
        mode: "javascript",
        autoRefresh: true
    });
    if($.jStorage.get('user-script') !== null) {
        codeMirrorUserScript.getDoc().setValue($.jStorage.get('user-script'));
    }
    else {
        codeMirrorUserScript.getDoc().setValue('// exemple de script utilisateur\nalert("Hello world !");');
    }
});
