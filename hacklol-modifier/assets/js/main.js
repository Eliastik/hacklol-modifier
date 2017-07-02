/* Main.js Hacklol Modifier v. 1.4 - by Eliastik */
page_gelee = 0; // variable permettant de savoir si la page est gelée
menuLienLib = 1; // variable utilisée pour le libelé du menu
pageChargeeHPL = 0; // variable pour Hacklol Page Loader
pageChargeeFirst = 1; // variable utilisée pour savoir si c'est la première fois qu'une page d'arrière-plan est chargée
errorDisabled = false; // variable utilisée pour savoir si l'utilisateur a désactivé l'affichage des erreurs
paintEnabled = false; // variable utilisée pour savoir si l'outil "Dessiner sur la page" est activé
countEasterEgg = 0;
var easterEggFound_global = new Array();
var cheatEasterEgg = false;
errorLoadingImages = false;
errorLoadingAudio = false;
loadInBackground = false;
loadedAudioAlreadyCounted = false;
// Corrige le bug du .trim sur les anciens navigateurs - https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String/trim
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}
// on crée un nouvel objet hacklol, qui va contenir tous les outils/fonctions essentielles
var hacklol = {
    appName: "Hacklol Modifier",
    description: "Hacklol est une application utilisable directement sur votre navigateur web qui vous permet de modifier des sites web.",
    version: "1.4_alpha_dev", // la version d'Hacklol
    dateVersion: "27/06/2017", // date
    lang: "fr", // indiquer ici la langue des messages envoyés par le script (fr = Français ; en = Anglais)
    asciiArt: " _____         _   _     _ \n|  |  |___ ___| |_| |___| |\n|     | .'|  _| '_| | . | |\n|__|__|__,|___|_,_|_|___|_|",
    tools: 10, // nb d'outils, utilisé pour les fonctions
    settings: "settings Method",
    ui: "User Interface Method",
    urlPage: urlPage_global,
    console: function() {
        if (hacklol.lang == "en" && typeof(window.console) !== 'undefined') {
            console.log(hacklol.asciiArt + "\nHi! It seems that you are familiar with JavaScript console. If you know how to code, you can help to improve Hacklol on the Github repository : https://github.com/Eliastik/hacklol-modifier/");
        } else if (typeof(window.console) !== 'undefined') {
            console.log(hacklol.asciiArt + "\nSalut ! Il semblerait que vous soyez familier avec la console Javascript.\nSi vous savez coder, vous pouvez aider à améliorer Hacklol sur le dépôt Github : https://github.com/Eliastik/hacklol-modifier/");
        }
    },
    rgb2hex: function(rgb) {
        if (/^#[0-9A-F]{6}$/i.test(rgb)) return rgb;
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

        function hex(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }
        return hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    },
    getContrastYIQ: function(hexcolor) {
        var r = parseInt(hexcolor.substr(0, 2), 16);
        var g = parseInt(hexcolor.substr(2, 2), 16);
        var b = parseInt(hexcolor.substr(4, 2), 16);
        var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? 'black' : 'white';
    },
    checkVersion: function() {
        var versionActuelle = hacklol.version;
        $("#testVersionHacklol").text("");
        $.post(
                'versionHacklol.html',
                { },
                function(data) {
                    if(data.trim() != versionActuelle.trim() && hacklol.lang == "en") {
                        $("#testVersionHacklol").html("<span class=\"icon icon_infos\"></span> It seem that you don't use the last version of Hacklol Modifier.<br />The current version is : "+ data.trim() +".");
                    }
                    else if(data.trim() != versionActuelle.trim()) {
                        $("#testVersionHacklol").html("<span class=\"icon icon_infos\"></span> Il semblerait que vous n'utilisez pas la dernière version d'Hacklol Modifier.<br />La version actuelle est la : "+ data.trim() +".");
                    }
                },
                'text'
        );
    },
    random: function(min, max) {
        return min+Math.floor(Math.random()*(max-min+1)); // http://sciences-du-numerique.fr/programmation-en-javascript/tirer-un-nombre-au-hasard/5
    },
    // cleanArray removes all duplicated elements - https://www.unicoda.com/?p=579
    cleanArray: function(array) {
        var i, j, len = array.length, out = [], obj = {};
        for (i = 0; i < len; i++) {
            obj[array[i]] = 0;
        }
        for (j in obj) {
            out.push(j);
        }
        return out;
    },
    sleep: function(ms) {
        var currentTime = new Date().getTime();

        while (currentTime + ms >= new Date().getTime()) {
        }
    },
    // https://stackoverflow.com/a/8317014
    validateUrl: function(url) {
        return /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(url);
    },
    loadPage: function(url, withHacklolPL) {
        if(withHacklolPL == false) {
            $("#hacklol-iframeWrapper").html("");
            $("#hacklol-iframeWrapper").html('<iframe src="" id="hacklol-iframe" frameBorder="0"></iframe>');
            $("#hacklol-iframe").attr("src", "hacklol-iframe.php?q=" + encodeURIComponent(url));
            return true;
        } else {
            // Dans ce cas, utilisation d'Hacklol Page Loader
            var hacklolPageLoaderBaseURL = "page_loader/index.php?urlPage=" + encodeURIComponent(url);
            $("#hacklol-iframeWrapper").html("");
            $("#hacklol-iframeWrapper").html('<iframe src="" id="hacklol-iframe" frameBorder="0"></iframe>');
            $("#hacklol-iframe").attr("src", "hacklol-iframe.php?q=" + hacklolPageLoaderBaseURL);
            return true;
        }
        return false;
    },
    reloadPage: function() {
        var parametre_hacklol_pl = $.jStorage.get('hacklol_page_loader');
        hacklol.tools.edit("stop");
        if (parametre_hacklol_pl == "Non") {
            hacklol.loadPage(hacklol.urlPage, false);
        }
        else {
            hacklol.loadPage(hacklol.urlPage, true);
        }
        return true;
    },
    creerOutil: function(titre, fonction, fermerFenetre, idButton, style_css) {
        var elTool = document.createElement("a");
        if(fonction !== null) {
            elTool.setAttribute("onclick", fonction);
        }
        elTool.setAttribute("class", "btn");
        if(fermerFenetre == true) {
            elTool.setAttribute("class", elTool.getAttribute("class") + " popup-modal-dismiss");
        }
        if(idButton !== null) {
            elTool.setAttribute("id", idButton);
        }
        if(style_css !== null) {
            elTool.setAttribute("style", style_css);
        }
        elTool.innerHTML = titre;
        document.getElementById("toolbox-popup").appendChild(elTool);
        hacklol.tools++;
        return true;
    },
    blinkFontBSOD: function() {
        document.getElementById("blink").style.color="#00A";
        setTimeout("hacklol.setblinkFontBSOD()",800);
    },
    setblinkFontBSOD: function() {
        document.getElementById("blink").style.color="";
        setTimeout("hacklol.blinkFontBSOD()",800);
    },
    shake: function(time) {
        $("body").addClass("shake").addClass("shake-constant");
        setTimeout(function(){ $("body").removeClass("shake").removeClass("shake-constant"); }, time);
        return true;
    },
    loadImages: function() {
        var loadedImagesCount = 0;
        var imageNames = ['assets/img/select-arrow.png','assets/img/explosion.gif','assets/img/explosion2.gif','assets/img/gel.png','assets/img/points.png','assets/img/sadface.png', 'assets/img/mlp_egg.png', 'assets/img/aybabtu.png', 'assets/img/trollface.png', 'assets/img/check.png', 'assets/img/ouais.png', 'assets/img/ah.gif', 'assets/img/non.gif', 'assets/img/isname.jpg', 'assets/img/issou.jpg'];
        var imagesArray = [];
        for (var i = 0; i < imageNames.length; i++) {
            var image = new Image();
            image.src = imageNames[i];
            image.onload = function() {
                loadedImagesCount++;
                var pourcentageLoading = Math.round((100*loadedImagesCount)/imageNames.length);
                $("#progressLoading").css("width", pourcentageLoading + "%");
                if(hacklol.lang == "en") {
                    $("#loadingInfos").text("Loading graphic data…");
                    $("#backgroundLoadingInfos").text("Loading graphic data…");
                    $("#pourcentageLoadingInfos").text(pourcentageLoading + "%");
                    $("#backgroundPourcentageLoadingInfos").text(pourcentageLoading + "%");
                } else {
                    $("#loadingInfos").text("Chargement des données graphiques…");
                    $("#backgroundLoadingInfos").text("Chargement des données graphiques…");
                    $("#pourcentageLoadingInfos").text(pourcentageLoading + "%");
                    $("#backgroundPourcentageLoadingInfos").text(pourcentageLoading + "%");
                }
                if (loadedImagesCount >= imageNames.length) {
                    hacklol.loadAudio();
                }
            };
            image.onerror = function() {
                errorLoadingImages = true;
                loadedImagesCount++;
                $("#loadingInfos").css("color", "red");
                var pourcentageLoading = Math.round((100*loadedImagesCount)/imageNames.length);
                $("#progressLoading").css("width", pourcentageLoading + "%");
                if(hacklol.lang == "en") {
                    $("#loadingInfos").text("Loading graphic data…");
                    $("#backgroundLoadingInfos").text("Loading graphic data…");
                    $("#pourcentageLoadingInfos").text(pourcentageLoading + "%");
                    $("#backgroundPourcentageLoadingInfos").text(pourcentageLoading + "%");
                } else {
                    $("#loadingInfos").text("Chargement des données graphiques…");
                    $("#backgroundLoadingInfos").text("Chargement des données graphiques…");
                    $("#pourcentageLoadingInfos").text(pourcentageLoading + "%");
                    $("#backgroundPourcentageLoadingInfos").text(pourcentageLoading + "%");
                }
                if (loadedImagesCount >= imageNames.length) {
                    hacklol.loadAudio();
                }
            };
            imagesArray.push(image);
        }
        return true;
    },
    loadAudio: function() {
        $("#loadingInfos").css("color", "");
        $("#backgroundLoadingInfos").css("color", "");
        $("#progressLoading").css("width", "0%");
        if (window.HTMLAudioElement) {
            var audioTestMp3 = document.createElement('audio');
            if (audioTestMp3.canPlayType && audioTestMp3.canPlayType("audio/mpeg")) {
                if(hacklol.lang == "en") {
                    $("#loadingInfos").text("Loading audio data…");
                    $("#backgroundLoadingInfos").text("Loading audio data…");
                    $("#pourcentageLoadingInfos").text("0%");
                    $("#backgroundPourcentageLoadingInfos").text("0%");
                } else {
                    $("#loadingInfos").text("Chargement des données audio…");
                    $("#backgroundLoadingInfos").text("Chargement des données audio…");
                    $("#pourcentageLoadingInfos").text("0%");
                    $("#backgroundPourcentageLoadingInfos").text("0%");
                }
                var loadedAudioCount = 0;
                var errorLoadingAudio = false;
                var pourcentageLoadingAudio = 0;
                var audioFiles = ["effet_explosion.mp3","effet_explosion_bis.mp3","effet_explosion_2.mp3","gel.mp3","mlp.mp3","aybabtu.mp3","wt_egg.mp3","trololo.mp3","ah.mp3","ouais.mp3","non.mp3","isname.mp3","issou.mp3"];
                var audioFilesLoaded = [];
                var errorLoadingAudioFunction = function() {
                    if($.inArray(this.src, audioFilesLoaded) == -1) {
                        loadedAudioCount++;
                        clearTimeout(timeOutLoading);
                        var timeOutLoading = setTimeout(function() {
                            if(loadInBackground !== true) {
                                hacklol.completeLoading();
                                $("#background-loading-indicator").fadeIn();
                                loadInBackground = true;
                            }
                            clearTimeout(timeOutLoading);
                        }, 5000);
                        var errorLoadingAudio = true;
                        var pourcentageLoadingAudio = Math.round((100*loadedAudioCount)/audioFiles.length);
                        $("#progressLoading").css("width", pourcentageLoadingAudio + "%");
                        if(hacklol.lang == "en") {
                            $("#loadingInfos").text("Loading audio data…");
                            $("#backgroundLoadingInfos").text("Loading audio data…");
                            $("#pourcentageLoadingInfos").text(pourcentageLoadingAudio + "%");
                            $("#backgroundPourcentageLoadingInfos").text(pourcentageLoadingAudio + "%");
                        } else {
                            $("#loadingInfos").text("Chargement des données audio…");
                            $("#backgroundLoadingInfos").text("Chargement des données audio…");
                            $("#pourcentageLoadingInfos").text(pourcentageLoadingAudio + "%");
                            $("#backgroundPourcentageLoadingInfos").text(pourcentageLoadingAudio + "%");
                        }
                        if (loadedAudioCount >= audioFiles.length) {
                            clearTimeout(timeOutLoading);
                            hacklol.completeLoading();
                            $("#wrapper-background-loading-indicator").fadeOut();
                        }
                        audioFilesLoaded.push(this.src);
                    }
                };
                var timeOutLoading = setTimeout(function() {
                    if(loadInBackground !== true) {
                        hacklol.completeLoading();
                        $("#background-loading-indicator").fadeIn();
                        loadInBackground = true;
                    }
                    clearTimeout(timeOutLoading);
                }, 5000);
                for (var i in audioFiles) {
                    (function() {
                        var audioPreload = new Audio();
                        audioPreload.src = "assets/sounds/"+ audioFiles[i];
                        audioPreload.preload = "auto";
                        audioPreload.oncanplaythrough = function() {
                            if($.inArray(this.src, audioFilesLoaded) == -1) {
                                loadedAudioCount++;
                                clearTimeout(timeOutLoading);
                                var timeOutLoading = setTimeout(function() {
                                    if(loadInBackground !== true) {
                                        hacklol.completeLoading();
                                        $("#background-loading-indicator").fadeIn();
                                        loadInBackground = true;
                                    }
                                    clearTimeout(timeOutLoading);
                                }, 5000);
                                var pourcentageLoadingAudio = Math.round((100*loadedAudioCount)/audioFiles.length);
                                $("#progressLoading").css("width", pourcentageLoadingAudio + "%");
                                if(hacklol.lang == "en") {
                                    $("#loadingInfos").text("Loading audio data…");
                                    $("#backgroundLoadingInfos").text("Loading audio data…");
                                    $("#pourcentageLoadingInfos").text(pourcentageLoadingAudio + "%");
                                    $("#backgroundPourcentageLoadingInfos").text(pourcentageLoadingAudio + "%");
                                } else {
                                    $("#loadingInfos").text("Chargement des données audio…");
                                    $("#backgroundLoadingInfos").text("Chargement des données audio…");
                                    $("#pourcentageLoadingInfos").text(pourcentageLoadingAudio + "%");
                                    $("#backgroundPourcentageLoadingInfos").text(pourcentageLoadingAudio + "%");
                                }
                                if (loadedAudioCount >= audioFiles.length) {
                                    clearTimeout(timeOutLoading);
                                    hacklol.completeLoading();
                                    $("#wrapper-background-loading-indicator").fadeOut();
                                }
                                audioFilesLoaded.push(this.src);
                            }
                        };
                        audioPreload.onerror = errorLoadingAudioFunction;
                        audioPreload.onsuspend = errorLoadingAudioFunction;
                        audioPreload.onabort = errorLoadingAudioFunction;
                    }());
                }
            } else {
                hacklol.completeLoading();
            }
        } else {
            hacklol.completeLoading();
        }
    },
    completeLoading: function() {
        if(loadInBackground !== true) {
            // EXECUTION PARAMETRES
            hacklol.settings.exe();
            // FERMETURE INFO CHARGEMENT
            $("#chargement").fadeOut("slow");
            $("#mask_chargement").fadeOut("slow");
            // BSOD BlinkFont
            hacklol.blinkFontBSOD();
        }
        $("#background-loading-indicator").fadeOut();
    }
};
hacklol.console();
hacklol.checkVersion();
// OUTILS
hacklol.tools = {
    // Modifier le site
    edit: function(type) {
        var parametre_hacklol_pl = $.jStorage.get('hacklol_page_loader');
        if (type == "edit") {
            if(parametre_hacklol_pl == "Non" && hacklol.lang == "en" && confirm("This tool works best when Hacklol Page Loader is enabled in the settings. You have disabled Hacklol Page Loader, this tool might not work. Continue ?")) {
                try {
                    document.body.contentEditable = true;
                    $("#arret_modif_page").show();
                    $("#modif_page").hide();
                    hacklol.ui.closeToolbar();
                    hacklol.tools.paint("stop");
                } catch(e) { alert("An error has occurred during the activation of the tool. Please try again."); }
            } else if(parametre_hacklol_pl == "Non" && hacklol.lang == "fr" && confirm("Cet outil fonctionne mieux lorsque Hacklol Page Loader est activé dans les paramètres. Vous avez désactivé Hacklol Page Loader, cet outil risque de ne pas fonctionner. Continuer ?")) {
                try {
                    document.body.contentEditable = true;
                    $("#arret_modif_page").show();
                    $("#modif_page").hide();
                    hacklol.ui.closeToolbar();
                    hacklol.tools.paint("stop");
                } catch(e) { alert("Une erreur est survenue lors de l'activation de l'outil. Veuillez réessayer."); }
            } else if(parametre_hacklol_pl != "Non" && hacklol.lang == "en") {
                try {
                    document.getElementById("hacklol-iframe").contentEditable = true;
                    document.getElementById('hacklol-iframe').contentWindow.document.body.contentEditable = true;
                    document.getElementById('hacklol-iframe').contentWindow.document.getElementById('hacklol-iframe-protected').contentEditable = true;
                    document.getElementById('hacklol-iframe').contentWindow.document.getElementById('hacklol-iframe-protected').contentWindow.document.body.contentEditable = true;
                    $("#arret_modif_page").show();
                    $("#modif_page").hide();
                    hacklol.ui.closeToolbar();
                    hacklol.tools.paint("stop");
                } catch(e) { alert("An error has occurred during the activation of the tool. Please try again."); }
            } else if(parametre_hacklol_pl != "Non") {
                try {
                    document.getElementById("hacklol-iframe").contentEditable = true;
                    document.getElementById('hacklol-iframe').contentWindow.document.body.contentEditable = true;
                    document.getElementById('hacklol-iframe').contentWindow.document.getElementById('hacklol-iframe-protected').contentEditable = true;
                    document.getElementById('hacklol-iframe').contentWindow.document.getElementById('hacklol-iframe-protected').contentWindow.document.body.contentEditable = true;
                    $("#arret_modif_page").show();
                    $("#modif_page").hide();
                    hacklol.ui.closeToolbar();
                    hacklol.tools.paint("stop");
                } catch(e) { alert("Une erreur est survenue lors de l'activation de l'outil. Veuillez réessayer."); }
            }
        } else if (type == "stop") {
            if(parametre_hacklol_pl == "Non") {
                try {
                    document.body.contentEditable = false;
                    $("#arret_modif_page").hide();
                    $("#modif_page").show();
                } catch(e) { }
            }
            else {
                try {
                    document.getElementById("hacklol-iframe").contentEditable = false;
                    document.getElementById('hacklol-iframe').contentWindow.document.body.contentEditable = false;
                    document.getElementById('hacklol-iframe').contentWindow.document.getElementById('hacklol-iframe-protected').contentEditable = false;
                    document.getElementById('hacklol-iframe').contentWindow.document.getElementById('hacklol-iframe-protected').contentWindow.document.body.contentEditable = false;
                    $("#arret_modif_page").hide();
                    $("#modif_page").show();
                } catch(e) { }
            }
        }
    },
    // Faire disparaître la page
    hidePage: function(type) {
        if (type == "hide") {
            $("#hacklol-iframeWrapper").fadeOut("slow", "linear");
            $("#disparition_page").hide();
            $("#re_apparition_page").show();
            $("#click-explosion-stop").show();
            $("#click-explosion").hide();
            // $("#explosion_page").hide();
            // $("#explosion_page_reapparition").show();
        } else if (type == "show") {
            $("#hacklol-iframeWrapper").fadeIn("slow", "linear");
            $("#disparition_page").show();
            $("#re_apparition_page").hide();
            $("#click-explosion-stop").hide();
            $("#click-explosion").show();
            // $("#explosion_page").show();
            // $("#explosion_page_reapparition").hide();
        }
    },
    // Dessiner sur la page
    paint: function(type) {
        if (type == "paint") {
            hacklol.ui.closeToolbar();
            $("#paint-tools").slideDown("slow");
            $("#wrapper").show();
            $("#click-paint").hide();
            $("#click-paint-stop").show();
            paintEnabled = true;
        } else if (type == "stop") {
            $("#paint-tools").hide();
            $("#wrapper").hide();
            $("#click-paint").show();
            $("#click-paint-stop").hide();
            $("#mask_opbb").hide();
            $("#btn-show-toolbar-paint").hide();
            $("#bulleCouleur").hide();
            $("#bulleBrush").hide();
            paintEnabled = false;
        }
    },
    // Faire exploser le site
    explode: function(type) {
        if (type == "explode") {
            if ($.jStorage.get('effets_sonores') != "Non") {
                var nombre_aleatoire = hacklol.random(1, 50);
                if(nombre_aleatoire >= 5 && nombre_aleatoire <= 15 && typeof(audio_wt) != 'undefined') {
                    audio_wt.play();
                }
            }
            hacklol.ui.closeToolbar();
            hacklol.ui.paint.closeToolbar();
            var explodeEffect = hacklol.random(1, 2);
            var explodeSoundEffect = hacklol.random(1, 2);
            $("#explosion_img_effet").attr("src", "");
            $("#explosion_img_effet").removeAttr("src", "");
            $("#explosion_img_effet").removeClass("vertical-align-bottom");
            if (page_gelee == 0 && explodeEffect == 1) {
                if ($.jStorage.get('effets_sonores') != "Non" && typeof(audio) != 'undefined' && explodeSoundEffect == 1) {
                    audio.play();
                } else if ($.jStorage.get('effets_sonores') != "Non" && typeof(audio_explosion_bis) != 'undefined' && explodeSoundEffect == 2) {
                    audio_explosion_bis.play();
                }
                $("#explosion_img").fadeIn();
                $("#mask_explosion").fadeIn();
                hacklol.shake(3000);
                $("#hacklol-iframeWrapper").fadeOut(2000);
                $("#explosion_img").fadeOut(3000, function() {
                    $("#explosion_img_effet").removeAttr("src", "");
                });
                $("#explosion_img_effet").show().each(function() {
                    this.offsetHeight;
                }).prop("src", "assets/img/explosion.gif");
                $("#mask_explosion").fadeOut(3000);
                $("#click-explosion-stop").show();
                $("#click-explosion").hide();
                $("#disparition_page").hide();
                $("#re_apparition_page").show();
            } else if (page_gelee == 1 && explodeEffect == 1) {
                page_gelee = 0;
                if ($.jStorage.get('effets_sonores') != "Non" && typeof(audio_gel) != 'undefined') {
                    audio_gel.play();
                }

                if ($.jStorage.get('effets_sonores') != "Non" && typeof(audio) != 'undefined' && explodeSoundEffect == 1) {
                    audio.play();
                } else if ($.jStorage.get('effets_sonores') != "Non" && typeof(audio_explosion_bis) != 'undefined' && explodeSoundEffect == 2) {
                    audio_explosion_bis.play();
                }
                $("#explosion_img").fadeIn();
                $("#mask_explosion").fadeIn();
                hacklol.shake(3000);
                $("#gel_img").fadeOut(2000);
                $("#explosion_img").fadeOut(3000, function() {
                    $("#explosion_img_effet").removeAttr('src', '');
                });
                $("#explosion_img_effet").show().each(function() {
                    this.offsetHeight;
                }).prop("src", "assets/img/explosion.gif");
                $("#mask_explosion").fadeOut(3000);
                $("#click-gel").show();
                $("#click-gel-infos-d").hide();
            } else if (page_gelee == 0 && explodeEffect == 2) {
                if ($.jStorage.get('effets_sonores') != "Non" && typeof(audio_explosion_2) != 'undefined') {
                    audio_explosion_2.play();
                }
                $("#explosion_img_effet").addClass("vertical-align-bottom");
                $("#explosion_img").fadeIn();
                $("#mask_explosion").fadeIn();
                hacklol.shake(1510);
                $("#hacklol-iframeWrapper").fadeOut(1000);
                $("#explosion_img").fadeOut(1510, function() {
                    $("#explosion_img_effet").removeAttr("src", "");
                });
                $("#explosion_img_effet").show().each(function() {
                    this.offsetHeight;
                }).prop("src", "assets/img/explosion2.gif");
                $("#mask_explosion").fadeOut(1510);
                $("#click-explosion-stop").show();
                $("#click-explosion").hide();
                $("#disparition_page").hide();
                $("#re_apparition_page").show();
            } else if (page_gelee == 1 && explodeEffect == 2) {
                page_gelee = 0;
                if ($.jStorage.get('effets_sonores') != "Non" && typeof(audio_gel) != 'undefined') {
                    audio_gel.play();
                }

                if ($.jStorage.get('effets_sonores') != "Non" && typeof(audio_explosion_2) != 'undefined') {
                    audio_explosion_2.play();
                }
                $("#explosion_img_effet").addClass("vertical-align-bottom");
                $("#explosion_img").fadeIn();
                $("#mask_explosion").fadeIn();
                hacklol.shake(1510);
                $("#gel_img").fadeOut(1300);
                $("#explosion_img").fadeOut(1510, function() {
                    $("#explosion_img_effet").removeAttr('src', '');
                });
                $("#explosion_img_effet").show().each(function() {
                    this.offsetHeight;
                }).prop("src", "assets/img/explosion2.gif");
                $("#mask_explosion").fadeOut(1510);
                $("#click-gel").show();
                $("#click-gel-infos-d").hide();
            }
        } else if (type == "stop") {
            $("#hacklol-iframeWrapper").fadeIn();
            $("#click-explosion-stop").hide();
            $("#click-explosion").show();
            $("#disparition_page").show();
            $("#re_apparition_page").hide();
        }
    },
    // Geler la page
    freeze: function() {
        page_gelee = 1;
        $("#gel_img").fadeIn(1000);
        $("#click-gel").hide();
        $("#click-gel-infos-d").show();
    },
    // Q2VjaSBlc3QgdW4gZWFzdGVyIGVnZy4gU2kgdm91cyBsJ2F2ZXogdHJvdXbDqSwgdm91cyDDqnRlcyB1biBnw6luaWUgIQ==
    // Defacer le site
    deface: function(type) {
        var easterEggKeywords = ["MLP", "MY LITTLE PONY", "ALL YOUR BASE ARE BELONG TO US", "AYBABTU", "TROLL", "TROLO", "TROL", "OUAIS", "OUI", "AH", "NON", "NAN", "NO", "NAME", "JOHN", "CENA", "ISSOU", "RISITAS"];
        var easterEggImg = ["mlp_egg.png", "mlp_egg.png", "aybabtu.png", "aybabtu.png", "trollface.png", "trollface.png", "trollface.png", "ouais.png", "ouais.png", "ah.gif", "non.gif", "non.gif", "non.gif", "isname.jpg", "isname.jpg", "isname.jpg", "issou.jpg", "issou.jpg"];
        var easterEggWidth = ["300", "300", "336", "336", "336", "336", "336", "150", "150", "", "", "", "", "", "", "", "", ""];
        var easterEggHeight = ["300", "300", "224", "224", "224", "224", "224", "214", "214", "", "", "", "", "", "", "", "", ""];
        var easterEggName = ["mlp", "mlp", "aybabtu", "aybabtu", "troll", "troll", "troll", "ouais", "ouais", "ah", "non", "non", "non", "isname", "isname", "isname", "issou", "issou"];
        var easterEggSound = ["mlp.mp3", "mlp.mp3", "aybabtu.mp3", "aybabtu.mp3", "trololo.mp3", "trololo.mp3", "trololo.mp3", "ouais.mp3", "ouais.mp3", "ah.mp3", "non.mp3", "non.mp3", "non.mp3", "isname.mp3", "isname.mp3", "isname.mp3", "issou.mp3", "issou.mp3"];
        var easterEggText = [null, null, null, null, null, null, null, null, null, "Ah ! Vous avez trouvé un Easter Egg !! Cliquez pour entendre à nouveau le Ah !", null, null, null, null, null, null, null, null];
        var indices = ["Un dessin animé très connu avec des petits poneys.", "Une phrase venant de la mauvaise traduction anglaise du jeu Zero Wing de 1989.", "Une tête de troll.", "Le célèbre ... de Denis Brogniart (en deux lettres).", "L'inverse de Non.", "And his name is ... ...", "L'inverse de Oui.", "Le célèbre ... de Risitas (en 5 lettres)."];
        var easterEggFound = new Array();
        var numberEasterEgg = hacklol.cleanArray(easterEggName).length;

        if(type == "deface") {
            var couleur_deface_arriere = $("#colorpicker3").val();
            var contrastColorTextDeface = hacklol.getContrastYIQ(couleur_deface_arriere);
            $("#deface_div").css("background-color", "#" + couleur_deface_arriere);
            $("#deface_div").css("color", contrastColorTextDeface);
            $("#deface_div").show();
            $("#p_egg").text("");
            $("#defacer_site_reafficher").show();

            if ($("#titre_deface_input").val().trim() == "") {
                $("#titre_deface").text("–");
            } else {
                $("#titre_deface").text($("#titre_deface_input").val());
            }

            if ($("#editeur_deface").val().trim() == "") {
                $("#texte_deface").text("–");
            } else {
                $("#texte_deface").text($("#editeur_deface").val());
            }

            for (var i in easterEggKeywords) {
                if ($("#titre_deface_input").val().toUpperCase().indexOf(easterEggKeywords[i]) != -1 || $("#editeur_deface").val().toUpperCase().indexOf(easterEggKeywords[i]) != -1) {
                    var eggFound = false;
                    var arrayPos = i;
                    if(easterEggFound.indexOf(easterEggName[arrayPos]) != -1) {
                        var eggFound = true;
                    }
                    easterEggFound.push(easterEggName[arrayPos]);
                    easterEggFound_global.push(easterEggName[arrayPos]);
                    if(eggFound != true) {
                        if (easterEggText[i] == null && $.jStorage.get('effets_sonores') != "Non") {
                            $("#p_egg").html($("#p_egg").html() + "<br /><img src='assets/img/" + easterEggImg[i] + "' alt='"+ easterEggKeywords[i].toLowerCase() +"' id='"+ easterEggKeywords[i].toLowerCase() +"' width='"+ easterEggWidth[i] +" height='"+ easterEggHeight[i] +"' class=\'img-resize\' onclick='hacklol.ui.replayEgg(this.src, this.id, \""+ easterEggSound[i] +"\");' style='cursor: pointer;' /><br />Bravo, vous avez trouvé un Easter Egg !!");
                        } else if(easterEggText[i] == null) {
                            $("#p_egg").html($("#p_egg").html() + "<br /><img src='assets/img/" + easterEggImg[i] + "' alt='"+ easterEggKeywords[i].toLowerCase() +"' id='"+ easterEggKeywords[i].toLowerCase() +"'  width='"+ easterEggWidth[i] +" height='"+ easterEggHeight[i] +"' class=\'img-resize\' /><br />Bravo, vous avez trouvé un Easter Egg !!<br />Activez les effets sonores si votre navigateur est compatible et vous aurez une surprise…");
                        } else if(easterEggText[i] != null && $.jStorage.get('effets_sonores') != "Non") {
                            $("#p_egg").html($("#p_egg").html() + "<br /><img src='assets/img/" + easterEggImg[i] + "' alt='"+ easterEggKeywords[i].toLowerCase() +"' id='"+ easterEggKeywords[i].toLowerCase() +"'  width='"+ easterEggWidth[i] +" height='"+ easterEggHeight[i] +"' class=\'img-resize\' onclick='hacklol.ui.replayEgg(this.src, this.id, \""+ easterEggSound[i] +"\");' style='cursor: pointer;' /><br />" + easterEggText[i]);
                        } else {
                            $("#p_egg").html($("#p_egg").html() + "<br /><img src='assets/img/" + easterEggImg[i] + "' alt='"+ easterEggKeywords[i].toLowerCase() +"' id='"+ easterEggKeywords[i].toLowerCase() +"'  width='"+ easterEggWidth[i] +" height='"+ easterEggHeight[i] +"' class=\'img-resize\' /><br />" + easterEggText[i] +"<br />Activez les effets sonores si votre navigateur est compatible et vous aurez une surprise…");
                        }
                    }
                }
            }

            var easterEggFound = hacklol.cleanArray(easterEggFound);
            easterEggFound_global = hacklol.cleanArray(easterEggFound_global);
            var countEasterEgg = easterEggFound_global.length;

            for (var i in easterEggFound) {
                if ($.jStorage.get('effets_sonores') != "Non") {
                    switch(easterEggFound[i]) {
                        case "mlp":
                            audiomlp.play();
                            break;
                        case "aybabtu":
                            audio_aybabtu.play()
                            break;
                        case "troll":
                            audio_troll.play();
                            break;
                        case "ouais":
                            audio_ouais.play();
                            break;
                        case "ah":
                            audio_ah.play();
                            break;
                        case "non":
                            audio_non.play();
                            break;
                        case "isname":
                            audio_isname.play();
                            break;
                        case "issou":
                            audio_issou.play();
                            break;
                    }
                }
            }
            
            $("#easter_egg_count").css("color", "green");

            if(countEasterEgg < numberEasterEgg && countEasterEgg > 0) {
                var nombre_a_trouve = numberEasterEgg - countEasterEgg;
                if(countEasterEgg > 1) {
                    $("#easter_egg_count").text("Bravo ! Vous avez trouvé "+ countEasterEgg +" Easter Eggs. Il vous en reste "+ nombre_a_trouve +" à trouver.");
                } else {
                    $("#easter_egg_count").text("Bravo ! Vous avez trouvé "+ countEasterEgg +" Easter Egg. Il vous en reste "+ nombre_a_trouve +" à trouver.");
                }
                
                if(cheatEasterEgg == true) {
                    if(countEasterEgg > 1) {
                        $("#easter_egg_count").text("Vous avez trouvé "+ countEasterEgg +" Easter Eggs en trichant. C'est mal, m'voyez ! Il vous en reste "+ nombre_a_trouve +" à trouver.");
                    } else {
                        $("#easter_egg_count").text("Vous avez trouvé "+ countEasterEgg +" Easter Egg en trichant. C'est mal, m'voyez ! Il vous en reste "+ nombre_a_trouve +" à trouver.");
                    }
                    $("#easter_egg_count").css("color", "red");
                }
            } else if(countEasterEgg == numberEasterEgg) {
                $("#easter_egg_count").text("Bravo ! Vous avez trouvé tous les Easter Eggs.");
            
                if(cheatEasterEgg == true) {
                    $("#easter_egg_count").text("Vous avez trouvé tous les Easter Eggs en trichant. C'est mal, m'voyez !");
                    $("#easter_egg_count").css("color", "red");
                }
            }

            $.jStorage.set('easter_egg_deface_found', easterEggFound_global);
        } else if(type == "check") {
            $("#numberEasterEgg").text(numberEasterEgg);
            if($.jStorage.get('easter_egg_deface_found') !== null) {
                easterEggFound_global = $.jStorage.get('easter_egg_deface_found');
                var countEasterEgg = easterEggFound_global.length;

                if(countEasterEgg < numberEasterEgg && countEasterEgg > 0) {
                    var nombre_a_trouve = numberEasterEgg - countEasterEgg;
                    if(countEasterEgg > 1) {
                        $("#easter_egg_count").text("Bravo ! Vous avez trouvé "+ countEasterEgg +" Easter Eggs. Il vous en reste "+ nombre_a_trouve +" à trouver.");
                    } else {
                        $("#easter_egg_count").text("Bravo ! Vous avez trouvé "+ countEasterEgg +" Easter Egg. Il vous en reste "+ nombre_a_trouve +" à trouver.");
                    }
                    
                    if($.jStorage.get('easter_egg_deface_cheated') !== null && $.jStorage.get('easter_egg_deface_cheated') == "Oui") {
                        cheatEasterEgg = true;
                        if(countEasterEgg > 1) {
                            $("#easter_egg_count").text("Vous avez trouvé "+ countEasterEgg +" Easter Eggs en trichant. C'est mal, m'voyez ! Il vous en reste "+ nombre_a_trouve +" à trouver.");
                        } else {
                            $("#easter_egg_count").text("Vous avez trouvé "+ countEasterEgg +" Easter Egg en trichant. C'est mal, m'voyez ! Il vous en reste "+ nombre_a_trouve +" à trouver.");
                        }
                        $("#easter_egg_count").css("color", "red");
                        return;
                    }
                } else if(countEasterEgg == numberEasterEgg) {
                    $("#easter_egg_count").text("Bravo ! Vous avez trouvé tous les Easter Eggs.");
            
                    if($.jStorage.get('easter_egg_deface_cheated') !== null && $.jStorage.get('easter_egg_deface_cheated') == "Oui") {
                        cheatEasterEgg = true;
                        $("#easter_egg_count").text("Vous avez trouvé tous les Easter Eggs en trichant. C'est mal, m'voyez !");
                        $("#easter_egg_count").css("color", "red");
                        return;
                    }
                }
            }
        } else if(type == "indice") {
            var numIndice = hacklol.random(0, 7);
            alert(indices[numIndice]);
            return true;
        } else if(type == "cheat") {
            if(cheatEasterEgg == true) {
                alert("Vous avez déjà révélé tous les Easter Eggs.");
                return;
            }
            if(confirm("Êtes-vous sûr de vouloir révéler tous les Easter Eggs ?") && confirm("Êtes-vous vraiment sûr de vouloir tricher ?")) {
                alert("OK, comme vous voulez… Cliquez sur « Défacer le site » pour confirmer.");
                $("#editeur_deface").val(easterEggKeywords);
                cheatEasterEgg = true;
                $.jStorage.set('easter_egg_deface_cheated', "Oui");
            }
        } else if(type == "stop") {
            $("#deface_div").hide();
            $("#defacer_site_reafficher").hide();
        }
    },
    // Matrix
    matrix: function() {
        return "Matrix Tool";
    },
    bsod: function(type) {
        if(type == "bsod") {
            var bsod_type_selected = $('#bsodType option:selected').val();
            if (bsod_type_selected == "WINXP") {
                $("#genericBSOD").show();
                $("#win8BSOD").hide();
            }
            else if(bsod_type_selected == "WIN8") {
                $("#genericBSOD").hide();
                $("#win8BSOD").show();
            } else {
                $("#genericBSOD").show();
                $("#win8BSOD").hide();
            }
            $("#click-bsod").hide();
            $("#click-bsod-stop").show();
        }
        else if(type == "stop") {
            $("#genericBSOD").hide();
            $("#win8BSOD").hide();
            $("#click-bsod").show();
            $("#click-bsod-stop").hide();
        }
    },
    shake: function(type) {
        if(type == "shake") {
            $("#hacklol-iframeWrapper").addClass("shake").addClass("shake-constant");
            $("#click-secouer").hide();
            $("#click-secouer-stop").show();
        } else if(type == "stop") {
            $("#hacklol-iframeWrapper").removeClass("shake").removeClass("shake-constant");
            $("#click-secouer").show();
            $("#click-secouer-stop").hide();
        }
    },
    flou: function(type) {
        if(type == "flou") {
            $("#hacklol-iframeWrapper").addClass("blur-desactived");
            $("#click-flouter").hide();
            $("#click-flouter-stop").show();
        } else if(type == "stop") {
            $("#hacklol-iframeWrapper").removeClass("blur-desactived");
            $("#click-flouter").show();
            $("#click-flouter-stop").hide();
        }
    }
};
// OUTILS MATRIX
hacklol.tools.matrix = {
    start: function() {
        if(window.HTMLCanvasElement) {
            if (typeof Game_Interval != "undefined") clearInterval(Game_Interval);
            Game_Interval = setInterval(draw, 33);
            $("#matrix-stop").show();
            $("#matrix").hide();
            $("#q").show();
        }

        var nombre_aleatoire2 = hacklol.random(1, 15);
        if ($.jStorage.get('effets_sonores') != "Non" && typeof(audio_aybabtu) != 'undefined') {
            if(nombre_aleatoire2 >= 5 && nombre_aleatoire2 <= 10) {
                audio_aybabtu.play();
            }
        }
    },
    stop: function() {
        if(window.HTMLCanvasElement) {
            clearInterval(Game_Interval);
            $("#matrix-stop").hide();
            $("#matrix").show();
            $("#q").hide();
        }
    }
};
(function() {
    if(window.HTMLCanvasElement) {
        var s = window.screen;
        var width = q.width = s.width;
        var height = q.height = window.innerHeight;
        var yPositions = Array(300).join(0).split('');
        var ctx = q.getContext('2d');

        draw = function() {
            ctx.fillStyle = 'rgba(0,0,0,.05)';
            ctx.fillRect(0, 0, width, height);
            ctx.fillStyle = '#0F0';
            ctx.font = '10pt Georgia';
            yPositions.map(function(y, index) {
                text = String.fromCharCode(1e2 + Math.random() * 33);
                x = (index * 10) + 10;
                q.getContext('2d').fillText(text, x, y);
                if (y > 100 + Math.random() * 1e4) {
                    yPositions[index] = 0;
                } else {
                    yPositions[index] = y + 10;
                }
            });
        };
    }
    else {
        $("#matrix-not-compatible").show();
        $("#matrix").hide();
        $("#matrix-not-compatible").click(function() {
            if(hacklol.lang == "en") {
                alert("Sorry, this tool isn't compatible with your web browser.\nUpdate your browser, and try again.");
            }
            else {
                alert("Désolé, cet outil n'est pas compatible avec votre navigateur.\nMettez à jour votre navigateur, puis réessayez.");
            }
        });
    }
}());
// FIN OUTILS
// PARAMETRES
hacklol.settings = {
    // Cocher les paramètres dans la fenêtre "Paramètres"
    check: function() {
        // affichage barre
        var parametre_affichage_barre = $.jStorage.get('affichage_barre');
        if (parametre_affichage_barre == "Oui") {
            $('#affichagebarre').prop('checked', true);
        } else if (parametre_affichage_barre == "Non") {
            $('#affichagebarre').prop('checked', true);
        } else {
            $('#affichagebarre').prop('checked', true);
        }
        // transparence barre
        var parametre_transparence_barre = $.jStorage.get('transparence_barre');
        if (parametre_transparence_barre == "Oui") {
            $('#transparencebarre').prop('checked', true);
        } else if (parametre_transparence_barre == "Non") {
            $('#transparencebarre').prop('checked', false);
        } else {
            $('#transparencebarre').prop('checked', true);
        }
        // audio
        var parametre_effets_sonores = $.jStorage.get('effets_sonores');
        if (parametre_effets_sonores == "Oui") {
            $('#effets_sonores').prop('checked', true);
        } else if (parametre_effets_sonores == "Non") {
            $('#effets_sonores').prop('checked', false);
        } else {
            $('#effets_sonores').prop('checked', true);
        }
        // raccourcis clavier
        var parametre_raccourcis_clavier = $.jStorage.get('raccourcis_clavier');
        if (parametre_raccourcis_clavier == "Oui") {
            $('#raccourcis_clavier').prop('checked', true);
        } else if (parametre_raccourcis_clavier == "Non") {
            $('#raccourcis_clavier').prop('checked', false);
        } else {
            $('#raccourcis_clavier').prop('checked', true);
        }
        // flou
        var parametre_flou_effet = $.jStorage.get('flou_effet');
        if (parametre_flou_effet == "Oui") {
            $('#flou_effet').prop('checked', true);
        } else if (parametre_flou_effet == "Non") {
            $('#flou_effet').prop('checked', false);
        } else {
            $('#flou_effet').prop('checked', false);
        }
        // hacklol page loader
        var parametre_hacklol_pl = $.jStorage.get('hacklol_page_loader');
        if (parametre_hacklol_pl == "Oui") {
            $('#hacklol_page_loader_check').prop('checked', true);
        } else if (parametre_hacklol_pl == "Non") {
            $('#hacklol_page_loader_check').prop('checked', false);
        } else {
            $('#hacklol_page_loader_check').prop('checked', true);
        }
        // couleur barre
        var parametre_couleur_barre = $.jStorage.get('couleur_barre');
        if (parametre_couleur_barre == "Defaut") {
            $('#couleurBarreSelect option[value="Defaut"]').prop('selected', true);
            $("#choixcouleur").hide();
        } else if (parametre_couleur_barre == "Bleu") {
            $('#couleurBarreSelect option[value="Bleu"]').prop('selected', true);
            $("#choixcouleur").hide();
        } else if (parametre_couleur_barre == "Rouge") {
            $('#couleurBarreSelect option[value="Rouge"]').prop('selected', true);
            $("#choixcouleur").hide();
        } else if (parametre_couleur_barre == "Vert") {
            $('#couleurBarreSelect option[value="Vert"]').prop('selected', true);
            $("#choixcouleur").hide();
        } else if (parametre_couleur_barre == "Jaune") {
            $('#couleurBarreSelect option[value="Jaune"]').prop('selected', true);
            $("#choixcouleur").hide();
        } else if (parametre_couleur_barre == "Orange") {
            $('#couleurBarreSelect option[value="Orange"]').prop('selected', true);
            $("#choixcouleur").hide();
        } else if (parametre_couleur_barre == "Rose") {
            $('#couleurBarreSelect option[value="Rose"]').prop('selected', true);
            $("#choixcouleur").hide();
        } else if (parametre_couleur_barre == "Violet") {
            $('#couleurBarreSelect option[value="Violet"]').prop('selected', true);
            $("#choixcouleur").hide();
        } else if (parametre_couleur_barre == "Brun") {
            $('#couleurBarreSelect option[value="Brun"]').prop('selected', true);
            $("#choixcouleur").hide();
        } else if (parametre_couleur_barre == "Noir") {
            $('#couleurBarreSelect option[value="Noir"]').prop('selected', true);
            $("#choixcouleur").hide();
        } else if (parametre_couleur_barre == "Blanc") {
            $('#couleurBarreSelect option[value="Blanc"]').prop('selected', true);
            $("#choixcouleur").hide();
        } else if ($.jStorage.get('couleur_barre') == null) {
            $('#couleurBarreSelect option[value="Defaut"]').prop('selected', true);
            $("#choixcouleur").hide();
        } else if (parametre_couleur_barre.charAt(0) == "#") {
            $('#couleurBarreSelect option[value="Personnalisation"]').prop('selected', true);
            $("#choixcouleur").show();
            $("#colorpicker1").colpickSetColor($.jStorage.get('couleur_barre'));
            $('#colorpicker1').val(parametre_couleur_barre.substr(1));
            $("#colorpicker1").css("border-color", $.jStorage.get('couleur_barre'));
        } else {
            $("#choixcouleur").hide();
        }
        return true;
    },
    // Sauvegarder les paramètres
    save: function() {
            // affichage barre parametres
            if ($('#affichagebarre').is(':checked') == true) {
                $.jStorage.set('affichage_barre', 'Oui');
            } else {
                $.jStorage.set('affichage_barre', 'Non');
            }
            // transparence barre parametres
            if ($('#transparencebarre').is(':checked') == true) {
                $.jStorage.set('transparence_barre', 'Oui');
            } else {
                $.jStorage.set('transparence_barre', 'Non');
            }
            // effets sonores
            if ($('#effets_sonores').is(':checked') == true) {
                $.jStorage.set('effets_sonores', 'Oui');
            } else {
                $.jStorage.set('effets_sonores', 'Non');
            }
            // raccourcis clavier
            if ($('#raccourcis_clavier').is(':checked') == true) {
                $.jStorage.set('raccourcis_clavier', 'Oui');
            } else {
                $.jStorage.set('raccourcis_clavier', 'Non');
            }
            // flou
            if ($('#flou_effet').is(':checked') == true) {
                $.jStorage.set('flou_effet', 'Oui');
            } else {
                $.jStorage.set('flou_effet', 'Non');
            }
            // hacklol page loader
            if ($('#hacklol_page_loader_check').is(':checked') == true) {
                $.jStorage.set('hacklol_page_loader', 'Oui');
            } else {
                $.jStorage.set('hacklol_page_loader', 'Non');
            }
            // couleur barre outils
            var couleur_barre_selected = $('#couleurBarreSelect option:selected').val();
            if (couleur_barre_selected == "Defaut") {
                $.jStorage.set('couleur_barre', 'Defaut');
            } else if (couleur_barre_selected == "Bleu") {
                $.jStorage.set('couleur_barre', 'Bleu');
            } else if (couleur_barre_selected == "Rouge") {
                $.jStorage.set('couleur_barre', 'Rouge');
            } else if (couleur_barre_selected == "Vert") {
                $.jStorage.set('couleur_barre', 'Vert');
            } else if (couleur_barre_selected == "Jaune") {
                $.jStorage.set('couleur_barre', 'Jaune');
            } else if (couleur_barre_selected == "Orange") {
                $.jStorage.set('couleur_barre', 'Orange');
            } else if (couleur_barre_selected == "Rose") {
                $.jStorage.set('couleur_barre', 'Rose');
            } else if (couleur_barre_selected == "Violet") {
                $.jStorage.set('couleur_barre', 'Violet');
            } else if (couleur_barre_selected == "Brun") {
                $.jStorage.set('couleur_barre', 'Brun');
            } else if (couleur_barre_selected == "Noir") {
                $.jStorage.set('couleur_barre', 'Noir');
            } else if (couleur_barre_selected == "Blanc") {
                $.jStorage.set('couleur_barre', 'Blanc');
            } else if (couleur_barre_selected == "Personnalisation") {
                var colorpicker_couleur_choisie = $("#colorpicker1").val();
                $.jStorage.set('couleur_barre', '#' + colorpicker_couleur_choisie.substr(0, 6));
            }
            // fin
            if ($.jStorage.storageAvailable()) { // si le LocalStorage est disponible
                if (hacklol.lang == "en") {
                    alert("Your settings have been saved.");
                } else {
                    alert("Vos paramètres ont été enregistrés.");
                }
                hacklol.settings.exe();
                hacklol.ui.closeWindow();
                hacklol.tools.edit("stop");
                return true;
            } else {
                if (hacklol.lang == "en") {
                    alert("Your settings have been saved for this session only, because your browser doesn't support the functionality localstorage.");
                } else {
                    alert("Vos paramètres ont été enregistrés pour cette session seulement, car votre navigateur n'est pas compatible avec la fonctionnalité de stockage de données locales.");
                }
                hacklol.settings.exe();
                hacklol.ui.closeWindow();
                hacklol.tools.edit("stop");
                return false;
            }
    },
    // Exécuter les paramètres
    exe: function() {
        var parametre_img_start_hacklol_vu = $.jStorage.get('img_start_hacklol_vu');
        if (parametre_img_start_hacklol_vu == "Oui") {
            $("#img_start_hacklol").hide();
        }
        var parametre_affichage_barre = $.jStorage.get('affichage_barre');
        if (parametre_affichage_barre == "Non") {
            hacklol.ui.closeToolbar();
        }
        // transparence barre
        var parametre_transparence_barre = $.jStorage.get('transparence_barre');
        if (parametre_transparence_barre == "Non") {
            $("#toolbar-hacklol").css("opacity", "1");
            $("#paint-tools").css("opacity", "1");
        }
        else {
            $("#toolbar-hacklol").css("opacity", "");
            $("#paint-tools").css("opacity", "");
        }
        // test compatibilité effets sonores
        if (window.HTMLAudioElement) {
            var audioE = document.createElement('audio');
            if (audioE.canPlayType && audioE.canPlayType("audio/mpeg")) {
                hacklol.ui.audio();
            } else {
                $('#effets_sonores').prop('checked', false);
                $('#effets_sonores').prop('checked', false);
                $("#effets_sonores").attr("disabled", "disabled");
                if (hacklol.lang == "en") {
                    $("#indication_error").text("Your browser is incompatible with .mp3 audio files.");
                }
                else {
                    $("#indication_error").text("Votre navigateur est incompatible avec les fichiers audio .mp3.");
                }
            }
        } else {
            $('#effets_sonores').prop('checked', false);
            $('#effets_sonores').prop('checked', false);
            $("#effets_sonores").attr("disabled", "disabled");
            if (hacklol.lang == "en") {
                $("#indication_error").text("Your browser is incompatible with playing audio files.");
            }
            else {
                $("#indication_error").text("Votre navigateur est incompatible avec la lecture de fichiers audio.");
            }
        }
        // hacklol page loader
        var parametre_hacklol_pl = $.jStorage.get('hacklol_page_loader');
        if (parametre_hacklol_pl == "Non" && pageChargeeFirst == 1) {
            hacklol.loadPage(hacklol.urlPage, false);
            pageChargeeHPL = 0;
            pageChargeeFirst = 0;
        }
        else if (pageChargeeFirst == 1) {
            hacklol.loadPage(hacklol.urlPage, true);
            pageChargeeHPL = 1;
            pageChargeeFirst = 0;
        }
        else if(parametre_hacklol_pl == "Non" && pageChargeeHPL != 0) {
            hacklol.loadPage(hacklol.urlPage, false);
            pageChargeeHPL = 0;
            pageChargeeFirst = 0;
        }
        else if(parametre_hacklol_pl == "Oui" && pageChargeeHPL != 1) {
            hacklol.loadPage(hacklol.urlPage, true);
            pageChargeeHPL = 1;
            pageChargeeFirst = 0;
        }
        // easter egg deface site
        hacklol.tools.deface("check");
        // couleur barre
        var parametre_couleur_barre = $.jStorage.get('couleur_barre');
        if (parametre_couleur_barre == "Defaut") {
            $("#toolbar-hacklol").css("background-color", "#bdc3c7");
            $('#couleurBarreSelect option[value="Defaut"]').prop('selected', true);
        } else if (parametre_couleur_barre == "Bleu") {
            $("#toolbar-hacklol").css("background-color", "#3498db");
            $('#couleurBarreSelect option[value="Bleu"]').prop('selected', true);
        } else if (parametre_couleur_barre == "Rouge") {
            $("#toolbar-hacklol").css("background-color", "#e74c3c");
            $('#couleurBarreSelect option[value="Rouge"]').prop('selected', true);
        } else if (parametre_couleur_barre == "Vert") {
            $("#toolbar-hacklol").css("background-color", "#2ecc71");
            $('#couleurBarreSelect option[value="Vert"]').prop('selected', true);
        } else if (parametre_couleur_barre == "Jaune") {
            $("#toolbar-hacklol").css("background-color", "#f1c40f");
            $('#couleurBarreSelect option[value="Jaune"]').prop('selected', true);
        } else if (parametre_couleur_barre == "Orange") {
            $("#toolbar-hacklol").css("background-color", "#e88834");
            $('#couleurBarreSelect option[value="Orange"]').prop('selected', true);
        } else if (parametre_couleur_barre == "Rose") {
            $("#toolbar-hacklol").css("background-color", "#f472d0");
            $('#couleurBarreSelect option[value="Rose"]').prop('selected', true);
        } else if (parametre_couleur_barre == "Violet") {
            $("#toolbar-hacklol").css("background-color", "#9b59b6");
            $('#couleurBarreSelect option[value="Violet"]').prop('selected', true);
        } else if (parametre_couleur_barre == "Brun") {
            $("#toolbar-hacklol").css("background-color", "#825a2c");
            $('#couleurBarreSelect option[value="Brun"]').prop('selected', true);
        } else if (parametre_couleur_barre == "Noir") {
            $("#toolbar-hacklol").css("background-color", "black");
            $('#couleurBarreSelect option[value="Noir"]').prop('selected', true);
        } else if (parametre_couleur_barre == "Blanc") {
            $("#toolbar-hacklol").css("background-color", "white");
            $('#couleurBarreSelect option[value="Blanc"]').prop('selected', true);
        } else if ($.jStorage.get('couleur_barre') == null) {
            $("#toolbar-hacklol").css("background-color", "#bdc3c7");
            $('#couleurBarreSelect option[value="Defaut"]').prop('selected', true);
        } else if (parametre_couleur_barre.charAt(0) == "#") {
            $("#toolbar-hacklol").css("background-color", $.jStorage.get('couleur_barre')); // change la couleur de la barre du haut
            $('#couleurBarreSelect option[value="Personnalisation"]').prop('selected', true); // select Couleur personalisée... dans le menu déroulant
            $('#colorpicker1').val(parametre_couleur_barre.substr(1)); // affiche le code couleur dans le input avec le # supprimé
            $("#colorpicker1").css("border-color", $.jStorage.get('couleur_barre')); // change la couleur du input
            $("#choixcouleur").show(); // affiche le choix de couleur
            $("#colorpicker1").colpickSetColor($.jStorage.get('couleur_barre'));
        } else {
            $("#toolbar-hacklol").css("background-color", "#bdc3c7");
            $('#couleurBarreSelect option[value="Defaut"]').prop('selected', true);
        }
        $("#paint-tools").css("background-color", $("#toolbar-hacklol").css("background-color"));
        var contrastColor = hacklol.getContrastYIQ(hacklol.rgb2hex($("#toolbar-hacklol").css("background-color")));
        $("#toolbar-hacklol").css("color", contrastColor);
        $("#paint-tools").css("color", contrastColor);
        // change theme-color (for Chrome for Android)
        var metaThemeColor = document.querySelector("meta[name=theme-color]");
        metaThemeColor.setAttribute("content", "#" + hacklol.rgb2hex($("#toolbar-hacklol").css("background-color")));
        hacklol.settings.check(); // modification des paramètres dans la fenêtre paramètres
        return true;
    },
    resetData: function() {
        $.jStorage.flush();
        $.jStorage.reInit();
        codeMirrorUserScript.getDoc().setValue('// exemple de script utilisateur\nalert("Hello world !");');
        errorDisabled = false;
        pageChargeeFirst = 1;
        $('input[name=checkboxDisableErrors]').prop('checked', false);
        $("#colorpicker1").val("");
        $("#colorpicker1").css("border-color", "#000000");
        easterEggFound_global = new Array();
        cheatEasterEgg = false;
        $("#easter_egg_count").css("color", "green");
        $("#easter_egg_count").text("");
        if(hacklol.lang == "en") {
            alert("Data deleted.");
        } else {
            alert("Toutes les données ont été supprimées.");
        }
        hacklol.settings.exe();
        hacklol.ui.closeWindow();
    }
};
// INTERFACE (également appelé UI = User Interface = Interface Utilisateur)
hacklol.ui = {
    // Fermer la barre d'outils
    closeToolbar: function() {
        $("#toolbar-hacklol").slideUp("slow");
        $("#mask_opbh").stop(true, true).show();
        $("#btn-show-toolbar").stop(true, true).fadeIn("slow");
        $("#menuMobile").hide();
        $("#lienMenuMobile").html("<span class=\"icon icon_menu\"></span> Menu");
        menuLienLib = 1;
    },
    // Afficher la barre d'outils
    showToolbar: function() {
        $("#toolbar-hacklol").slideDown("slow");
        $("#btn-show-toolbar").stop(true, true).fadeOut("slow");
        $("#mask_opbh").stop(true, true).fadeOut("slow");
    },
    // Fermer la fenêtre
    closeWindow: function() {
        $.magnificPopup.close();
    },
    hideButtonToolbar: function() {
        $("#btn-show-toolbar").fadeToggle("slow");
        $("#btn-show-toolbar-paint").fadeToggle("slow");
    },
    quitHacklol: function() {
        $.magnificPopup.open({
          items: {
            src: '#changer-site-popup',
            type: 'inline'
          },
          removalDelay: 300,
          mainClass: 'mfp-fade',
          callbacks: {
            open: function() {
                $("body").addClass("scrollBarAuto");
                $("html").addClass("scrollBarAuto");
                if ($.jStorage.get('flou_effet') == "Oui") {
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
                hacklol.ui.desactivFlou();
            }
          }
        });
    },
    // Activation de l'effet de flou
    flou: function() {
        $("#toolbar-hacklol").addClass("blur-desactived");
        $("#hacklol-iframe").addClass("blur-desactived");
        $("#btn-show-toolbar-paint").addClass("blur-desactived");
        $("#btn-show-toolbar").addClass("blur-desactived");
        $("#paint-tools").addClass("blur-desactived");
        $("#canvas").addClass("blur-desactived");
        $("#deface_div").addClass("blur-desactived");
        $("#gel_img").addClass("blur-desactived");
        $(".bulleMenu").addClass("blur-desactived");
        $("#q").addClass("blur-desactived");
        $("#menuMobile").addClass("blur-desactived");
        $("#mask_explosion").addClass("blur-desactived");
        $("#explosion_img").addClass("blur-desactived");
        $("#genericBSOD").addClass("blur-desactived");
        $("#win8BSOD").addClass("blur-desactived");
        $("#img_start_hacklol").addClass("blur-desactived");
        $("#background-loading-indicator").addClass("blur-desactived");
    },
    // Desactivation de l'effet de flou
    desactivFlou: function() {
        $("#toolbar-hacklol").removeClass("blur-desactived");
        $("#hacklol-iframe").removeClass("blur-desactived");
        $("#btn-show-toolbar-paint").removeClass("blur-desactived");
        $("#btn-show-toolbar").removeClass("blur-desactived");
        $("#paint-tools").removeClass("blur-desactived");
        $("#canvas").removeClass("blur-desactived");
        $("#deface_div").removeClass("blur-desactived");
        $("#gel_img").removeClass("blur-desactived");
        $(".bulleMenu").removeClass("blur-desactived");
        $("#q").removeClass("blur-desactived");
        $("#menuMobile").removeClass("blur-desactived");
        $("#mask_explosion").removeClass("blur-desactived");
        $("#explosion_img").removeClass("blur-desactived");
        $("#genericBSOD").removeClass("blur-desactived");
        $("#win8BSOD").removeClass("blur-desactived");
        $("#img_start_hacklol").removeClass("blur-desactived");
        $("#background-loading-indicator").removeClass("blur-desactived");
    },
    audio: function() {
        // AUDIO - SI L'UTILISATEUR A ACTIVE LES EFFETS SONORES ET QUE SON NAVIGATEUR EST COMPATIBLE, ON LES CHARGE
        if (window.HTMLAudioElement && $.jStorage.get('effets_sonores') != "Non" || $.jStorage.get('effets_sonores') == null) {
            // explosion
            audio = document.createElement("audio");
            audio.src = "assets/sounds/effet_explosion.mp3";
            audio.muted = false;
            // explosion bis
            audio_explosion_bis = document.createElement("audio");
            audio_explosion_bis.src = "assets/sounds/effet_explosion_bis.mp3";
            audio_explosion_bis.muted = false;
            // explosion 2
            audio_explosion_2 = document.createElement("audio");
            audio_explosion_2.src = "assets/sounds/effet_explosion_2.mp3";
            audio_explosion_2.muted = false;
            // explosion gel
            audio_gel = document.createElement("audio");
            audio_gel.src = "assets/sounds/gel.mp3";
            audio_gel.muted = false;
            // eg
            audiomlp = document.createElement("audio");
            audiomlp.src = "assets/sounds/mlp.mp3";
            audiomlp.muted = false;
            // aybabtu
            audio_aybabtu = document.createElement("audio");
            audio_aybabtu.src = "assets/sounds/aybabtu.mp3";
            audio_aybabtu.muted = false;
            // what
            audio_wt = document.createElement("audio");
            audio_wt.src = "assets/sounds/wt_egg.mp3";
            audio_wt.muted = false;
            // trololo
            audio_troll = document.createElement("audio");
            audio_troll.src = "assets/sounds/trololo.mp3";
            audio_troll.muted = false;
            // ouais
            audio_ouais = document.createElement("audio");
            audio_ouais.src = "assets/sounds/ouais.mp3";
            audio_ouais.muted = false;
            // ah
            audio_ah = document.createElement("audio");
            audio_ah.src = "assets/sounds/ah.mp3";
            audio_ah.muted = false;
            // non
            audio_non = document.createElement("audio");
            audio_non.src = "assets/sounds/non.mp3";
            audio_non.muted = false;
            // isname
            audio_isname = document.createElement("audio");
            audio_isname.src = "assets/sounds/isname.mp3";
            audio_isname.muted = false;
            // issou
            audio_issou = document.createElement("audio");
            audio_issou.src = "assets/sounds/issou.mp3";
            audio_issou.muted = false;
        } else if(window.HTMLAudioElement) {
            if(typeof(audio) != 'undefined') {
                audio.muted = true;
            }
            if(typeof(audio_explosion_bis) != 'undefined') {
                audio_explosion_bis.muted = true;
            }
            if(typeof(audio_explosion_2) != 'undefined') {
                audio_explosion_2.muted = true;
            }
            if(typeof(audio_gel) != 'undefined') {
                audio_gel.muted = true;
            }
            if(typeof(audiomlp) != 'undefined') {
                audiomlp.muted = true;
            }
            if(typeof(audio_aybabtu) != 'undefined') {
                audio_aybabtu.muted = true;
            }
            if(typeof(audio_wt) != 'undefined') {
                audio_wt.muted = true;
            }
            if(typeof(audio_troll) != 'undefined') {
                audio_troll.muted = true;
            }
            if(typeof(audio_ouais) != 'undefined') {
                audio_ouais.muted = true;
            }
            if(typeof(audio_ah) != 'undefined') {
                audio_ah.muted = true;
            }
            if(typeof(audio_tmp) != 'undefined') {
                audio_tmp.muted = true;
            }
            if(typeof(audio_non) != 'undefined') {
                audio_non.muted = true;
            }
            if(typeof(audio_isname) != 'undefined') {
                audio_isname.muted = true;
            }
            if(typeof(audio_issou) != 'undefined') {
                audio_issou.muted = true;
            }
        }
    },
    playAudio: function(src) {
        if (window.HTMLAudioElement && $.jStorage.get('effets_sonores') != "Non" || $.jStorage.get('effets_sonores') == null) {
            audio_tmp = document.createElement("audio");
            if(audio_tmp.canPlayType("audio/mp3") != "") {
                audio_tmp.src = src;
                audio_tmp.muted = false;
                audio_tmp.play();
                return true;
            }
            return false;
        }
        return false;
    },
    replayEgg: function(src, id, audio) {
            hacklol.ui.playAudio("assets/sounds/" + audio);
            $("#" + id).attr("src", src);
            return true;
    }
};
// INTERFACE UTILISATEUR DE LA FONCTION PAINT
hacklol.ui.paint = {
    // Fermer la barre d'outils
    closeToolbar: function() {
        if(paintEnabled == true) {
            $("#paint-tools").slideUp("slow");
            $("#btn-show-toolbar-paint").stop(true, true).fadeIn("slow");
            $("#mask_opbb").stop(true, true).show();
            $("#bulleCouleur").hide();
            $("#bulleBrush").hide();
        }
    },
    // Afficher la barre d'outils
    showToolbar: function() {
        if(paintEnabled == true) {
            $("#paint-tools").slideDown("slow");
            $("#btn-show-toolbar-paint").stop(true, true).fadeOut("slow");
            $("#mask_opbb").stop(true, true).fadeOut("slow");
        }
    }
};
// INTERFACE UTILISATEUR DU MENU MOBILE
hacklol.ui.menuMobile = {
    // En cas de click
    click: function() {
        if (menuLienLib == 1 && hacklol.lang == "en") {
            $("#menuMobile").stop().slideDown("slow");
            $("#lienMenuMobile").html("<span class=\"icon icon_fermer\"></span> Close the menu");
            menuLienLib = 2;
        } else if (menuLienLib == 1) {
            $("#menuMobile").stop().slideDown("slow");
            $("#lienMenuMobile").html("<span class=\"icon icon_fermer\"></span> Fermer le menu");
            menuLienLib = 2;
        } else {
            $("#menuMobile").stop().slideUp("slow");
            $("#lienMenuMobile").html("<span class=\"icon icon_menu\"></span> Menu");
            menuLienLib = 1;
        }
    }
};
// EVENEMENTS
$(document).ready(function() {
    // Charger en arrière-plan
    $("#loadInBackground").click(function() {
        hacklol.completeLoading();
        $("#background-loading-indicator").fadeIn();
        loadInBackground = true;
    });
    $("#background-loading-indicator").click(function() {
        $("#background-loading-indicator").fadeOut();
    });
    // Open toolbar button draggable
    $("#btn-show-toolbar").draggable();
    $("#btn-show-toolbar-paint").draggable();
    $(window).on('resize', function() {
        $("#btn-show-toolbar").css("top", "");
        $("#btn-show-toolbar").css("left", "");
        $("#btn-show-toolbar-paint").css("top", "");
        $("#btn-show-toolbar-paint").css("left", "");
    });
    // Chargement images
    hacklol.loadImages();
    // AFFICHER VERSION ET DATE DE VERSION HACKLOL Modifier
    $("#versionHacklolAbout").text(hacklol.version);
    $("#dateVersionHacklolAbout").text(hacklol.dateVersion);
    // INTERFACE
    // Fermer barre fonction
    $(".btn_close_bar").click(function() {
        hacklol.ui.closeToolbar();
    });
    $("#btn-show-toolbar").click(function() {
        hacklol.ui.showToolbar();
    });
    // Menu
    $("#lienMenuMobile").click(function() {
        hacklol.ui.menuMobile.click();
    });
    // Rechargement page
    $("#reload-page-button").click(function() {
        hacklol.reloadPage();
    });
    // Retour page
    $("#retour-page-button").click(function() {
        history.back();
    });
    // Suivant page
    $("#suivant-page-button").click(function() {
        history.forward();
    });
    $("#hacklol-iframe").on('load', function() {
        // Stoppe l'outil "Modifier la page" lors du chargement d'une page
        hacklol.tools.edit("stop");
    });
    $("#quitHacklolBtn").click(function() {
        $("#hacklol-iframeWrapper").html("");
        //window.onbeforeunload = function() { };
        window.location.href = '../index.php';
    });
    $("#reset_data").click(function() {
        // Réinitialiser données
        if(hacklol.lang == "en" && confirm("Are you sure to delete ALL the Hacklol Modifier data ?")) {
            hacklol.settings.resetData();
        } else if(hacklol.lang == "fr" && confirm("Êtes-vous sûr de vouloir supprimer TOUTES les données enregistrées d'Hacklol Modifier ?")) {
            hacklol.settings.resetData();
        }
    });
    $("#toolbar-hacklol").click(function() {
        $("#img_start_hacklol").hide();
        if ($.jStorage.storageAvailable()) { // si le LocalStorage est disponible
            $.jStorage.set('img_start_hacklol_vu', 'Oui');
        }
    });
    $('input[name=checkboxDisableErrors]').change(function(){
        if($('input[name=checkboxDisableErrors]').is(':checked')) {
            errorDisabled = true;
        } else {
            errorDisabled = false;
        }
    });
    // Popups
    $('.open-popup-link').magnificPopup({
        type: 'inline',
        removalDelay: 300,
        mainClass: 'mfp-fade',
        callbacks: {
            open: function() {
                $("body").addClass("scrollBarAuto");
                $("html").addClass("scrollBarAuto");
                if ($.jStorage.get('flou_effet') == "Oui") {
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
                hacklol.ui.desactivFlou();
            }
        }
    });
    // Popups modales
    $('.popup-parametres').magnificPopup({
        type: 'inline',
        preloader: false,
        focus: '#affichagebarre',
        removalDelay: 300,
        mainClass: 'mfp-fade',
        // When elemened is focused, some mobile browsers in some cases zoom in
        // It looks not nice, so we disable it:
        callbacks: {
            beforeOpen: function() {
                if ($(window).width() < 700) {
                    this.st.focus = false;
                } else {
                    this.st.focus = '#affichagebarre';
                }
            },
            open: function() {
                $("body").addClass("scrollBarAuto");
                $("html").addClass("scrollBarAuto");
                if ($.jStorage.get('flou_effet') == "Oui") {
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
                hacklol.settings.check();
                hacklol.ui.desactivFlou();
            }
        }
    });
    // Popups ajax
    $('.ajax-popup-link').magnificPopup({
        type: 'ajax',
        removalDelay: 300,
        mainClass: 'mfp-fade',
        cursor: 'mfp-ajax-cur', // CSS class that will be added to body during the loading (adds "progress" cursor)
        tError: '<a href="%url%" target="_blank">Le contenu</a> n\'a pas pu être chargé correctement.<br /><a href="%url%" target="_blank">The content</a> could not be loaded.', //  Error message, can contain %curr% and %total% tags if gallery is enabled
        callbacks: {
            open: function() {
                $("body").addClass("scrollBarAuto");
                $("html").addClass("scrollBarAuto");
                if ($.jStorage.get('flou_effet') == "Oui") {
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
                hacklol.ui.desactivFlou();
            }
        }
    });
    // Lien pour fermer le popup
    $(document).on('click', '.popup-modal-dismiss', function(e) {
        hacklol.ui.closeWindow();
    });
    // FIN INTERFACE
    // OUTILS
    // Faire disparaitre page
    $("#disparition_page").click(function() {
        hacklol.tools.hidePage("hide");
    });
    $("#re_apparition_page").click(function() {
        hacklol.tools.hidePage("show");
    });
    // Faire exploser page
    $("#click-explosion").click(function() {
        hacklol.tools.explode("explode");
    });
    $("#click-explosion-stop").click(function() {
        hacklol.tools.explode("stop");
    });
    $("#click-gel").click(function() {
        hacklol.tools.freeze();
    });
    $("#click-flouter").click(function() {
        hacklol.tools.flou("flou");
    });
    $("#click-flouter-stop").click(function() {
        hacklol.tools.flou("stop");
    });
    $("#click-secouer").click(function() {
        hacklol.tools.shake("shake");
    });
    $("#click-secouer-stop").click(function() {
        hacklol.tools.shake("stop");
    });
    $("#indiceEgg").click(function() {
        hacklol.tools.deface("indice");
    });
    $("#cheatEgg").click(function() {
        hacklol.tools.deface("cheat");
    });
    // Changer de site
    $("#change_site_ok").click(function() {
        var parametre_hacklol_pl = $.jStorage.get('hacklol_page_loader');
        var url = $("#urlChangeSite").val();
        $("#errorUrlChange").text("");
        $("#errorUrlChange").hide();
        hacklol.tools.edit("stop");
        if(url.trim() == "") {
            $("#errorUrlChange").html("<span class='icon icon_error'></span> Vous n'avez rien entré.");
            $("#errorUrlChange").show();
            return;
        } else if(hacklol.validateUrl(url) == false) {
            $("#errorUrlChange").html("<span class='icon icon_error'></span> Adresse invalide.");
            $("#errorUrlChange").show();
            return;
        }
        if (parametre_hacklol_pl == "Non") {
            hacklol.loadPage(url, false);
        }
        else {
            hacklol.loadPage(url, true);
        }
        hacklol.ui.closeWindow();
    });
    $("#urlChangeSite").val(hacklol.urlPage);
    // Defacer site
    // Color picker
    $('#colorpicker3').colpick({
        layout: 'hex',
        submit: 0,
        color: 'FE4A4A',
        colorScheme: 'dark',
        onChange: function(hsb, hex, rgb, el, bySetColor) {
            $(el).css('border-color', '#' + hex);
            // Fill the text box just if the color was set using the picker, and not the colpickSetColor function.
            if (!bySetColor) $(el).val(hex);
        }
    }).keyup(function() {
        $(this).colpickSetColor(this.value);
    });
    $("#defacer_site_ok").click(function() {
        hacklol.tools.deface("deface");
    });
    $("#defacer_site_reafficher").click(function() {
        hacklol.tools.deface("stop");
    });
    $("#bsod_site_ok").click(function() {
        hacklol.tools.bsod("bsod");
    });
    $("#click-bsod-stop").click(function() {
        hacklol.tools.bsod("stop")
    });
    // Matrix
    $("#matrix-stop").click(function() {
        hacklol.tools.matrix.stop();
    });
    $("#matrix").click(function() {
        hacklol.tools.matrix.start();
    });
    // Paint
    $("#click-paint").click(function() {
        hacklol.tools.paint("paint");
    });
    $("#click-paint-stop").click(function() {
        hacklol.tools.paint("stop");
    });
    $("#close-dessin-tools").click(function() {
        hacklol.ui.paint.closeToolbar();
    });
    $("#btn-show-toolbar-paint").click(function() {
        hacklol.ui.paint.showToolbar();
    });
    // REDIMENSIONNE AUTOMATIQUEMENT LE CANVAS DU PAINT.
    (function() {
        if(window.HTMLCanvasElement) {
            var canvas,
                wrapper,
                stage,
                shape,
                fullWindowState;
            var canvas = document.getElementById("canvas");
            var wrapper = document.getElementById("wrapper");

            function fullWindow(e) {
                if (!fullWindowState) {
                    fullWindowState = true;
                    // Canvas goes full window
                    canvas.className = "canvasFullWindow";
                    wrapper.className = "wrapperFullfullWindow";
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                } else {
                    fullWindowState = false;
                    //canvas goes normal
                    canvas.width = 800;
                    canvas.height = 600;
                    canvas.className = "canvasNormal";
                    wrapper.className = "wrapperNormal";
                }
            }

            function onResizeHandler(e) {
                if (fullWindowState) {
                    var inMemCanvas = document.createElement('canvas');
                    var inMemCtx = inMemCanvas.getContext('2d');
                    inMemCanvas.width = canvas.width;
                    inMemCanvas.height = canvas.height;
                    inMemCtx.drawImage(canvas, 0, 0);
                    var ctx = canvas.getContext("2d");
                    canvas.width = window.innerWidth;
                    canvas.height = window.innerHeight;
                    ctx.drawImage(inMemCanvas, 0, 0);
                    inMemCanvas = "";
                    inMemCtx = "";
                }
            }
            window.onresize = onResizeHandler;
            var canvaspaint = document.getElementById("canvas");
            fullWindow(canvaspaint);
        }
    }());
    // effet vague encre materiel design - http://codepen.io/440design/pen/iEztk
    (function() {
        var ink, d, x, y;
        $(".ripplelink").click(function(e){
            if($(this).find(".ink").length === 0){
                $(this).prepend("<span class='ink'></span>");
            }

            ink = $(this).find(".ink");
            ink.removeClass("animate");

            if(!ink.height() && !ink.width()){
                d = Math.max($(this).outerWidth(), $(this).outerHeight());
                ink.css({height: d, width: d});
            }

            x = e.pageX - $(this).offset().left - ink.width()/2;
            y = e.pageY - $(this).offset().top - ink.height()/2;

            ink.css({top: y+'px', left: x+'px'}).addClass("animate");
        });
    }());
    // Color picker
    $('#colorpicker1').colpick({
        layout: 'hex',
        submit: 0,
        color: '000000',
        colorScheme: 'dark',
        onChange: function(hsb, hex, rgb, el, bySetColor) {
            $(el).css('border-color', '#' + hex);
            // Fill the text box just if the color was set using the picker, and not the colpickSetColor function.
            if (!bySetColor) $(el).val(hex);
        }
    }).keyup(function() {
        $(this).colpickSetColor(this.value);
    });
    $("#couleurBarreSelect").change(function() {
        if ($('#couleurBarreSelect option:selected').val() == "Personnalisation") {
            $("#choixcouleur").show();
        } else {
            $("#choixcouleur").hide();
        }
    });
    // FIN OUTILS
    // SAUVEGARDE PARAMETRES
    $("#parametre_ok").click(function() {
        hacklol.settings.save();
    });
});
/* Une fois la page chargée
$(window).on('load', function() {
    // FERMETURE FENETRE CHARGEMENT
    $("#chargement").fadeToggle("slow");
    $("#mask_chargement").fadeToggle("slow");
}); */
// FONCTIONS QUI DOIVENT ETRE EXECUTEES PAR ONCLICK
// fonction pour checker les boutons radio dans les parametres (dans la fenetre parametre)
function optionsCheck() {
    hacklol.settings.check();
}

function modifier_page_tool() {
    hacklol.tools.edit("edit");
}

function modifier_page_tool_arret() {
    hacklol.tools.edit("stop");
}
/*if(hacklol.lang == "en") {
    window.onbeforeunload = function() {
        return "You are about to exit Hacklol Modifier.";
    };
} else {
    window.onbeforeunload = function() {
        return "Vous êtes sur le point de quitter Hacklol Modifier.";
    };
}*/
