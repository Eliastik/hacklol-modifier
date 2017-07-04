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
        <link rel="stylesheet" href="libs/css/codemirror.css">

        <script type="text/javascript" src="libs/js/jquery.min.js"></script>
        <script type="text/javascript" src="libs/js/jquery-ui.min.js"></script>
        <script type="text/javascript" src="libs/js/jquery.ui.touch-punch.min.js"></script>
        <script type="text/javascript" src="libs/js/magnific-popup.min.js"></script>
        <script type="text/javascript" src="libs/js/jstorage.min.js"></script>
        <script type="text/javascript" src="libs/js/colpick.js" type="text/javascript"></script>
        <script type="text/javascript" src="libs/js/code-mirror/codemirror.js"></script>
        <script type="text/javascript" src="libs/js/code-mirror/mode/javascript/javascript.js"></script>
        <script type="text/javascript" src="libs/js/code-mirror/autorefresh.js"></script>
        <script type="text/javascript" src="libs/js/i18next/i18next.min.js"></script>
        <script type="text/javascript" src="libs/js/i18next/jquery-i18next.min.js"></script>
        <script type="text/javascript" src="libs/js/i18next/i18nextBrowserLanguageDetector.min.js"></script>
        <script type="text/javascript" src="assets/locales/i18n-min.js"></script>
    </head>
    <body>
        <div id="mask_chargement"></div>
        <div id="chargement">
            <h1 data-i18n="[html]loading.title">Chargement de <span class="appName">l'application</span> en cours…</h1>
            <div class="horizontal-center mb"><img src="assets/img/chargement.gif" alt="Chargement" id="loadingIndicator" /> <span id="loadingInfos"></span></div>
            <div class="horizontal-center mb"><div class="progress mr vertical-center"><div class="progress-value" id="progressLoading" style="width: 0%;"></div></div> <span id="pourcentageLoadingInfos">0%</span></div>
            <div class="horizontal-center mt" style="font-size: 10pt;"><a href="#" id="loadInBackground" data-i18n="[html]loading.start">Commencer à utiliser <span class="appName">l'application</span> et charger en arrière-plan…</a></div>
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
                <li class="open-popup-link lienMenu ripplelink" href="#toolbox-popup"><span class="icon icon_outils"></span> <span data-i18n="toolbar.toolbox"></span></li><!-- @whitespace
------------><li class="open-popup-link lienMenu ripplelink" href="#a-propos-popup"><span class="icon icon_infos"></span> <span data-i18n="toolbar.about"></span></li><!-- @whitespace
------------><li class="popup-parametres lienMenu ripplelink" href="#parametres-popup"><span class="icon icon_parametres"></span> <span data-i18n="toolbar.settings"></span></li><!-- @whitespace
------------><li class="open-popup-link lienMenu ripplelink" href="#changer-site-popup"><span class="icon icon_quitter"></span> <span data-i18n="toolbar.quit"></span></li><!-- @whitespace
------------><li class="btn_close_bar lienMenu ripplelink"><span class="icon icon_fermer"></span> <span data-i18n="toolbar.close"></span></li>
            </ul>
            <div id="lienMenuMobile" class="ripplelink"><span class="icon icon_menu"></span> <span data-i18n="toolbar.menu"></span></div>
        </div>
        <div id="mask_opbh" style="display: none;">
            <div class="btn" id="btn-show-toolbar" style="display:none;"><span class="icon icon_menu"></span> <span data-i18n="toolbar.open"></span></div>
        </div>
        <ul id="menuMobile">
            <li class="open-popup-link lienMenu ripplelink" href="#toolbox-popup"><span class="icon icon_outils"></span> <span data-i18n="toolbar.toolbox"></span></li><!-- @whitespace
