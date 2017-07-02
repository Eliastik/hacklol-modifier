<?php
    if(empty($hacklol_modifier_require_pass) || $hacklol_modifier_require_pass !== "hacklol") {
        die("ERR: You have to submit the form to access to Hacklol Modifier.");
    }
?>
<!doctype html>
<html lang="fr">
<head>
    <!-- Hacklol Modifier v.1.4 -->
    <title>Hacklol Modifier</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width">
    <meta name="theme-color" content="#bdc3c7">
    
    <link rel="stylesheet" href="assets/css/main.css">
    <link rel="stylesheet" href="libs/css/magnific-popup.css">
    <link rel="stylesheet" href="libs/css/csshake.min.css">
    <link rel="stylesheet" href="libs/css/colpick.css" type="text/css" />
    
    <script type="text/javascript" src="libs/js/jquery.min.js"></script>
    <script type="text/javascript" src="libs/js/jquery-ui.min.js"></script>
    <script type="text/javascript" src="libs/js/jquery.ui.touch-punch.min.js"></script>
    <script type="text/javascript" src="libs/js/magnific-popup.min.js"></script>
    <script type="text/javascript" src="libs/js/jstorage.min.js"></script>
    <script src="libs/js/colpick.js" type="text/javascript"></script>
    <script src="libs/js/code-mirror/codemirror.js"></script>
    <link rel="stylesheet" href="libs/css/codemirror.css">
    <script src="libs/js/code-mirror/mode/javascript/javascript.js"></script>
    <script src="libs/js/code-mirror/autorefresh.js"></script>
</head>
<body>
    <div id="mask_chargement"></div>
    <div id="chargement">
        <h1>Chargement d'Hacklol Modifier en cours…</h1>
        <div class="horizontal-center mb"><img src="assets/img/chargement.gif" alt="Chargement" id="loadingIndicator" /> <span id="loadingInfos"></span></div>
        <div class="horizontal-center mb"><div class="progress mr vertical-center"><div class="progress-value" id="progressLoading" style="width: 0%;"></div></div> <span id="pourcentageLoadingInfos">0%</span></div>
        <div class="horizontal-center mt" style="font-size: 10pt;"><a href="#" id="loadInBackground">Commencer à utiliser Hacklol Modifier et charger en arrière-plan…</a></div>
        <div class="horizontal-center mt" style="font-size: 12pt; color: red;" id="noscript-text"><span class="icon icon_warning"></span> Javascript est désactivé dans votre navigateur. Javascript est nécessaire au fonctionnement de l'application. <a href="http://www.enable-javascript.com/fr/" target="_blank">Comment activer Javascript ?</a> – <a href="/">Retour à l'accueil du site</a>.</div>
    </div>
    <!-- disparait si javascript est actif -->
    <script type="text/javascript">
        $("#noscript-text").hide();
    </script>
    <div id="wrapper-background-loading-indicator" style="display: block">
        <div id="background-loading-indicator" style="display: none;">
            <div style="text-align: center;"><img src="assets/img/chargement.gif" alt="Chargement" class="vertical-center" /> <span id="backgroundLoadingInfos"></span> <span id="backgroundPourcentageLoadingInfos">0%</span></div>
        </div>
    </div>
    <!-- toolbar -->
    <div id="toolbar-hacklol">
        <ul class="menu" id="menuToolbarTop">
            <li class="open-popup-link lienMenu ripplelink" href="#toolbox-popup"><span class="icon icon_outils"></span> Boîte à outils</li><!-- @whitespace
---><li class="open-popup-link lienMenu ripplelink" href="#a-propos-popup"><span class="icon icon_infos"></span> À propos…</li><!-- @whitespace
---><li class="popup-parametres lienMenu ripplelink" href="#parametres-popup"><span class="icon icon_parametres"></span> Paramètres</li><!-- @whitespace
---><li class="open-popup-link lienMenu ripplelink" href="#changer-site-popup"><span class="icon icon_quitter"></span> Quitter</li><!-- @whitespace
---><li class="btn_close_bar lienMenu ripplelink"><span class="icon icon_fermer"></span> Fermer la barre</li>
        </ul>
        <div id="lienMenuMobile" class="ripplelink"><span class="icon icon_menu"></span> Menu</div>
    </div>
    <div id="mask_opbh" style="display: none;">
        <div class="btn" id="btn-show-toolbar" style="display:none;"><span class="icon icon_menu"></span> Ouvrir la barre</div>
    </div>
    <ul id="menuMobile">
        <li class="open-popup-link lienMenu ripplelink" href="#toolbox-popup"><span class="icon icon_outils"></span> Boîte à outils</li><!-- @whitespace
