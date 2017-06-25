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
					if(hacklol.lang == "en") {
						elErr.innerHTML = '<span class="icon icon_fermer"></span> '+ date_heure +' Some forbidden functions have been detected in your User Script. The execution of your User Script have been canceled.';
					}
					else {
						elErr.innerHTML = '<span class="icon icon_fermer"></span> '+ date_heure +' Des fonctions dont l\'utilisation est bloquée ont été détectées. L\'exécution de votre User Script a été annulée.';
					}
					document.getElementById("error-user-script").appendChild(elErr);
		}
		else {
				try {
					eval(userScriptJstorage);
					var elSuccess = document.createElement("p");
					elSuccess.setAttribute("style", "color: blue;");
					elSuccess.setAttribute("class", "info");
					if(hacklol.lang == "en") {
						elSuccess.innerHTML = '<span class="icon icon_infos"></span> '+ date_heure +' Your User Script was successfully executed !';
					}
					else {
						elSuccess.innerHTML = '<span class="icon icon_infos"></span> '+ date_heure +' Votre User Script a été executé avec succès !';
					}
					document.getElementById("error-user-script").appendChild(elSuccess);
				}
				catch(err) {
					var elErr = document.createElement("p");
					elErr.setAttribute("style", "color: red;");
					elErr.setAttribute("class", "err");
					if(hacklol.lang == "en") {
						elErr.innerHTML = '<span class="icon icon_fermer"></span> '+ date_heure +' Error when executing your User Script.<br /><u>Error code</u> : ' + err;
					}
					else {
						elErr.innerHTML = '<span class="icon icon_fermer"></span> '+ date_heure +' Erreur lors de l\'exécution de votre User Script.<br /><u>Code d\'erreur</u> : ' + err;
					}
					document.getElementById("error-user-script").appendChild(elErr);
				}
		}
	}
}
function saveUserScript() {
	codeMirrorUserScript.save();
	var userScriptValue = $("#editeur_user_script").val();
	$.jStorage.set('user-script', userScriptValue);
	if(hacklol.lang == "en") {
		alert("Your User Script have been successfully saved !");
	}
	else {
		alert("Votre User Script a été sauvegardé avec succès !");
	}
	execUserScript();
}
function deleteUserScript() {
	if(hacklol.lang == "en" && confirm("Are you sure that you want to delete your User Script ?")) {
			$.jStorage.deleteKey('user-script');
			alert('User Script deleted !');	
			// code-mirror
			codeMirrorUserScript.getDoc().setValue('// exemple de script utilisateur\nalert("Hello world !");');
	}
	else if(hacklol.lang == "fr" && confirm("Êtes-vous sûr de vouloir supprimer votre User Script ?")) {
			$.jStorage.deleteKey('user-script');
			alert('User Script supprimé !');
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