-----------><li class="open-popup-link lienMenu ripplelink" href="#a-propos-popup"><span class="icon icon_infos"></span> <span data-i18n="toolbar.about"></span></li><!-- @whitespace
-----------><li class="popup-parametres lienMenu ripplelink" href="#parametres-popup"><span class="icon icon_parametres"></span> <span data-i18n="toolbar.settings"></span></li><!-- @whitespace
-----------><li class="open-popup-link lienMenu ripplelink" href="#changer-site-popup"><span class="icon icon_quitter"></span> <span data-i18n="toolbar.quit"></span></li><!-- @whitespace
-----------><li class="btn_close_bar lienMenu ripplelink"><span class="icon icon_fermer"></span> <span data-i18n="toolbar.close"></span></li>
        </ul>
        <img src="assets/img/hacklol_start_fleche.png" alt="Cliquez ici pour commencer à utiliser l'application…" id="img_start_hacklol" class="bounce" />
        <!-- popups -->
        <div id="toolbox-popup" class="white-popup mfp-hide">
            <h1 data-i18n="toolbox.title"></span></h1>
            <div style="border-bottom: 1px solid grey; padding-bottom: 10px; text-align: center;"><a class="btn-green open-popup-link btn-same-size" href="#user-script-popup"><span class="icon icon_crayon"></span> <span data-i18n="toolbox.userscript"></span></a></div>
            <p style="color: blue; margin-bottom: 0; text-align: center;"><span class="icon icon_infos"></span> <span data-i18n="toolbox.infos"></span></p>
            <div id="toolbox_buttons">
            <table id="align-toolbox-buttons">
                <tr>
                    <td><a class="btn popup-modal-dismiss btn-same-size" href="#" onclick="javascript:modifier_page_tool();" id="modif_page"><span class="icon icon_crayon"></span> <span data-i18n="toolbox.edit"></span></a>
                        <a class="btn popup-modal-dismiss btn-same-size" href="#" onclick="javascript:modifier_page_tool_arret();" id="arret_modif_page" style="display: none;"><span class="icon icon_stop"></span> <span data-i18n="toolbox.editstop"></span></a></td>
                </tr>
                <tr>
                    <td><a class="btn popup-modal-dismiss btn-same-size" id="disparition_page" href="#"><span class="icon icon_magic"></span> <span data-i18n="toolbox.hide"></span></a>
                        <a class="btn popup-modal-dismiss btn-same-size" id="re_apparition_page" href="#" style="display:none;"><span class="icon icon_page"></span> <span data-i18n="toolbox.hidestop"></span></a></td>
                </tr>
                <tr>
                    <td><a class="btn popup-modal-dismiss btn-same-size" href="#" id="click-paint"><span class="icon icon_brush"></span> <span data-i18n="toolbox.paint"></span></a>
                        <a class="btn_desactived btn-same-size" href="#" id="paint-not-compatible" style="display: none;"><span class="icon icon_brush"></span> <span data-i18n="toolbox.paint"></span></a>
                        <a class="btn popup-modal-dismiss btn-same-size" href="#" id="click-paint-stop" style="display:none;"><span class="icon icon_fermer"></span> <span data-i18n="toolbox.paintstop"></span></a></td>
                </tr>
                <tr>
                    <td><a class="btn popup-modal-dismiss btn-same-size" href="#" id="click-explosion"><span class="icon icon_explode"></span> <span data-i18n="toolbox.explode"></span></a>
                        <a class="btn popup-modal-dismiss btn-same-size" href="#" id="click-explosion-stop" style="display:none;"><span class="icon icon_page"></span> <span data-i18n="toolbox.explodestop"></span></a></td>
                </tr>
                <tr>
                    <td><a class="btn popup-modal-dismiss btn-same-size" href="#" id="click-gel"><span class="icon icon_contrast"></span> <span data-i18n="toolbox.freeze"></span></a>
                        <a class="btn_desactived btn-same-size" href="#" id="click-gel-infos-d" style="display:none;"><span class="icon icon_contrast"></span> <span data-i18n="toolbox.freezestop"></span></a></td>
                </tr>
                <tr>
                    <td><a class="btn open-popup-link btn-same-size" href="#defacer-popup"><span class="icon icon_eclair"></span> <span data-i18n="toolbox.deface"></span></a></td>
                </tr>
                <tr>
                    <td><a class="btn popup-modal-dismiss btn-same-size" href="#" id="matrix"><span class="icon icon_matrix"></span> <span data-i18n="toolbox.matrix"></span></a>
                        <a class="btn_desactived btn-same-size" href="#" id="matrix-not-compatible" style="display: none;"><span class="icon icon_matrix"></span> <span data-i18n="toolbox.matrix"></span></a>
                        <a class="btn popup-modal-dismiss btn-same-size" href="#" id="matrix-stop" style="display: none;"><span class="icon icon_stop"></span> <span data-i18n="toolbox.matrixstop"></span></a></td>
                </tr>
                <tr>
                    <td><a class="btn open-popup-link btn-same-size" href="#bsod-popup" id="click-bsod"><span class="icon icon_windows"></span> <span data-i18n="toolbox.bsod"></span></a>
                        <a class="btn popup-modal-dismiss btn-same-size" href="#" id="click-bsod-stop" style="display:none;"><span class="icon icon_stop"></span> <span data-i18n="toolbox.bsodstop"></span></a></td>
                </tr>
                <tr>
                    <td><a class="btn popup-modal-dismiss btn-same-size" href="#" id="click-flouter"><span class="icon icon_page"></span> <span data-i18n="toolbox.blur"></span></a>
                        <a class="btn popup-modal-dismiss btn-same-size" href="#" id="click-flouter-stop" style="display:none;"><span class="icon icon_stop"></span> <span data-i18n="toolbox.blurstop"></span></a></td>
                </tr>
                <tr>
                    <td><a class="btn popup-modal-dismiss btn-same-size" href="#" id="click-secouer"><span class="icon icon_secouer"></span> <span data-i18n="toolbox.shake"></span></a>
                        <a class="btn popup-modal-dismiss btn-same-size" href="#" id="click-secouer-stop" style="display:none;"><span class="icon icon_stop"></span> <span data-i18n="toolbox.shakestop"></span></a></td>
                </tr>
            </table>
            </div>
        </div>
        <div id="user-script-popup" class="white-popup mfp-hide">
            <h1 data-i18n="user-script.title"></h1>
            <p style="font-size: 10pt;" data-i18n="[html]user-script.infos"></p>
            <textarea id="editeur_user_script" style="width:100%; height:300px;"></textarea>
            <div id="error-user-script" style="height: 150px; overflow: auto; border: 1px solid #000; padding: 10px; margin: 15px 5px 5px;"><h2 data-i18n="user-script.log"></h2></div>
            <a class="btn-green" href="#" id="save-user-script"><span class="icon icon_save"></span> <span data-i18n="user-script.save"></span></a> <a class="btn-red" id="delete-user-script"><span class="icon icon_reset"></span>  <span data-i18n="user-script.reset"></span></a> <a class="btn" href="/documentation_user-script.html" target="_blank"><span class="icon icon_doc"></span> <span data-i18n="user-script.documentation"></span></a> <a class="btn-red popup-modal-dismiss" href="#"><span class="icon icon_fermer"></span> <span data-i18n="close"></span></a>
        </div>
        <div id="defacer-popup" class="white-popup mfp-hide">
            <h1 data-i18n="deface.title"></h1>
            <p data-i18n="deface.infos"></p>
            <div><label for="titre_deface_input" data-i18n="deface.titleform"></label></div>
            <div><input type="text" id="titre_deface_input" data-i18n="[placeholder]deface.titleplaceholder" placeholder="" style="width:100%;" /></div>
            <div><label for="editeur_deface" data-i18n="deface.textform"></label></div>
            <div><textarea id="editeur_deface" style="width:100%; height:200px;" data-i18n="[placeholder]deface.textplaceholder" placeholder=""></textarea></div>
            <div><label for="colorpicker3" data-i18n="deface.backgroundcolor"></label></div>
            <div><input type="text" id="colorpicker3" maxlength="6" data-i18n="[placeholder]deface.backgroundcolorplaceholder" placeholder="" value="FE4A4A" style="border-color: #FE4A4A" /></div>
            <div><a id="defacer_site_ok" class="btn-green popup-modal-dismiss"><span class="icon icon_vrai"></span> <span data-i18n="validate"></span></a>
            <a id="defacer_site_reafficher" class="btn popup-modal-dismiss" style="display: none;"><span class="icon icon_page"></span> <span data-i18n="deface.reset"></span></a>
            <a class="btn-red popup-modal-dismiss" href="#"><span class="icon icon_fermer"></span> <span data-i18n="closewindow"></span></a></div>
            <h2 data-i18n="eegame.title"></h2>
            <p id="easter_egg_count" style="color: green; font-size: 11pt; font-weight: bold;"></p>
            <p style="color: blue; font-size: 10pt; margin: 0;" data-i18n="[html]eegame.infos"></p>
            <p style="margin-bottom: 0;"><a href="#null" id="indiceEgg" data-i18n="eegame.indice"></a> – <a href="#null" id="cheatEgg" data-i18n="[html]eegame.reveal"></a></p>
        </div>
        <div id="bsod-popup" class="white-popup mfp-hide">
            <h1 data-i18n="bsod-popup.title"></h1>
            <p><label for="bsodType" data-i18n="bsod-popup.select"></label></p>
            <select name="bsodType" id="bsodType" style="width: 100%;">
                <option value="WINXP" data-i18n="bsod-popup.winxp"></option>
                <option value="WIN8" data-i18n="bsod-popup.win8"></option>
            </select>
            <p style="font-size: 10pt;" data-i18n="bsod-popup.infos"></p>
            <a id="bsod_site_ok" class="btn-green popup-modal-dismiss" href="#"><span class="icon icon_vrai"></span> <span data-i18n="validate"></span></a>
            <a class="btn-red popup-modal-dismiss" href="#"><span class="icon icon_fermer"></span> <span data-i18n="closewindow"></span></a>
        </div>
        <div id="changer-site-popup" class="white-popup mfp-hide">
            <h1><span data-i18n="quit.title"></span> <span class="appName"></span></h1>
            <p data-i18n="[html]quit.infos"></p>
            <a href="#" class="btn-green" id="quitHacklolBtn"><span class="icon icon_vrai"></span> <span data-i18n="yes"></span></a>
            <a class="btn-red popup-modal-dismiss" href="#"><span class="icon icon_fermer"></span> <span data-i18n="no"></span></a>
        </div>
        <div id="a-propos-popup" class="white-popup mfp-hide">
            <h1><span data-i18n="about.title"></span> <span class="appName"></span></h1>
            <div id="testVersionHacklol" style="font-size: 10pt; color: blue;"></div>
            <div><label data-i18n="about.version"></label> <span id="versionHacklolAbout"></span></div>
            <div><label data-i18n="about.date"></label> <span id="dateVersionHacklolAbout"></span></div>
            <a class="btn open-popup-link" href="#more-infos-popup"><span class="icon icon_infos"></span> <span data-i18n="about.advancedinfos"></span></a>
            <h2 data-i18n="about.sitetitle"></h2>
            <div><label data-i18n="about.url"></label></div>
            <p style="overflow:auto;"><?php echo htmlentities($url); ?></p>
            <label data-i18n="about.controls"></label>
            <div style="text-align: center;"><a class="btn popup-modal-dismiss btn-same-size" href="#" id="retour-page-button"><span class="icon icon_retour"></span> <span data-i18n="about.previous"></span></a><a class="btn popup-modal-dismiss btn-same-size" href="#" id="suivant-page-button"><span class="icon icon_suivant"></span> <span data-i18n="about.next"></span></a><a class="btn popup-modal-dismiss btn-same-size" href="#" id="reload-page-button"><span class="icon icon_reset"></span> <span data-i18n="about.reload"></span></a><a class="btn open-popup-link btn-same-size" href="#change-site-popup"><span class="icon icon_reinit"></span> <span data-i18n="about.change"></span></a></div>
        </div>
        <div id="more-infos-popup" class="white-popup mfp-hide">
            <h1 data-i18n="advancedinfos.title"></h1>
            <div data-i18n="[html]advancedinfos.infos"></div>
            <div><label data-i18n="advancedinfos.license"></label> <a href="https://www.gnu.org/licenses/gpl-3.0.txt" target="_blank">GNU GPL-3.0</a></div>
            <div><label data-i18n="advancedinfos.authors"></label> <a href="http://www.eliastiksofts.com" target="_blank">Eliastik</a></div>
            <div><label data-i18n="advancedinfos.libraries"></label> <a href="http://jquery.com/" target="_blank">Jquery</a>, <a href="http://jqueryui.com/" target="_blank">Jquery UI</a>, <a href="http://dimsemenov.com/plugins/magnific-popup/" target="_blank">Magnific Popup</a>, <a href="https://github.com/andris9/jStorage" target="_blank">jStorage</a>, <a href="https://icomoon.io" target="_blank">IcoMoon Free</a>, <a href="https://github.com/josedvq/colpick-jQuery-Color-Picker" target="_blank">colpick Color Picker</a>, <a href="http://www.vincent-rousseau.net/content/mini-paint-html5-avec-canvas" target="_blank">Mini paint HTML5</a>, <a href="http://www.arungudelli.com/html5/matrix-effect-using-html5-and-javascript/" target="_blank">Matrix Effect HTML5+Javascript</a>, <a href="https://github.com/mohammadg/FakeBSOD.com" target="_blank">FakeBSOD</a>, <a href="https://codemirror.net/" target="_blank">CodeMirror</a>, <a href="https://elrumordelaluz.github.io/csshake/" target="_blank">CSSHake</a>, <a href="https://www.php-proxy.com/" target="_blank">PHP-Proxy</a>, <a href="https://fonts.google.com/specimen/Open+Sans" target="_blank">Open Sans</a>, <a href="http://touchpunch.furf.com/" target="_blank">jQuery UI Touch Punch</a>, <a href="https://www.i18next.com/" target="_blank">i18next</a>, <span data-i18n="advancedinfos.more"></span></div>
            <a class="btn-red popup-modal-dismiss" href="#"><span class="icon icon_fermer"></span> <span data-i18n="closewindow"></span></a>
        </div>
        <div id="change-site-popup" class="white-popup mfp-hide">
            <h1 data-i18n="changesite.title"></h1>
            <p><label for="urlChangeSite" data-i18n="changesite.label"></label></p>
            <input type="text" id="urlChangeSite" data-i18n="[placeholder]changesite.placeholder" placeholder="" style="width:100%;" />
            <span id="errorUrlChange" style="display: none; color: red;"></span><br />
            <a id="change_site_ok" class="btn-green" href="#"><span class="icon icon_vrai"></span> <span data-i18n="validate"></span></a>
            <a class="btn-red popup-modal-dismiss" href="#"><span class="icon icon_fermer"></span> <span data-i18n="cancel"></span></a>
        </div>
        <div id="parametres-popup" class="white-popup mfp-hide">
            <h1 data-i18n="settings.title"></h1>
            <form name="parametres">
                    <label class="control control--checkbox"><span data-i18n="settings.showtoolbar"></span> <span class="appName"></span>
                        <input type="checkbox" name="checkboxAffichBarre" id="affichagebarre">
                        <div class="control__indicator"></div>
                    </label>
                    <label class="control control--checkbox"><span data-i18n="settings.transparency"></span>
                        <input type="checkbox" name="checkboxTransBarre" id="transparencebarre">
                        <div class="control__indicator"></div>
                    </label>
                    <label class="control control--checkbox"><span data-i18n="settings.sounds"></span>
                            <input type="checkbox" name="effets_sonores_checkbox" id="effets_sonores">
                            <div class="control__indicator"></div>
                    </label>
                    <p id="indication_error"></p>
                    <label class="control control--checkbox"><span data-i18n="settings.shortcut"></span>
                            <input type="checkbox" id="raccourcis_clavier">
                            <div class="control__indicator"></div>
                    </label>
                    <p><a class="btn open-popup-link" href="#infos-raccourcis" style="font-size:10pt; margin: 0 0;" onclick="javascript:optionsCheck();"><span class="icon icon_recherche"></span> <span data-i18n="settings.shortcutlist"></span></a></p>
                    <label class="control control--checkbox"><span data-i18n="settings.blur"></span>
                            <input type="checkbox" name="flou_effet_checkbox" id="flou_effet">
                        <div class="control__indicator"></div>
                    </label>
                    <p style="font-size: 10pt;" data-i18n="settings.blurinfos"></p>
                    <label class="control control--checkbox"><span data-i18n="settings.enable"></span> <span class="appNameLoader"></span> <span style="font-size: 10.5pt;" data-i18n="settings.recommended"></span>
                            <input type="checkbox" name="hacklol_pl_checkbox" id="hacklol_page_loader_check">
                        <div class="control__indicator"></div>
                    </label>
                        <p style="font-size: 10pt;" data-i18n="[html]settings.hacklolpageloaderinfos"></p>
                    <p>
                    <label for="couleurBarreSelect" data-i18n="settings.toolbarscolor"></label>
                        <select name="couleurBarreSelect" id="couleurBarreSelect">
                            <option value="Defaut" data-i18n="settings.color.default"></option>
                            <option value="Personnalisation" data-i18n="settings.color.personalized"></option>
                            <option value="Bleu" data-i18n="settings.color.blue"></option>
                            <option value="Rouge" data-i18n="settings.color.red"></option>
                            <option value="Vert" data-i18n="settings.color.green"></option>
                            <option value="Jaune" data-i18n="settings.color.yellow"></option>
                            <option value="Orange" data-i18n="settings.color.orange"></option>
                            <option value="Rose" data-i18n="settings.color.pink"></option>
                            <option value="Violet" data-i18n="settings.color.violet"></option>
                            <option value="Brun" data-i18n="settings.color.brown"></option>
                            <option value="Noir" data-i18n="settings.color.black"></option>
                            <option value="Blanc" data-i18n="settings.color.white"></option>
                        </select>
                    </p>
                    <div id="choixcouleur" style="display:none;">
                        <label for="colorpicker1" id="colorpicker-indication" data-i18n="settings.color.choosecolor"></label>
                        <input type="text" id="colorpicker1" maxlength="6" data-i18n="[placeholder]settings.color.choosecolorplaceholder" placeholder="" style="border-color: #000000" />
                    </div>
                    <p>
                    <label for="couleurBarreSelect" data-i18n="settings.language"></label>
                            <select id="languageSelect">
                            </select>
                    </p>
                    <a id="parametre_ok" class="btn-green"><span class="icon icon_vrai"></span> <span data-i18n="ok"></span></a>
                    <a onclick="javascript:optionsCheck();" class="btn-red popup-modal-dismiss" href="#"><span class="icon icon_fermer"></span> <span data-i18n="cancel"></span></a>
                    <a class="btn" id="reset_data"><span class="icon icon_poubelle"></span> <span data-i18n="settings.reset"></span></a>
            </form>
        </div>
        <div id="infos-raccourcis" class="white-popup mfp-hide">
            <h1 data-i18n="shortcut.title"></h1>
            <table style="width:100%;">
                <tr>
                    <td><b data-i18n="shortcut.action"></b></td>
                    <td><b data-i18n="shortcut.shortcut"></b></td>
                </tr>
                <tr>
                    <td data-i18n="shortcut.togglebutton"></td>
                    <td><span class="keyboard_key">G</span> <span class="keyboard_key">M</span></td>
                </tr>
                <tr>
                    <td data-i18n="shortcut.toggletoolbar"></td>
                    <td><span class="keyboard_key">G</span> <span class="keyboard_key">O</span></td>
                </tr>
                <tr>
                    <td data-i18n="shortcut.previous"></td>
                    <td><span class="keyboard_key">G</span> <span class="keyboard_key">B</span></td>
                </tr>
                <tr>
                    <td data-i18n="shortcut.next"></td>
                    <td><span class="keyboard_key">G</span> <span class="keyboard_key">F</span></td>
                </tr>
                <tr>
                    <td data-i18n="shortcut.reload"></td>
                    <td><span class="keyboard_key">G</span> <span class="keyboard_key">R</span></td>
                </tr>
                <tr>
                    <td data-i18n="shortcut.closewindow"></td>
                    <td><span class="keyboard_key">Echap</span></td>
                </tr>
                <tr>
                    <td><span data-i18n="shortcut.quit"></span> <span class="appName"></span></td>
                    <td><span class="keyboard_key">G</span> <span class="keyboard_key">Q</span></td>
                </tr>
            </table>
            <a class="btn-red popup-modal-dismiss" href="#"><span class="icon icon_fermer"></span> <span data-i18n="close"></span></a>
        </div>
        <div id="erreur-script" class="white-popup mfp-hide">
            <h1 data-i18n="error.title">Une erreur est survenue</h1>
            <p data-i18n="[html]error.infos">Une erreur est survenue dans <span class="appName"></span>. Vous pouvez toujours utiliser l'application, mais il se peut qu'elle ne fonctionne pas correctement.</p>
            <p data-i18n="[html]error.help">Vous pouvez aider à résoudre le problème en <a href="https://github.com/Eliastik/hacklol-modifier/issues" target="_blank">postant une issue sur le dépôt Github</a> d'Hacklol Modifier en indiquant ces informations :</p>
            <textarea style="width: 100%;" id="erreurScriptTextarea" rows="10">Rapport d'erreur Javascript automatiquement généré par Hacklol Modifier :</textarea>
            <br /><label class="control control--checkbox"><span data-i18n="error.stop">Ne plus afficher à nouveau ce genre d'erreurs durant cette session</span>
                <input type="checkbox" name="checkboxDisableErrors" id="checkboxDisableErrors">
                <div class="control__indicator"></div>
            </label>
            <a class="btn-red popup-modal-dismiss" href="#" style="margin: 0 0;"><span class="icon icon_fermer"></span> <span data-i18n="close"></span></a>
        </div>
        <div id="wrapper" class="wrapperNormal" style="display:none">
            <canvas id="canvas" width="800" height="500" class="canvasNormal"></canvas>
        </div>
        <div class="bulleMenu" id="bulleCouleur" style="display: none;">
            <ul id="couleurs">
                <li><a href="#" data-couleur="#000000" class="actif" id="color_paint_default" data-i18n="colors.black"></a></li>
                <li><a href="#" data-couleur="#ffffff" data-i18n="colors.white"></a></li>
                <li><a href="#" data-couleur="#ff0000" data-i18n="colors.red"></a></li>
                <li><a href="#" data-couleur="brown" data-i18n="colors.brown"></a></li>
                <li><a href="#" data-couleur="orange" data-i18n="colors.orange"></a></li>
                <li><a href="#" data-couleur="yellow" data-i18n="colors.yellow"></a></li>
                <li><a href="#" data-couleur="green" data-i18n="colors.green"></a></li>
                <li><a href="#" data-couleur="cyan" data-i18n="colors.cyan"></a></li>
                <li><a href="#" data-couleur="blue" data-i18n="colors.blue"></a></li>
                <li><a href="#" data-couleur="indigo" data-i18n="colors.indigo"></a></li>
                <li><a href="#" data-couleur="Violet" data-i18n="colors.violet"></a></li>
                <li><a href="#" data-couleur="pink" data-i18n="colors.pink"></a></li>
                <li><a href="#" id="choixCouleur" style="background-color: #ffffff;" data-i18n="colors.personalized"></a></li>
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
                <li class="lienMenu ripplelink" id="colorPaint"><span class="icon icon_color"></span> <span data-i18n="toolbarpaint.colors"></span></li><!-- @whitespace