---><li class="open-popup-link lienMenu ripplelink" href="#a-propos-popup"><span class="icon icon_infos"></span> À propos…</li><!-- @whitespace
---><li class="popup-parametres lienMenu ripplelink" href="#parametres-popup"><span class="icon icon_parametres"></span> Paramètres</li><!-- @whitespace
---><li class="open-popup-link lienMenu ripplelink" href="#changer-site-popup"><span class="icon icon_quitter"></span> Quitter</li><!-- @whitespace
---><li class="btn_close_bar lienMenu ripplelink"><span class="icon icon_fermer"></span> Fermer la barre</li>
    </ul>
    <img src="assets/img/hacklol_start_fleche.png" alt="Cliquez ici pour commencer à utiliser Hacklol Modifier…" id="img_start_hacklol" class="bounce" />
    <!-- popups -->
    <div id="toolbox-popup" class="white-popup mfp-hide">
        <h1>Boite à outils</h1>
        <div style="border-bottom: 1px solid grey; padding-bottom: 10px; text-align: center;"><a class="btn-green open-popup-link btn-same-size" href="#user-script-popup"><span class="icon icon_crayon"></span> Éditer votre User Script</a></div>
        <p style="color: blue; margin-bottom: 0; text-align: center;"><span class="icon icon_infos"></span> Appuyez sur les boutons ci-dessous pour utiliser les outils.</p>
        <div id="toolbox_buttons">
        <table id="align-toolbox-buttons">
            <tr>
                <td><a class="btn popup-modal-dismiss btn-same-size" href="#" onclick="javascript:modifier_page_tool();" id="modif_page"><span class="icon icon_crayon"></span> Modifier la page</a>
                    <a class="btn popup-modal-dismiss btn-same-size" href="#" onclick="javascript:modifier_page_tool_arret();" id="arret_modif_page" style="display: none;"><span class="icon icon_stop"></span> Arrêter de modifier la page</a></td>
            </tr>
            <tr>
                <td><a class="btn popup-modal-dismiss btn-same-size" id="disparition_page" href="#"><span class="icon icon_magic"></span> Faire disparaître la page</a>
                    <a class="btn popup-modal-dismiss btn-same-size" id="re_apparition_page" href="#" style="display:none;"><span class="icon icon_page"></span> Faire ré-apparaître la page (disparition)</a></td>
            </tr>
            <tr>
                <td><a class="btn popup-modal-dismiss btn-same-size" href="#" id="click-paint"><span class="icon icon_brush"></span> Dessiner sur la page</a>
                    <a class="btn_desactived btn-same-size" href="#" id="paint-not-compatible" style="display: none;"><span class="icon icon_brush"></span> Dessiner sur la page</a>
                    <a class="btn popup-modal-dismiss btn-same-size" href="#" id="click-paint-stop" style="display:none;"><span class="icon icon_fermer"></span> Fermer l'interface de dessin</a></td>
            </tr>
            <tr>
                <td><a class="btn popup-modal-dismiss btn-same-size" href="#" id="click-explosion"><span class="icon icon_explode"></span> Faire exploser la page</a>
                    <a class="btn popup-modal-dismiss btn-same-size" href="#" id="click-explosion-stop" style="display:none;"><span class="icon icon_page"></span> Faire ré-apparaître la page (explosion)</a></td>
            </tr>
            <tr>
                <td><a class="btn popup-modal-dismiss btn-same-size" href="#" id="click-gel"><span class="icon icon_contrast"></span> Geler la page</a>
                    <a class="btn_desactived btn-same-size" href="#" id="click-gel-infos-d" style="display:none;"><span class="icon icon_contrast"></span> Page gelée (pour la dégeler, cliquez sur « Faire exploser la page »)</a></td>
            </tr>
            <tr>
                <td><a class="btn open-popup-link btn-same-size" href="#defacer-popup"><span class="icon icon_eclair"></span> Défacer le site</a></td>
            </tr>
            <tr>
                <td><a class="btn popup-modal-dismiss btn-same-size" href="#" id="matrix"><span class="icon icon_matrix"></span> Matrix</a>
                    <a class="btn_desactived btn-same-size" href="#" id="matrix-not-compatible" style="display: none;"><span class="icon icon_matrix"></span> Matrix</a>
                    <a class="btn popup-modal-dismiss btn-same-size" href="#" id="matrix-stop" style="display: none;"><span class="icon icon_stop"></span> Arrêter Matrix</a></td>
            </tr>
            <tr>
                <td><a class="btn open-popup-link btn-same-size" href="#bsod-popup" id="click-bsod"><span class="icon icon_windows"></span> BSOD</a>
                    <a class="btn popup-modal-dismiss btn-same-size" href="#" id="click-bsod-stop" style="display:none;"><span class="icon icon_stop"></span> Arrêter BSOD</a></td>
            </tr>
            <tr>
                <td><a class="btn popup-modal-dismiss btn-same-size" href="#" id="click-flouter"><span class="icon icon_page"></span> Flouter la page</a>
                    <a class="btn popup-modal-dismiss btn-same-size" href="#" id="click-flouter-stop" style="display:none;"><span class="icon icon_stop"></span> Dé-flouter la page</a></td>
            </tr>
            <tr>
                <td><a class="btn popup-modal-dismiss btn-same-size" href="#" id="click-secouer"><span class="icon icon_secouer"></span> Secouer la page</a>
                    <a class="btn popup-modal-dismiss btn-same-size" href="#" id="click-secouer-stop" style="display:none;"><span class="icon icon_stop"></span> Arrêter de secouer la page</a></td>
            </tr>
        </table>
        </div>
    </div>
    <div id="user-script-popup" class="white-popup mfp-hide">
        <h1>User Script</h1>
        <p style="font-size: 10pt;">Ici, vous pouvez éditer un User Script (script utilisateur) pour Hacklol Modifier grâce au langage de programmation JavaScript. Il sera executé à chaque démarrage d'Hacklol Modifier et lors de la sauvegarde de celui-ci. Une documentation est disponible en ligne pour vous permettre d'utiliser les fonctionnalités d'Hacklol Modifier dans vos scripts. Veuillez noter que certaines fonctions sont désactivées pour des raisons de sécurité.<br /><strong>Attention, supprimer vos données de navigation telle que le LocalStorage ou vos cookies aura pour effet de supprimer definitivement votre User Script. Je vous conseille de faire une sauvegarde de celui-ci pour éviter cela.</strong></p>
        <textarea id="editeur_user_script" style="width:100%; height:300px;"></textarea>
        <div id="error-user-script" style="height: 150px; overflow: auto; border: 1px solid #000; padding: 10px; margin: 15px 5px 5px;"><h2>Journal du script :</h2></div>
        <a class="btn-green" href="#" id="save-user-script"><span class="icon icon_save"></span> Enregistrer</a> <a class="btn-red" id="delete-user-script"><span class="icon icon_reset"></span> Réinitialiser l'User Script</a> <a class="btn" href="/documentation_user-script.html" target="_blank"><span class="icon icon_doc"></span> Documentation</a> <a class="btn-red popup-modal-dismiss" href="#"><span class="icon icon_fermer"></span> Fermer</a>
    </div>
    <div id="defacer-popup" class="white-popup mfp-hide">
        <h1>Défacer le site</h1>
        <p>Pour défacer ce site, veuillez remplir le formulaire suivant :</p>
        <div><label for="titre_deface_input">Titre :</label></div>
        <div><input type="text" id="titre_deface_input" placeholder="Entrez le titre…" style="width:100%;" /></div>
        <div><label for="editeur_deface">Texte :</label></div>
        <div><textarea id="editeur_deface" style="width:100%; height:200px;" placeholder="Entrez le texte qui sera affiché…"></textarea></div>
        <div><label for="colorpicker3">Couleur d'arrière plan :</label></div>
        <div><input type="text" id="colorpicker3" maxlength="6" placeholder="Cliquez ici" value="FE4A4A" style="border-color: #FE4A4A" /></div>
        <div><a id="defacer_site_ok" class="btn-green popup-modal-dismiss"><span class="icon icon_vrai"></span> Défacer le site</a>
        <a id="defacer_site_reafficher" class="btn popup-modal-dismiss" style="display: none;"><span class="icon icon_page"></span> Faire ré-apparaître le site</a>
        <a class="btn-red popup-modal-dismiss" href="#"><span class="icon icon_fermer"></span> Fermer cette fenêtre</a></div>
        <h2>Jeu de la chasse aux Easter Eggs</h2>
        <p id="easter_egg_count" style="color: green; font-size: 11pt; font-weight: bold;"></p>
        <p style="color: blue; font-size: 10pt; margin: 0;"><span id="numberEasterEgg">???</span> Easter Eggs (œufs de Pâques) sont cachés dans cet outil. Pour les trouver, vous devez entrer un mot ou une phrase particulière dans l'un des deux champs de formulaire (&laquo; Titre &raquo; ou &laquo; Texte &raquo;). Un petit indice : il s'agit tous de mèmes (phénomènes) Internet. Bonne chance !</p>
        <p style="margin-bottom: 0;"><a href="#null" id="indiceEgg">Un autre indice</a> – <a href="#null" id="cheatEgg">Tous les révéler</a></p>
    </div>
    <div id="bsod-popup" class="white-popup mfp-hide">
        <h1>BSOD</h1>
        <p><label for="bsodType">Sélectionnez le type de BSOD que vous voulez afficher :</label></p>
        <select name="bsodType" id="bsodType" style="width: 100%;">
            <option value="WINXP">Windows XP/Vista/7</option>
            <option value="WIN8">Windows 8/10</option>
        </select>
        <p style="font-size: 10pt;">Astuce pour afficher le BSOD en plein écran : Fermez la barre du haut, puis faites le raccourci clavier G + M pour masquer le bouton d'ouverture de la barre, puis mettez votre navigateur web en plein écran (touche F11).</p>
        <a id="bsod_site_ok" class="btn-green popup-modal-dismiss" href="#"><span class="icon icon_vrai"></span> Valider</a>
        <a class="btn-red popup-modal-dismiss" href="#"><span class="icon icon_fermer"></span> Fermer cette fenêtre</a>
    </div>
    <div id="changer-site-popup" class="white-popup mfp-hide">
        <h1>Quitter Hacklol Modifier</h1>
        <p>Êtes-vous sûr de vouloir quitter Hacklol Modifier et de retourner à la page d'accueil du site ?</p>
        <a href="#" class="btn-green" id="quitHacklolBtn"><span class="icon icon_vrai"></span> Oui</a>
        <a class="btn-red popup-modal-dismiss" href="#"><span class="icon icon_fermer"></span> Non</a>
    </div>
    <div id="a-propos-popup" class="white-popup mfp-hide">
        <h1>A propos d'Hacklol Modifier</h1>
        <div id="testVersionHacklol" style="font-size: 10pt; color: blue;"></div>
        <table style="width:100%;">
            <tr>
                <td><label>Version de l'application</label></td>
                <td id="versionHacklolAbout"></td>
            </tr>
            <tr>
                <td><label>Date de version</label></td>
                <td id="dateVersionHacklolAbout"></td>
            </tr>
            <tr>
                <td><label>Crédits</label></td>
                <td><a href="http://jquery.com/" target="_blank">Jquery</a>, <a href="http://dimsemenov.com/plugins/magnific-popup/" target="_blank">Magnific Popup</a>, jStorage, <a href="https://icomoon.io" target="_blank">IcoMoon Free</a>, colpick Color Picker, <a href="http://www.vincent-rousseau.net/content/mini-paint-html5-avec-canvas" target="_blank">Mini paint HTML5</a>, <a href="http://www.arungudelli.com/html5/matrix-effect-using-html5-and-javascript/" target="_blank">Matrix Effect HTML5+Javascript</a>, <a href="https://github.com/mohammadg/FakeBSOD.com" target="_blank">FakeBSOD</a>, <a href="https://elrumordelaluz.github.io/csshake/" target="_blank">CSSHake</a>
                </td>
            </tr>
        </table>
        <h2>A propos du site choisi</h2>
        <table style="width:100%;">
            <tr>
                <td><label>Adresse URL</label></td>
                <td>
                    <div style="width:250px; overflow:auto;"><?php echo htmlentities($url); ?></div>
                </td>
            </tr>
            <tr>
                <td><label>Contrôles</label></td>
                <td>
                    <div class="btn popup-modal-dismiss btn-same-size" href="#" id="retour-page-button"><span class="icon icon_retour"></span> Page précédente</div> <div class="btn popup-modal-dismiss btn-same-size" href="#" id="suivant-page-button"><span class="icon icon_suivant"></span> Page suivante</div> <div class="btn popup-modal-dismiss btn-same-size" href="#" id="reload-page-button"><span class="icon icon_reset"></span> Recharger le site</div> <div class="btn open-popup-link btn-same-size" href="#change-site-popup"><span class="icon icon_reinit"></span> Changer de site</div>
                </td>
            </tr>
        </table>
    </div>
    <div id="change-site-popup" class="white-popup mfp-hide">
        <h1>Changer de site</h1>
        <p><label for="urlChangeSite">Entrez l'adresse du site que vous voulez modifier :</label></p>
        <input type="text" id="urlChangeSite" placeholder="Entrez l'adresse du site…" style="width:100%;" />
        <span id="errorUrlChange" style="display: none; color: red;"></span><br />
        <a id="change_site_ok" class="btn-green" href="#"><span class="icon icon_vrai"></span> Valider</a>
        <a class="btn-red popup-modal-dismiss" href="#"><span class="icon icon_fermer"></span> Annuler</a>
    </div>
    <div id="parametres-popup" class="white-popup mfp-hide">
        <h1>Param&egrave;tres</h1>
        <form name="parametres">
                <label class="control control--checkbox">Affichage de la barre d'outils au démarrage d'Hacklol Modifier
                    <input type="checkbox" name="checkboxAffichBarre" id="affichagebarre">
                    <div class="control__indicator"></div>
                </label>
                <label class="control control--checkbox">Transparence des barres d'outils
                    <input type="checkbox" name="checkboxTransBarre" id="transparencebarre">
                    <div class="control__indicator"></div>
                </label>
                <label class="control control--checkbox">Activer les effets sonores
                        <input type="checkbox" name="effets_sonores_checkbox" id="effets_sonores">
                        <div class="control__indicator"></div>
                </label>
                <p id="indication_error"></p>
                <label class="control control--checkbox">Activer les raccourcis clavier
                        <input type="checkbox" id="raccourcis_clavier">
                        <div class="control__indicator"></div>
                </label>
                <p><a class="btn open-popup-link" href="#infos-raccourcis" style="font-size:10pt; margin: 0 0;" onclick="javascript:optionsCheck();"><span class="icon icon_recherche"></span> Voir la liste des raccourcis clavier</a></p>
                <label class="control control--checkbox">Activer l'effet de flou à l'ouverture d'une fenêtre
                        <input type="checkbox" name="flou_effet_checkbox" id="flou_effet">
                    <div class="control__indicator"></div>
                </label>
                <p style="font-size: 10pt;">Cet effet peut générer une baisse de fluidité sur certains navigateurs web.</p>
                <label class="control control--checkbox">Activer Hacklol Page Loader <span style="font-size: 10.5pt;">(recommandé)</span>
                        <input type="checkbox" name="hacklol_pl_checkbox" id="hacklol_page_loader_check">
                    <div class="control__indicator"></div>
                </label>
                    <p style="font-size: 10pt;">Permet aux sites web d'être chargés depuis le serveur d'Hacklol. Améliore la compatibilité des sites. <strong>Désactivez cette option si le site s'affiche mal</strong>.</p>
                <p>
                <label for="couleurBarreSelect">Couleur des barres d'outils :</label>
                        <select name="couleurBarreSelect" id="couleurBarreSelect">
                            <option value="Defaut">Par défaut (gris clair)</option>
                            <option value="Personnalisation">Couleur personnalisée…</option>
                            <option value="Bleu">Bleu</option>
                            <option value="Rouge">Rouge</option>
                            <option value="Vert">Vert</option>
                            <option value="Jaune">Jaune</option>
                            <option value="Orange">Orange</option>
                            <option value="Rose">Rose</option>
                            <option value="Violet">Violet</option>
                            <option value="Brun">Brun</option>
                            <option value="Noir">Noir</option>
                            <option value="Blanc">Blanc</option>
                        </select>
                </p>
                <div id="choixcouleur" style="display:none;">
                    <label for="colorpicker1" id="colorpicker-indication">Veuillez choisir une couleur :</label>
                    <input type="text" id="colorpicker1" maxlength="6" placeholder="Cliquez ici" style="border-color: #000000" />
                </div>
                <a id="parametre_ok" class="btn-green"><span class="icon icon_vrai"></span> OK</a>
                <a onclick="javascript:optionsCheck();" class="btn-red popup-modal-dismiss" href="#"><span class="icon icon_fermer"></span> Annuler</a>
                <a class="btn" id="reset_data"><span class="icon icon_poubelle"></span> Réinitialiser les données</a>
        </form>
    </div>
    <div id="infos-raccourcis" class="white-popup mfp-hide">
        <h1>Raccourcis clavier</h1>
        <table style="width:100%;">
            <tr>
                <td><b>Action à effectuer</b></td>
                <td><b>Raccourci clavier</b></td>
            </tr>
            <tr>
                <td>Faire disparaître/ré-apparaître les boutons « Ouvrir la barre »</td>
                <td><span class="keyboard_key">G</span> <span class="keyboard_key">M</span></td>
            </tr>
            <tr>
                <td>Fermer/Ouvrir la barre d'outils du haut</td>
                <td><span class="keyboard_key">G</span> <span class="keyboard_key">O</span></td>
            </tr>
            <tr>
                <td>Aller à la page précédente</td>
                <td><span class="keyboard_key">G</span> <span class="keyboard_key">B</span></td>
            </tr>
            <tr>
                <td>Aller à la page suivante</td>
                <td><span class="keyboard_key">G</span> <span class="keyboard_key">F</span></td>
            </tr>
            <tr>
                <td>Recharger le site</td>
                <td><span class="keyboard_key">G</span> <span class="keyboard_key">R</span></td>
            </tr>
            <tr>
                <td>Fermer une fenêtre</td>
                <td><span class="keyboard_key">Echap</span></td>
            </tr>
            <tr>
                <td>Quitter Hacklol Modifier</td>
                <td><span class="keyboard_key">G</span> <span class="keyboard_key">Q</span></td>
            </tr>
        </table>
        <a class="btn-red popup-modal-dismiss" href="#"><span class="icon icon_fermer"></span> Fermer</a>
    </div>
    <div id="erreur-script" class="white-popup mfp-hide">
        <h1>Une erreur est survenue</h1>
        <p>Une erreur est survenue dans Hacklol Modifier. Vous pouvez toujours utiliser l'application, mais il se peut qu'elle ne fonctionne pas correctement.</p>
        <p>Vous pouvez aider à résoudre le problème en <a href="https://github.com/Eliastik/hacklol-modifier/issues" target="_blank">postant une issue sur le dépôt Github</a> d'Hacklol Modifier en indiquant ces informations :</p>
        <textarea style="width: 100%;" id="erreurScriptTextarea" rows="10">Rapport d'erreur Javascript automatiquement généré par Hacklol Modifier :</textarea>
        <br /><label class="control control--checkbox">Ne plus afficher à nouveau ce genre d'erreurs durant cette session
            <input type="checkbox" name="checkboxDisableErrors" id="checkboxDisableErrors">
            <div class="control__indicator"></div>
        </label>
        <a class="btn-red popup-modal-dismiss" href="#" style="margin: 0 0;"><span class="icon icon_fermer"></span> Fermer</a>
    </div>
    <div id="wrapper" class="wrapperNormal" style="display:none">
        <canvas id="canvas" width="800" height="500" class="canvasNormal"></canvas>
    </div>
    <div class="bulleMenu" id="bulleCouleur" style="display: none;">
        <ul id="couleurs">
            <li><a href="#" data-couleur="#000000" class="actif" id="color_paint_default">Noir</a></li>
            <li><a href="#" data-couleur="#ffffff">Blanc</a></li>
            <li><a href="#" data-couleur="#ff0000">Rouge</a></li>
            <li><a href="#" data-couleur="brown">Marron</a></li>
            <li><a href="#" data-couleur="orange">Orange</a></li>
            <li><a href="#" data-couleur="yellow">Jaune</a></li>
            <li><a href="#" data-couleur="green">Vert</a></li>
            <li><a href="#" data-couleur="cyan">Cyan</a></li>
            <li><a href="#" data-couleur="blue">Bleu</a></li>
            <li><a href="#" data-couleur="indigo">Indigo</a></li>
            <li><a href="#" data-couleur="Violet">Violet</a></li>
            <li><a href="#" data-couleur="pink">Rose</a></li>
            <li><a href="#" id="choixCouleur" style="background-color: #ffffff;">Choisir une couleur…</a></li>
        </ul>
    </div>
    <div class="bulleMenu" id="bulleBrush" style="display: none;">
        <form id="largeurs_pinceau">
            <input id="largeur_pinceau" type="range" min="2" max="50" value="5" /><br />
            <output id="output">5 pixels</output>
        </form>
    </div>
    <div id="paint-tools" style="display: none;">
        <ul class="menu" id="menuPaint">
            <li class="lienMenu ripplelink" id="colorPaint"><span class="icon icon_color"></span> Couleurs</li><!-- @whitespace
