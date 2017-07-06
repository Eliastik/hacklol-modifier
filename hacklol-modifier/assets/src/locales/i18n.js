/* Hacklol Modifier 1.4
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
i18next.use(window.i18nextBrowserLanguageDetector).init({
    resources: {
        en: {
            "translation": {
                "close": "Close",
                "validate": "Validate",
                "closewindow": "Close the window",
                "close": "Close",
                "no": "No",
                "yes": "Yes",
                "cancel": "Cancel",
                "ok": "OK",
                "language": {
                    en: "English",
                    fr: "Français"
                },
                "loading": {
                    title: "Loading <span class='appName'>the app</span>…",
                    start: "Start to use <span class='appName'>the app</span> and load in background…",
                },
                "toolbar": {
                    toolbox: "Toolbox",
                    about: "About…",
                    settings: "Settings",
                    quit: "Exit",
                    close: "Close the toolbar",
                    menu: "Menu",
                    open: "Open the toolbar",
                    menuclose: "Close the menu"
                },
                "toolbox": {
                    title: "Toolbox",
                    userscript: "Edit your User Script",
                    infos: "Press the buttons below to use the tools.",
                    edit: "Edit the page",
                    editstop: "Stop to edit the page",
                    hide: "Hide the page",
                    hidestop: "Show the page (hide)",
                    paint: "Draw on the page",
                    paintstop: "Close the drawing interface",
                    explode: "Explode the page",
                    explodestop: "Show the page (explode)",
                    freeze: "Freeze the page",
                    freezestop: "Page frozen (to thaw, click on « Explode the page »)",
                    deface: "Deface the website",
                    matrix: "Matrix",
                    matrixstop: "Stop Matrix",
                    bsod: "BSOD",
                    bsodstop: "Stop BSOD",
                    blur: "Blur the page",
                    blurstop: "De-blur the page",
                    shake: "Shake the page",
                    shakestop: "Stop to shake the page"
                },
                "user-script": {
                    title: "User script",
                    infos: "Here, you can edit a script for <span class='appName'>Hacklol Modifier</span> using JavaScript. It will be executed when starting <span class='appName'>Hacklol Modifier</span>. Some functions have been disabled for security reasons.<br /><strong>Warning, deleting your navigation data like LocalStorage or Cookies will delete your User Script.</strong>",
                    log: "Script log:",
                    save: "Save",
                    reset: "Reset the script",
                    documentation: "Documentation",
                    forbidden: "Some forbidden functions have been detected in your script. The execution of your User Script have been canceled.",
                    success: "Your script was successfully executed !",
                    error: "Error when executing your script.",
                    "error-code": "Error code",
                    saved: "Your script have been successfully saved !",
                    "reset-confirm": "Are you sure that you want to delete your script ?",
                    deleted: "Script deleted !"
                },
                "deface": {
                    title: "Deface the website",
                    infos: "To deface the website, complete the following form:",
                    titleform: "Title:",
                    titleplaceholder: "Enter a title…",
                    textform: "Text:",
                    textplaceholder: "Enter the text who will be displayed…",
                    backgroundcolor: "Bacgkround color:",
                    backgroundcolorplaceholder: "Click here…",
                    reset: "Show the page"
                },
                "eegame": {
                    title: "Easter Eggs hunt game",
                    infos: "<span id='numberEasterEgg'>???</span> Easter Eggs are hidden in this tool. To find them, you must enter a word or a particular phrase in one of the two form fields (&laquo; Title &raquo; or &laquo; Text &raquo;). A small indication: it's all Internet memes. Good luck !",
                    indice: "Another indication",
                    reveal: "Reveal all"
                },
                "egg": {
                    ah: "Ah ! You found an Easter Egg !! Click here to hear again the Ah !",
                    indice: {
                        1: "A well-known cartoon with small ponies.",
                        2: "A sentence coming from the bad English translation of the game Zero Wing of 1989.",
                        3: "Troll.",
                        4: "The famous .. of Denis Brogniart, a french TV presenter (in 2 letters).",
                        5: "The opposite of No.",
                        6: "And his name is .... (4 letters) .... (4 letters)",
                        7: "The opposite of Yes.",
                        8: "The famous ..... of Risitas (in 5 letters)."
                    },
                    found1: "Congratulations, you found an Easter Egg !!",
                    notaudio: "Turn on the sound effects if your browser is compatible and you'll get a surprise…",
                    found: "Congratulations ! You found",
                    foundcheat: "You found",
                    "easter-egg": "Easter Egg",
                    "easter-eggs": "Easter Eggs",
                    remaining: "You still have ",
                    tofind: "to find.",
                    cheated: "by cheating",
                    cheatbad: "It's bad, you know !",
                    foundall: "Congratulations, you found all of the Easter Egg !!",
                    foundallcheat: "You found all of the Easter Egg by cheating. It's bad, you know !",
                    cheatalready: "You have already revealed all the Easter Eggs.",
                    cheatconfirm1: "Are you sure you want to reveal all the Easter Eggs ?",
                    cheatconfirm2: "Are you sure you want to cheat ?",
                    cheatok: "OK, like you want… Click on « Validate » to confirm."
                },
                "bsod-popup": {
                    title: "BSOD",
                    select: "Select the type of BSOD you want to display :",
                    winxp: "Windows XP/Vista/7",
                    win8: "Windows 8/10",
                    infos: "Tip to display the BSOD in fullscreen mode: Close the top toolbar, then make the keyboard shortcut G + M to hide the button <i>Open the toolbar</i>, then put your web browser in fullscreen mode (F11)."
                },
                "quit": {
                    title: "Exit",
                    infos: "Are you sure that you want to exit <span class='appName'></span> ?"
                },
                "about": {
                    title: "About",
                    version: "App version:",
                    date: "Version date:",
                    advancedinfos: "Advanced informations…",
                    sitetitle: "About the chosen website",
                    url: "URL address:",
                    controls: "Controls:",
                    previous: "Previous page",
                    next: "Next page",
                    reload: "Reload the website",
                    change: "Change of website"
                },
                "advancedinfos": {
                    title: "Advanced informations",
                    infos: "<span class='appName'></span> is based on Hacklol Modifier as well as other free software (see below) – <a href='https://github.com/Eliastik/hacklol-modifier/' target='_blank'>Github repository</a> – <a href='http://hacklol.eliastiksofts.com' target='_blank'>Official website</a>",
                    license: "License:",
                    authors: "Author(s):",
                    libraries: "Libraries/credits:",
                    more: "(and maybe others…)"
                },
                "changesite": {
                    title: "Change of website",
                    label: "Enter the address of the website you want to edit:",
                    placeholder: "Enter the website address…",
                    empty: "You didn't enter anything.",
                    errorurl: "This address is invalid."
                },
                "settings": {
                    title: "Settings",
                    showtoolbar: "Show the toolbar on loading of",
                    transparency: "Transparency of the toolbars",
                    sounds: "Enable the sound effects",
                    shortcut: "Enable the keyboard shortcuts",
                    shortcutlist: "See the keyboard shortcuts list",
                    blur: "Enable blur effect when opening a window",
                    blurinfos: "This effect can cause a drop in fluidity on some web browsers.",
                    enable: "Enable",
                    recommended: "(recommended)",
                    hacklolpageloaderinfos: "This option loads the websites on the server of <span class='appName'></span>. Improves the compatibility with websites. <strong>Disable this option if the website is incorrectly displayed</strong>.",
                    toolbarscolor: "Toolbars color:",
                    color: {
                        default: "Default (lightgray)",
                        personalized: "Custom color…",
                        blue: "Blue",
                        red: "Red",
                        green: "Green",
                        yellow: "Yellow",
                        orange: "Orange",
                        pink: "Pink",
                        violet: "Purple",
                        brown: "Brown",
                        black: "Black",
                        white: "White",
                        choosecolor: "Choose a color:",
                        choosecolorplaceholder: "Click here…"
                    },
                    language: "Language:",
                    reset: "Reset the data",
                    saved: "Your settings have been saved.",
                    error: "Your settings have been saved for this session only, because your browser doesn't support the functionality localstorage.",
                    errormp3: "Your browser is incompatible white mp3 files.",
                    erroraudio: "Your browser can't play audio files.",
                    reseted: "All the data have been deleted.",
                    resetconfirm: "Are you sure to delete ALL the data ?"
                },
                "shortcut": {
                    title: "Keyboard shortcut",
                    action: "Action",
                    shortcut: "Shortcut",
                    togglebutton: "Show/hide the buttons « Open the toolbar »",
                    toggletoolbar: "Open/close the top toolbar",
                    previous: "Back to the previous page",
                    next: "Go to the next page",
                    reload: "Reload the website",
                    quit: "Exit",
                    closewindow: "Close the window"
                },
                "error": {
                    title: "An error has occurred",
                    infos: "An error has occurred in <span class='appName'></span>. You can still use the application, but it may not work properly.",
                    help: "You can help to solve the problem by <a href='https://github.com/Eliastik/hacklol-modifier/issues' target='_blank'>posting an issue on the Github repository</a> of Hacklol Modifier by indicating this informations:",
                    stop: "Don't show again this kind of errors during this session"
                },
                "colors": {
                    personalized: "Choose a color…",
                    blue: "Blue",
                    red: "Red",
                    green: "Green",
                    yellow: "Yellow",
                    orange: "Orange",
                    pink: "Pink",
                    violet: "Purple",
                    brown: "Brown",
                    black: "Black",
                    white: "White",
                    cyan: "Cyan",
                    indigo: "Indigo"
                },
                "toolbarpaint": {
                    colors: "Colors",
                    brush: "Brush size",
                    reset: "Reset",
                    save: "Save the drawing"
                },
                "paint": {
                    "not-compatible": "Sorry, this tool isn't compatible with your web browser.\nUpdate it, and try again."
                },
                console: "Hi! It seems that you are familiar with JavaScript console. If you know how to code, you can help to improve Hacklol Modifier on the Github repository: https://github.com/Eliastik/hacklol-modifier/",
                outdatedversion: "It seems that you are not using the latest version of the app.<br /The latest version is:",
                "load": {
                    graphics: "Loading graphics data…",
                    audio: "Loading audio data…"
                },
                "edit": {
                    confirm: "This tool works best when", 
                    confirm2: "is enabled in the settings. You have disabled this option, this tool might not work. Continue ?",
                    error: "An error has occurred during the activation of the tool. Please try again."
                },
                "matrix": {
                    error: "Sorry, this tool isn't compatible with your web browser.\nUpdate it, and try again."
                }
            }
        },
        fr: {
            "translation": {
                "close": "Fermer",
                "validate": "Valider",
                "closewindow": "Fermer la fenêtre",
                "close": "Fermer",
                "no": "Non",
                "yes": "Oui",
                "cancel": "Annuler",
                "ok": "OK",
                "language": {
                    en: "English",
                    fr: "Français"
                },
                "loading": {
                    title: "Chargement de <span class='appName'>l'application</span> en cours…",
                    start: "Commencer à utiliser <span class='appName'>l'application</span> et charger en arrière-plan…",
                },
                "toolbar": {
                    toolbox: "Boîte à outils",
                    about: "À propos…",
                    settings: "Paramètres",
                    quit: "Quitter",
                    close: "Fermer la barre",
                    menu: "Menu",
                    open: "Ouvrir la barre",
                    menuclose: "Fermer le menu"
                },
                "toolbox": {
                    title: "Boite à outils",
                    userscript: "Éditer votre script utilisateur",
                    infos: "Appuyez sur les boutons ci-dessous pour utiliser les outils.",
                    edit: "Modifier la page",
                    editstop: "Arrêter de modifier la page",
                    hide: "Faire disparaître la page",
                    hidestop: "Faire ré-apparaître la page (disparition)",
                    paint: "Dessiner sur la page",
                    paintstop: "Fermer l'interface de dessin",
                    explode: "Faire exploser la page",
                    explodestop: "Faire ré-apparaître la page (explosion)",
                    freeze: "Geler la page",
                    freezestop: "Page gelée (pour la dégeler, cliquez sur « Faire exploser la page »)",
                    deface: "Défacer le site",
                    matrix: "Matrix",
                    matrixstop: "Arrêter Matrix",
                    bsod: "BSOD",
                    bsodstop: "Arrêter BSOD",
                    blur: "Flouter la page",
                    blurstop: "Dé-flouter la page",
                    shake: "Secouer la page",
                    shakestop: "Arrêter de secouer la page"
                },
                "user-script": {
                    title: "Script utilisateur",
                    infos: "Ici, vous pouvez éditer un script utilisateur pour <span class='appName'></span> grâce au langage de programmation JavaScript. Il sera exécuté à chaque démarrage de <span class='appName'></span> et lors de la sauvegarde de celui-ci. Une documentation est disponible en ligne pour vous permettre d'utiliser les fonctionnalités de <span class='appName'></span> dans vos scripts. Veuillez noter que certaines fonctions sont désactivées pour des raisons de sécurité.<br /><strong>Attention, supprimer vos données de navigation telle que le LocalStorage ou vos cookies aura pour effet de supprimer definitivement votre User Script. Je vous conseille de faire une sauvegarde de celui-ci pour éviter cela.</strong>",
                    log: "Journal du script :",
                    save: "Enregistrer",
                    reset: "Réinitialiser le script",
                    documentation: "Documentation",
                    forbidden: "Des fonctions dont l'utilisation est bloquée ont été détectées. L'exécution de votre script a été annulée.",
                    success: "Votre script a été exécuté avec succès !",
                    error: "Erreur lors de l'exécution de votre script.",
                    "error-code": "Code d'erreur",
                    saved: "Votre script a été sauvegardé avec succès !",
                    "reset-confirm": "Êtes-vous sûr de vouloir supprimer votre script ?",
                    deleted: "Script supprimé !"
                },
                "deface": {
                    title: "Défacer le site",
                    infos: "Pour défacer ce site, veuillez remplir le formulaire suivant :",
                    titleform: "Titre :",
                    titleplaceholder: "Entrez le titre…",
                    textform: "Texte :",
                    textplaceholder: "Entrez le texte qui sera affiché…",
                    backgroundcolor: "Couleur d'arrière plan :",
                    backgroundcolorplaceholder: "Cliquez ici",
                    reset: "Faire ré-apparaître le site"
                },
                "eegame": {
                    title: "Jeu de la chasse aux Easter Eggs",
                    infos: "<span id='numberEasterEgg'>???</span> Easter Eggs (œufs de Pâques) sont cachés dans cet outil. Pour les trouver, vous devez entrer un mot ou une phrase particulière dans l'un des deux champs de formulaire (&laquo; Titre &raquo; ou &laquo; Texte &raquo;). Un petit indice : il s'agit tous de mèmes (phénomènes) Internet. Bonne chance !",
                    indice: "Un autre indice",
                    reveal: "Tous les révéler"
                },
                "egg": {
                    ah: "Ah ! Vous avez trouvé un Easter Egg !! Cliquez pour entendre à nouveau le Ah !",
                    indice: {
                        1: "Un dessin animé très connu avec des petits poneys.",
                        2: "Une phrase venant de la mauvaise traduction anglaise du jeu Zero Wing de 1989.",
                        3: "Une tête de troll.",
                        4: "Le célèbre .. de Denis Brogniart (en 2 lettres).",
                        5: "Le contraire de Non.",
                        6: "And his name is .... (4 lettres) .... (4 lettres)",
                        7: "Le contraire de Oui.",
                        8: "Le célèbre ..... de Risitas (en 5 lettres)."
                    },
                    found1: "Bravo, vous avez trouvé un Easter Egg !!",
                    notaudio: "Activez les effets sonores si votre navigateur est compatible et vous aurez une surprise…",
                    found: "Bravo ! Vous avez trouvé",
                    foundcheat: "Vous avez trouvé",
                    "easter-egg": "Easter Egg",
                    "easter-eggs": "Easter Eggs",
                    remaining: "Il vous en reste ",
                    tofind: "à trouver.",
                    cheated: "en trichant",
                    cheatbad: "C'est mal, m'voyez !",
                    foundall: "Bravo ! Vous avez trouvé tous les Easter Eggs.",
                    foundallcheat: "Vous avez trouvé tous les Easter Eggs en trichant. C'est mal, m'voyez !",
                    cheatalready: "Vous avez déjà révélé tous les Easter Eggs.",
                    cheatconfirm1: "Êtes-vous sûr de vouloir révéler tous les Easter Eggs ?",
                    cheatconfirm2: "Êtes-vous vraiment sûr de vouloir tricher ?",
                    cheatok: "OK, comme vous voulez… Cliquez sur « Valider » pour confirmer."
                },
                "bsod-popup": {
                    title: "BSOD",
                    select: "Sélectionnez le type de BSOD que vous voulez afficher :",
                    winxp: "Windows XP/Vista/7",
                    win8: "Windows 8/10",
                    infos: "Astuce pour afficher le BSOD en plein écran : Fermez la barre du haut, puis faites le raccourci clavier G + M pour masquer le bouton d'ouverture de la barre, puis mettez votre navigateur web en plein écran (touche F11)."
                },
                "quit": {
                    title: "Quitter",
                    infos: "Êtes-vous sûr de vouloir quitter <span class='appName'></span> et de retourner à la page d'accueil du site ?"
                },
                "about": {
                    title: "À propos de",
                    version: "Version de l'application :",
                    date: "Date de version :",
                    advancedinfos: "Informations avancées…",
                    sitetitle: "À propos du site choisi",
                    url: "Adresse URL :",
                    controls: "Contrôles :",
                    previous: "Page précédente",
                    next: "Page suivante",
                    reload: "Recharger le site",
                    change: "Changer de site"
                },
                "advancedinfos": {
                    title: "Informations avancées",
                    infos: "<span class='appName'></span> est basé sur Hacklol Modifier ainsi que sur d'autres logiciels libres (voir plus bas) – <a href='https://github.com/Eliastik/hacklol-modifier/' target='_blank'>Dépôt Github</a> – <a href='http://hacklol.eliastiksofts.com' target='_blank'>Site web officiel</a>",
                    license: "Licence :",
                    authors: "Auteur(s) :",
                    libraries: "Librairies/crédits :",
                    more: "(et peut-être d'autres…)"
                },
                "changesite": {
                    title: "Changer de site",
                    label: "Entrez l'adresse du site que vous voulez modifier :",
                    placeholder: "Entrez l'adresse du site…",
                    empty: "Vous n'avez rien entré.",
                    errorurl: "Adresse invalide."
                },
                "settings": {
                    title: "Paramètres",
                    showtoolbar: "Affichage de la barre d'outils au démarrage de",
                    transparency: "Transparence des barres d'outils",
                    sounds: "Activer les effets sonores",
                    shortcut: "Activer les raccourcis clavier",
                    shortcutlist: "Voir la liste des raccourcis clavier",
                    blur: "Activer l'effet de flou à l'ouverture d'une fenêtre",
                    blurinfos: "Cet effet peut générer une baisse de fluidité sur certains navigateurs web.",
                    enable: "Activer",
                    recommended: "(recommandé)",
                    hacklolpageloaderinfos: "Permet aux sites web d'être chargés depuis le serveur de <span class='appName'></span>. Améliore la compatibilité des sites. <strong>Désactivez cette option si le site s'affiche mal</strong>.",
                    toolbarscolor: "Couleur des barres d'outils :",
                    color: {
                        default: "Par défaut (gris clair)",
                        personalized: "Couleur personnalisée…",
                        blue: "Bleu",
                        red: "Rouge",
                        green: "Vert",
                        yellow: "Jaune",
                        orange: "Orange",
                        pink: "Rose",
                        violet: "Violet",
                        brown: "Brun",
                        black: "Noir",
                        white: "Blanc",
                        choosecolor: "Veuillez choisir une couleur :",
                        choosecolorplaceholder: "Cliquez ici"
                    },
                    language: "Langue :",
                    reset: "Réinitialiser les données",
                    saved: "Vos paramètres ont été enregistrés.",
                    error: "Vos paramètres ont été enregistrés pour cette session seulement, car votre navigateur n'est pas compatible avec la fonctionnalité de stockage de données locales.",
                    errormp3: "Votre navigateur est incompatible avec les fichiers audio .mp3.",
                    erroraudio: "Votre navigateur est incompatible avec la lecture de fichiers audio.",
                    reseted: "Toutes les données ont été supprimées.",
                    resetconfirm: "Êtes-vous sûr de vouloir supprimer TOUTES les données enregistrées ?"
                },
                "shortcut": {
                    title: "Raccourcis clavier",
                    action: "Action à effectuer",
                    shortcut: "Raccourci clavier",
                    togglebutton: "Faire disparaître/ré-apparaître les boutons « Ouvrir la barre »",
                    toggletoolbar: "Fermer/Ouvrir la barre d'outils du haut",
                    previous: "Aller à la page précédente",
                    next: "Aller à la page suivante",
                    reload: "Recharger le site",
                    quit: "Quitter",
                    closewindow: "Fermer une fenêtre"
                },
                "error": {
                    title: "Une erreur est survenue",
                    infos: "Une erreur est survenue dans <span class='appName'></span>. Vous pouvez toujours utiliser l'application, mais il se peut qu'elle ne fonctionne pas correctement.",
                    help: "Vous pouvez aider à résoudre le problème en <a href='https://github.com/Eliastik/hacklol-modifier/issues' target='_blank'>postant une issue sur le dépôt Github</a> d'Hacklol Modifier en indiquant ces informations :",
                    stop: "Ne plus afficher à nouveau ce genre d'erreurs durant cette session"
                },
                "colors": {
                    personalized: "Choisir une couleur…",
                    blue: "Bleu",
                    red: "Rouge",
                    green: "Vert",
                    yellow: "Jaune",
                    orange: "Orange",
                    pink: "Rose",
                    violet: "Violet",
                    brown: "Marron",
                    black: "Noir",
                    white: "Blanc",
                    cyan: "Cyan",
                    indigo: "Indigo"
                },
                "toolbarpaint": {
                    colors: "Couleurs",
                    brush: "Taille du pinceau",
                    reset: "Réinitialiser",
                    save: "Sauvegarder le dessin"
                },
                "paint": {
                    "not-compatible": "Désolé, cet outil n'est pas compatible avec votre navigateur.\nMettez à jour votre navigateur, puis réessayez."
                },
                console: "Salut ! Il semblerait que vous soyez familier avec la console Javascript.\nSi vous savez coder, vous pouvez aider à améliorer Hacklol Modifier sur le dépôt Github : https://github.com/Eliastik/hacklol-modifier/",
                outdatedversion: "Il semblerait que vous n'utilisez pas la dernière version de <span class='appName'>l'application</span>.<br />La version actuelle est la :",
                "load": {
                    graphics: "Chargement des données graphiques…",
                    audio: "Chargement des données audio…"
                },
                "edit": {
                    confirm: "Cet outil fonctionne mieux lorsque", 
                    confirm2: "est activé dans les paramètres. Vous avez désactivé cette option, cet outil risque de ne pas fonctionner. Continuer ?",
                    error: "Une erreur est survenue lors de l'activation de l'outil. Veuillez réessayer."
                },
                "matrix": {
                    error: "Désolé, cet outil n'est pas compatible avec votre navigateur.\nMettez à jour votre navigateur, puis réessayez."
                }
            }
        }
    },
    fallbackLng: ['en', 'fr'],
    load: 'languageOnly',
    "detection": {
        order: ['querystring', 'localStorage', 'navigator', 'htmlTag'],
        lookupQuerystring: 'lng',
        lookupLocalStorage: 'i18nextLng',
        caches: ['localStorage']
    },
}, function(err, t) {
    $(document).ready(function(){
        translateContent();
    });
});
function listTranslations(languages) {
    $("#languageSelect").text("");
    $.each(languages, function(index, value) {
        $("#languageSelect").append('<option data-i18n="language.'+ value +'" value="'+ value +'"></option>');
    });
    $("#languageSelect").val(i18next.language.substr(0, 2));
}
function translateContent() {
    jqueryI18next.init(i18next, $, {
      handleName: 'localize',
      selectorAttr: 'data-i18n'
    });
    listTranslations(i18next.languages);
    $("body").localize();
    $(".appName").text(hacklol.appName);
    $(".appNameLoader").text(hacklol.hacklolPageLoaderName);
}
function changeLng(lng) {
    i18next.changeLanguage(lng);
}
i18next.on('languageChanged', () => {
    translateContent();
});