-------><li class="lienMenu ripplelink" id="brushPaint"><span class="icon icon_brush"></span> <span data-i18n="toolbarpaint.brush"></span></li><!-- @whitespace
-------><li class="lienMenu ripplelink" id="resetPaint"><span class="icon icon_reset"></span> <span data-i18n="toolbarpaint.reset"></span></li><!-- @whitespace
-------><li class="lienMenu ripplelink" id="savePaint"><span class="icon icon_save"></span> <span data-i18n="toolbarpaint.save"></span></li><!-- @whitespace
-------><li class="lienMenu ripplelink" id="close-dessin-tools"><span class="icon icon_fermer"></span> <span data-i18n="toolbar.close"></span></li>
            </ul>
        </div>
        <div id="mask_opbb" style="display: none;">
            <div class="btn" id="btn-show-toolbar-paint" style="display:none;"><span class="icon icon_menu"></span> <span data-i18n="toolbar.open"></span></div>
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
            <?php
                if(isset($lang)) { ?>
                    $(document).ready(function() {
                       changeLng("<?php echo substr($lang, 0, 2); ?>");
                    });
            <?php } ?>
        </script>
        <script type="text/javascript" src="assets/js/main-min.js"></script>
        <script type="text/javascript" src="assets/js/keyboard-min.js"></script>
        <script type="text/javascript" src="assets/js/paint-min.js"></script>
        <script type="text/javascript" src="assets/js/detectError-min.js"></script>
        <script type="text/javascript" src="assets/js/user-script-min.js"></script>
    </body>
</html>