---><li class="lienMenu ripplelink" id="brushPaint"><span class="icon icon_brush"></span> Taille du pinceau</li><!-- @whitespace
---><li class="lienMenu ripplelink" id="resetPaint"><span class="icon icon_reset"></span> Réinitialiser</li><!-- @whitespace
---><li class="lienMenu ripplelink" id="savePaint"><span class="icon icon_save"></span> Sauvegarder le dessin</li><!-- @whitespace
---><li class="lienMenu ripplelink" id="close-dessin-tools"><span class="icon icon_fermer"></span> Fermer la barre</li>
        </ul>
    </div>
    <div id="mask_opbb" style="display: none;">
        <div class="btn" id="btn-show-toolbar-paint" style="display:none;"><span class="icon icon_menu"></span> Ouvrir la barre</div>
    </div>
    <!-- site iframe -->
    <div id="hacklol-iframeWrapper"><iframe src="" id="hacklol-iframe"></iframe></div>
    <!-- explosion -->
    <div id="mask_explosion" style="display: none;"></div>
    <div id="explosion_img" style="display: none;">
        <div class="centerer"></div>
        <img src="" id="explosion_img_effet"></img>
    </div>
    <!-- matrix -->
    <canvas id="q" width="500" height="500" style="display: none;"></canvas>
    <!-- gel -->
    <div id="gel_img" style="display: none;"></div>
    <!-- defacer -->
    <div id="deface_div" style="background-color: #FE4A4A; display: none;">
        <h1 id="titre_deface" style="word-wrap: break-word; margin-left: 8px; margin-right: 8px">–</h1>
        <p id="texte_deface" style="word-wrap: break-word; margin-left: 8px; margin-right: 8px">–</p>
        <p id="p_egg" style="word-wrap: break-word; margin-left: 8px; margin-right: 8px"></p>
    </div>
    <!-- BSOD Generic -->
    <div id="genericBSOD" style="display: none;">
        <b>
            <span class="negBSOD">Windows</span>
            <p id="BSOD">
                A problem has been detected and windows has been shut down to prevent damage to your computer.
            </p>
            <p id="BSOD">
                *** STOP: 0xFFFFFFFF (0xFFFFFFFF, 0xUUUUUUUU, 0xUUUUUUUU, 0xUUUUUUUU).<br /><br />
                * Press any key to terminate the current application.<br />
                * Press CTRL+ALT+DELETE again to restart your computer. You will lose any unsaved information in all applications.<br />
            </p>
            <center>Press any key to continue <span id="blink">_</span></center>
        </b>
    </div>
    <!-- BSOD WIN 8/10 -->
    <div id="win8BSOD" style="display: none;">
        <div id="sadfaceBSOD"></div>
        <p id="win8topblockBSOD">
            Your PC ran into a problem that it couldn't handle,
            and now it needs to restart We're just collecting some error info, and then we'll restart for you.</p>
        <p id="win8errorblockBSOD">If you'd like to know more, you can search online later for this error: DPC_WATCHDOG_VIOLATION</p>
    </div>
    <!-- scripts page global -->
    <script type="text/javascript">
        urlPage_global = "<?php echo addslashes($url); ?>";
    </script>
    <script type="text/javascript" src="assets/js/main.js"></script>
    <script type="text/javascript" src="assets/js/keyboard.min.js"></script>
    <script type="text/javascript" src="assets/js/paint.min.js"></script>
    <script type="text/javascript" src="assets/js/detectError.js"></script>
    <script type="text/javascript" src="assets/js/user-script.min.js"></script>
</body>
</html>
