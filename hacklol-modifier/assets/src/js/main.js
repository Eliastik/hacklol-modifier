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
page_gelee = 0; // variable permettant de savoir si la page est gelée
menuLienLib = 1; // variable utilisée pour le libelé du menu
pageChargeeHPL = 0; // variable pour Hacklol Page Loader
pageChargeeFirst = 1; // variable utilisée pour savoir si c'est la première fois qu'une page d'arrière-plan est chargée
errorDisabled = false; // variable utilisée pour savoir si l'utilisateur a désactivé l'affichage des erreurs
paintEnabled = false; // variable utilisée pour savoir si l'outil "Dessiner sur la page" est activé
countEasterEgg = 0;
var easterEggFound_global = new Array();
var cheatEasterEgg = false;
var errorLoadingImages = false;
var errorLoadingAudio = false;
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
    hacklolPageLoaderName: "Hacklol Page Loader",
    disablePageLoaderByDefault: false, // disable the Page Loader by default (can be enabled by the user later)
    description: null,
    version: "1.4.1", // la version d'Hacklol
    dateVersion: "23/10/2017", // date
    lang: function() {
        if(typeof(i18next.language) !== 'undefined') {
            return i18next.language.substr(0, 2);
        } else {
            return false;
        }
    }, // language
    asciiArt: " _____         _   _     _ \n|  |  |___ ___| |_| |___| |\n|     | .'|  _| '_| | . | |\n|__|__|__,|___|_,_|_|___|_|",
    tools: 10, // nb d'outils, utilisé pour les fonctions
    settings: "Settings Method",
    ui: "User Interface Method",
    urlPage: urlPage_global,
    console: function() {
        console.log(hacklol.asciiArt + "\n" + i18next.t('console'));
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
                if(data.trim() != versionActuelle.trim()) {
                    $("#testVersionHacklol").html("<span class='icon icon_infos'></span> " + i18next.t('outdatedversion') + " " + data.trim() + ". " + i18next.t('outdatedversioncache'));
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

        if(hacklol.disablePageLoaderByDefault == true && parametre_hacklol_pl !== "Oui") {
            hacklol.loadPage(hacklol.urlPage, false);
        } else if (parametre_hacklol_pl == "Oui") {
            hacklol.loadPage(hacklol.urlPage, true);
        } else if (parametre_hacklol_pl == "Non") {
            hacklol.loadPage(hacklol.urlPage, false);
        } else {
            hacklol.loadPage(hacklol.urlPage, true);
        }

        return true;
    },
    changeSite: function() {
        var parametre_hacklol_pl = $.jStorage.get('hacklol_page_loader');
        var url = $("#urlChangeSite").val();
        $("#errorUrlChange").text("");
        $("#errorUrlChange").hide();
        hacklol.tools.edit("stop");
        if(url.trim() == "") {
            $("#errorUrlChange").html("<span class='icon icon_error'></span> " + i18next.t('changesite.empty'));
            $("#errorUrlChange").show();
            return false;
        } else if(hacklol.validateUrl(url) == false) {
            $("#errorUrlChange").html("<span class='icon icon_error'></span> " + i18next.t('changesite.errorurl'));
            $("#errorUrlChange").show();
            return false;
        }

        if(hacklol.disablePageLoaderByDefault == true && parametre_hacklol_pl !== "Oui") {
            hacklol.loadPage(url, false);
        } else if (parametre_hacklol_pl == "Oui") {
            hacklol.loadPage(url, true);
        } else if (parametre_hacklol_pl == "Non") {
            hacklol.loadPage(url, false);
        } else {
            hacklol.loadPage(url, true);
        }

        $("#urlSiteChosen").text(url);
        urlPage_global = url;
        hacklol.urlPage = url;
        hacklol.ui.closeWindow();
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
        var imageNames = ['assets/img/select-arrow.png','assets/img/explosion.gif','assets/img/explosion2.gif','assets/img/gel.png','assets/img/points.png','assets/img/sadface.png', 'assets/img/mlp_egg.png', 'assets/img/aybabtu.png', 'assets/img/trollface.png', 'assets/img/check.png', 'assets/img/ouais.png', 'assets/img/ah.gif', 'assets/img/non.gif', 'assets/img/isname.jpg', 'assets/img/issou.jpg', 'assets/img/jspvips.gif', 'assets/img/hendek.jpg'];
        var imagesArray = [];
        for (var i = 0; i < imageNames.length; i++) {
            var image = new Image();
            image.src = imageNames[i];
            image.onload = function() {
                loadedImagesCount++;
                var pourcentageLoading = Math.round((100*loadedImagesCount)/imageNames.length);
                $("#progressLoading").css("width", pourcentageLoading + "%");
                $("#loadingInfos").text(i18next.t('load.graphics'));
                $("#backgroundLoadingInfos").text(i18next.t('load.graphics'));
                $("#pourcentageLoadingInfos").text(pourcentageLoading + "%");
                $("#backgroundPourcentageLoadingInfos").text(pourcentageLoading + "%");
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
                $("#loadingInfos").text(i18next.t('load.graphics'));
                $("#backgroundLoadingInfos").text(i18next.t('load.graphics'));
                $("#pourcentageLoadingInfos").text(pourcentageLoading + "%");
                $("#backgroundPourcentageLoadingInfos").text(pourcentageLoading + "%");
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
            var audioFiles = ["effet_explosion.mp3", "effet_explosion_bis.mp3", "effet_explosion_2.mp3", "gel.mp3", "mlp.mp3", "aybabtu.mp3", "wt_egg.mp3", "trololo.mp3", "ah.mp3", "ouais.mp3", "non.mp3", "isname.mp3", "issou.mp3", "jspvips.mp3", "hendek.mp3"];
            if (audioTestMp3.canPlayType && audioTestMp3.canPlayType("audio/mpeg")) {
                $("#loadingInfos").text(i18next.t('load.audio'));
                $("#backgroundLoadingInfos").text(i18next.t('load.audio'));
                $("#pourcentageLoadingInfos").text("0%");
                $("#backgroundPourcentageLoadingInfos").text("0%");
                var loadedAudioCount = 0;
                var errorLoadingAudio = false;
                var pourcentageLoadingAudio = 0;
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
                        $("#loadingInfos").text(i18next.t('load.audio'));
                        $("#backgroundLoadingInfos").text(i18next.t('load.audio'));
                        $("#pourcentageLoadingInfos").text(pourcentageLoadingAudio + "%");
                        $("#backgroundPourcentageLoadingInfos").text(pourcentageLoadingAudio + "%");
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
                for (var i=0; i < audioFiles.length; i++) {
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
                                $("#loadingInfos").text(i18next.t('load.audio'));
                                $("#backgroundLoadingInfos").text(i18next.t('load.audio'));
                                $("#pourcentageLoadingInfos").text(pourcentageLoadingAudio + "%");
                                $("#backgroundPourcentageLoadingInfos").text(pourcentageLoadingAudio + "%");
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
document.title = hacklol.appName;
// OUTILS
hacklol.tools = {
    // Modifier le site
    edit: function(type) {
        var parametre_hacklol_pl = $.jStorage.get('hacklol_page_loader');
        if (type == "edit") {
            if(parametre_hacklol_pl == "Non" || hacklol.disablePageLoaderByDefault == true && parametre_hacklol_pl !== "Oui") {
                if(confirm(i18next.t('edit.confirm') + " " + hacklol.hacklolPageLoaderName + " " + i18next.t('edit.confirm2'))) {
                    try {
                        document.body.contentEditable = true;
                        $("#arret_modif_page").show();
                        $("#modif_page").hide();
                        hacklol.ui.closeToolbar();
                        hacklol.tools.paint("stop");
                    } catch(e) { alert(i18next.t('edit.error')); }
                }
            } else if(parametre_hacklol_pl != "Non" || hacklol.disablePageLoaderByDefault != true && parametre_hacklol_pl !== "Non") {
                try {
                    document.getElementById("hacklol-iframe").contentEditable = true;
                    document.getElementById('hacklol-iframe').contentWindow.document.body.contentEditable = true;
                    document.getElementById('hacklol-iframe').contentWindow.document.getElementById('hacklol-iframe-protected').contentEditable = true;
                    document.getElementById('hacklol-iframe').contentWindow.document.getElementById('hacklol-iframe-protected').contentWindow.document.body.contentEditable = true;
                    $("#arret_modif_page").show();
                    $("#modif_page").hide();
                    hacklol.ui.closeToolbar();
                    hacklol.tools.paint("stop");
                } catch(e) { alert(i18next.t('edit.error')); }
            }
        } else if (type == "stop") {
            if(parametre_hacklol_pl == "Non" || hacklol.disablePageLoaderByDefault == true && parametre_hacklol_pl !== "Oui") {
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
                var nombre_aleatoire = hacklol.random(1, 10);
                if(nombre_aleatoire == 5 && typeof(audio_wt) != 'undefined') {
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
            $("#explosion_img").fadeIn();
            $("#mask_explosion").fadeIn();

            if(explodeEffect == 1) {
                if ($.jStorage.get('effets_sonores') != "Non" && typeof(audio) != 'undefined' && explodeSoundEffect == 1) {
                        audio.play();
                } else if ($.jStorage.get('effets_sonores') != "Non" && typeof(audio_explosion_bis) != 'undefined' && explodeSoundEffect == 2) {
                        audio_explosion_bis.play();
                }

                hacklol.shake(3000);
                $("#explosion_img").fadeOut(3000, function() {
                    $("#explosion_img_effet").removeAttr("src", "");
                });
                $("#explosion_img_effet").show().each(function() {
                    this.offsetHeight;
                }).prop("src", "assets/img/explosion.gif");
                $("#mask_explosion").fadeOut(3000);
                setTimeout("hacklol.ui.showToolbar(); hacklol.ui.paint.showToolbar();", 3100);

                if(page_gelee == 0) {
                    $("#hacklol-iframeWrapper").fadeOut(2000);
                    $("#click-explosion-stop").show();
                    $("#click-explosion").hide();
                    $("#disparition_page").hide();
                    $("#re_apparition_page").show();
                } else if(page_gelee == 1) {
                    page_gelee = 0;
                    if ($.jStorage.get('effets_sonores') != "Non" && typeof(audio_gel) != 'undefined') {
                        audio_gel.play();
                    }
                    $("#gel_img").fadeOut(2000);
                    $("#click-gel").show();
                    $("#click-gel-infos-d").hide();
                }
            } else if(explodeEffect == 2) {
                if ($.jStorage.get('effets_sonores') != "Non" && typeof(audio_explosion_2) != 'undefined') {
                    audio_explosion_2.play();
                }

                $("#explosion_img_effet").addClass("vertical-align-bottom");
                hacklol.shake(1510);
                $("#explosion_img").fadeOut(1510, function() {
                    $("#explosion_img_effet").removeAttr('src', '');
                });
                $("#explosion_img_effet").show().each(function() {
                    this.offsetHeight;
                }).prop("src", "assets/img/explosion2.gif");
                $("#mask_explosion").fadeOut(1510);
                setTimeout("hacklol.ui.showToolbar(); hacklol.ui.paint.showToolbar();", 1610);

                if(page_gelee == 0) {
                    $("#hacklol-iframeWrapper").fadeOut(1000);
                    $("#click-explosion-stop").show();
                    $("#click-explosion").hide();
                    $("#disparition_page").hide();
                    $("#re_apparition_page").show();
                } else if(page_gelee == 1) {
                    page_gelee = 0;
                    if ($.jStorage.get('effets_sonores') != "Non" && typeof(audio_gel) != 'undefined') {
                        audio_gel.play();
                    }

                    $("#gel_img").fadeOut(1300);
                    $("#click-gel").show();
                    $("#click-gel-infos-d").hide();
                }
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
        var easterEggKeywords = ["MLP", "MY LITTLE PONY", "ALL YOUR BASE ARE BELONG TO US", "AYBABTU", "TROLL", "TROLO", "TROL", "OUAIS", "OUI", "YES", "AH", "NON", "NAN", "NO", "JOHN", "CENA", "ISSOU", "SOUFFRIR", "JSPVIPS", "HENDEK"];
        var easterEggImg = ["mlp_egg.png", "mlp_egg.png", "aybabtu.png", "aybabtu.png", "trollface.png", "trollface.png", "trollface.png", "ouais.png", "ouais.png", "ouais.png", "ah.gif", "non.gif", "non.gif", "non.gif", "isname.jpg", "isname.jpg", "issou.jpg", "jspvips.gif", "jspvips.gif", "hendek.jpg"];
        var easterEggWidth = ["300", "300", "336", "336", "336", "336", "336", "150", "150", "150", "", "", "", "", "", "", "", "", "", ""];
        var easterEggHeight = ["300", "300", "224", "224", "224", "224", "224", "214", "214", "214", "", "", "", "", "", "", "", "", "", ""];
        var easterEggName = ["mlp", "mlp", "aybabtu", "aybabtu", "troll", "troll", "troll", "ouais", "ouais", "ouais", "ah", "non", "non", "non", "isname", "isname", "issou", "jspvips", "jspvips", "hendek"];
        var easterEggSound = ["mlp.mp3", "mlp.mp3", "aybabtu.mp3", "aybabtu.mp3", "trololo.mp3", "trololo.mp3", "trololo.mp3", "ouais.mp3", "ouais.mp3", "ouais.mp3", "ah.mp3", "non.mp3", "non.mp3", "non.mp3", "isname.mp3", "isname.mp3", "issou.mp3", "jspvips.mp3", "jspvips.mp3", "hendek.mp3"];
        var easterEggText = [null, null, null, null, null, null, null, null, null, null, i18next.t('egg.ah'), null, null, null, null, null, null, null, null, null];
        var easterEggFound = new Array();
        var numberEasterEgg = hacklol.cleanArray(easterEggName).length;

        if(type == "deface") {
            var couleur_deface_arriere = $("#colorpicker3").attr("value");
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

            for (var i=0; i < easterEggKeywords.length; i++) {
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
                            $("#p_egg").html($("#p_egg").html() + "<br /><img src='assets/img/" + easterEggImg[i] + "' alt='"+ easterEggKeywords[i].toLowerCase() +"' id='"+ easterEggKeywords[i].toLowerCase() +"' width='"+ easterEggWidth[i] +"' height='"+ easterEggHeight[i] +"' class=\'img-resize\' onclick='hacklol.ui.replayEgg(this.src, this.id, \""+ easterEggSound[i] +"\");' style='cursor: pointer;' /><br />" + i18next.t('egg.found1'));
                        } else if(easterEggText[i] == null) {
                            $("#p_egg").html($("#p_egg").html() + "<br /><img src='assets/img/" + easterEggImg[i] + "' alt='"+ easterEggKeywords[i].toLowerCase() +"' id='"+ easterEggKeywords[i].toLowerCase() +"'  width='"+ easterEggWidth[i] +"' height='"+ easterEggHeight[i] +"' class=\'img-resize\' /><br />" + i18next.t('egg.found1') + " " + i18next.t('egg.notaudio'));
                        } else if(easterEggText[i] != null && $.jStorage.get('effets_sonores') != "Non") {
                            $("#p_egg").html($("#p_egg").html() + "<br /><img src='assets/img/" + easterEggImg[i] + "' alt='"+ easterEggKeywords[i].toLowerCase() +"' id='"+ easterEggKeywords[i].toLowerCase() +"'  width='"+ easterEggWidth[i] +"' height='"+ easterEggHeight[i] +"' class=\'img-resize\' onclick='hacklol.ui.replayEgg(this.src, this.id, \""+ easterEggSound[i] +"\");' style='cursor: pointer;' /><br />" + easterEggText[i]);
                        } else {
                            $("#p_egg").html($("#p_egg").html() + "<br /><img src='assets/img/" + easterEggImg[i] + "' alt='"+ easterEggKeywords[i].toLowerCase() +"' id='"+ easterEggKeywords[i].toLowerCase() +"'  width='"+ easterEggWidth[i] +"' height='"+ easterEggHeight[i] +"' class=\'img-resize\' /><br />" + easterEggText[i] + " " + i18next.t('egg.notaudio'));
                        }
                    }
                }
            }

            var easterEggFound = hacklol.cleanArray(easterEggFound);
            easterEggFound_global = hacklol.cleanArray(easterEggFound_global);
            var countEasterEgg = easterEggFound_global.length;

            for (var i=0; i < easterEggFound.length; i++) {
                if ($.jStorage.get('effets_sonores') != "Non") {
                    window["audio_" + easterEggFound[i]].play();
                }
            }

            $("#easter_egg_count").css("color", "green");

            if(countEasterEgg < numberEasterEgg && countEasterEgg > 0) {
                var nombre_a_trouve = numberEasterEgg - countEasterEgg;
                if(countEasterEgg > 1) {
                    $("#easter_egg_count").text(i18next.t('egg.found') + " " + countEasterEgg + " " + i18next.t('egg.easter-eggs') + ". " + i18next.t('egg.remaining') + " "+ nombre_a_trouve + " " + i18next.t('egg.tofind'));
                } else {
                    $("#easter_egg_count").text(i18next.t('egg.found') + " " + countEasterEgg + " " + i18next.t('egg.easter-egg') + ". " + i18next.t('egg.remaining') + " "+ nombre_a_trouve + " " + i18next.t('egg.tofind'));
                }

                if(cheatEasterEgg == true) {
                    if(countEasterEgg > 1) {
                        $("#easter_egg_count").text(i18next.t('egg.foundcheat') + " " + countEasterEgg + " " + i18next.t('egg.easter-eggs') + " " + i18next.t('egg.cheated') + ". " + i18next.t('egg.cheatbad') + " " + i18next.t('egg.remaining') + " "+ nombre_a_trouve + " " + i18next.t('egg.tofind'));
                    } else {
                        $("#easter_egg_count").text(i18next.t('egg.foundcheat') + " " + countEasterEgg + " " + i18next.t('egg.easter-egg') + " " + i18next.t('egg.cheated') + ". " + i18next.t('egg.cheatbad') + " " + i18next.t('egg.remaining') + " "+ nombre_a_trouve + " " + i18next.t('egg.tofind'));
                    }
                    $("#easter_egg_count").css("color", "red");
                }
            } else if(countEasterEgg == numberEasterEgg) {
                $("#easter_egg_count").text(i18next.t('egg.foundall'));

                if(cheatEasterEgg == true) {
                    $("#easter_egg_count").text(i18next.t('egg.foundallcheat'));
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
                        $("#easter_egg_count").text(i18next.t('egg.found') + " " + countEasterEgg + " " + i18next.t('egg.easter-eggs') + ". " + i18next.t('egg.remaining') + " "+ nombre_a_trouve + " " + i18next.t('egg.tofind'));
                    } else {
                        $("#easter_egg_count").text(i18next.t('egg.found') + " " + countEasterEgg + " " + i18next.t('egg.easter-egg') + ". " + i18next.t('egg.remaining') + " "+ nombre_a_trouve + " " + i18next.t('egg.tofind'));
                    }

                    if($.jStorage.get('easter_egg_deface_cheated') !== null && $.jStorage.get('easter_egg_deface_cheated') == "Oui") {
                        cheatEasterEgg = true;
                        if(countEasterEgg > 1) {
                            $("#easter_egg_count").text(i18next.t('egg.foundcheat') + " " + countEasterEgg + " " + i18next.t('egg.easter-eggs') + " " + i18next.t('egg.cheated') + ". " + i18next.t('egg.cheatbad') + " " + i18next.t('egg.remaining') + " "+ nombre_a_trouve + " " + i18next.t('egg.tofind'));
                        } else {
                            $("#easter_egg_count").text(i18next.t('egg.foundcheat') + " " + countEasterEgg + " " + i18next.t('egg.easter-egg') + " " + i18next.t('egg.cheated') + ". " + i18next.t('egg.cheatbad') + " " + i18next.t('egg.remaining') + " "+ nombre_a_trouve + " " + i18next.t('egg.tofind'));
                        }
                        $("#easter_egg_count").css("color", "red");
                        return;
                    }
                } else if(countEasterEgg == numberEasterEgg) {
                    $("#easter_egg_count").text(i18next.t('egg.foundall'));

                    if($.jStorage.get('easter_egg_deface_cheated') !== null && $.jStorage.get('easter_egg_deface_cheated') == "Oui") {
                        cheatEasterEgg = true;
                        $("#easter_egg_count").text(i18next.t('egg.foundallcheat'));
                        $("#easter_egg_count").css("color", "red");
                        return;
                    }
                }
            }
        } else if(type == "indice") {
            var numIndice = hacklol.random(1, numberEasterEgg);

            if(confirm(i18next.t('egg.indice.' + numIndice) + "\n\n" + i18next.t('egg.indice.newIndice'))) {
                hacklol.tools.deface("indice");
            }

            return true;
        } else if(type == "cheat") {
            if(cheatEasterEgg == true) {
                alert(i18next.t('egg.cheatalready'));
                return;
            }
            if(confirm(i18next.t('egg.cheatconfirm1')) && confirm(i18next.t('egg.cheatconfirm2'))) {
                alert(i18next.t('egg.cheatok'));
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
            alert(i18next.t('matrix.error'));
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
            $('#affichagebarre').prop('checked', false);
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
        if(hacklol.disablePageLoaderByDefault == true && parametre_hacklol_pl !== "Oui") {
            $('#hacklol_page_loader_check').prop('checked', false);
        } else if (parametre_hacklol_pl == "Oui") {
            $('#hacklol_page_loader_check').prop('checked', true);
        } else if (parametre_hacklol_pl == "Non") {
            $('#hacklol_page_loader_check').prop('checked', false);
        } else {
            $('#hacklol_page_loader_check').prop('checked', true);
        }

        if(hacklol.disablePageLoaderByDefault == true) {
            $("#hacklolPageLoaderDisabledByDefault").show();
        }
        // couleur barre
        var parametre_couleur_barre = $.jStorage.get('couleur_barre');
        var couleur_barre_set = "Defaut";

        if(parametre_couleur_barre !== null && parametre_couleur_barre.charAt(0) == "#") {
            $("#choixcouleur").show();
            var couleur_barre_set = "Personnalisation";
            $("#colorpicker1").colpickSetColor(parametre_couleur_barre);
            $('#colorpicker1').attr("value", parametre_couleur_barre.substr(1));
            $('#colorpicker1').css("background-color", parametre_couleur_barre.substr(1));
        } else {
            $("#choixcouleur").hide();

            if(parametre_couleur_barre !== null) {
                var colorName = ["Defaut", "Bleu", "Rouge", "Vert", "Jaune", "Orange", "Rose", "Violet", "Brun", "Noir", "Blanc"];

                for (var i=0; i < colorName.length; i++) {
                    if(colorName[i] == parametre_couleur_barre) {
                        var couleur_barre_set = colorName[i];
                    }
                }
            }
        }

        $('#couleurBarreSelect option[value="'+ couleur_barre_set +'"]').prop('selected', true);

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
            var couleur_barre_set = "Defaut";

            if(couleur_barre_selected == "Personnalisation") {
                var couleur_barre_set = "#" + $("#colorpicker1").attr("value").substr(0, 6);
            } else {
                var couleur_barre_set = couleur_barre_selected;
            }

            $.jStorage.set('couleur_barre', couleur_barre_set);

            // language
            changeLng($("#languageSelect").val());
            hacklol.checkVersion();
            // fin
            if ($.jStorage.storageAvailable()) { // si le LocalStorage est disponible
                alert(i18next.t('settings.saved'));
                hacklol.settings.exe();
                hacklol.ui.closeWindow();
                hacklol.tools.edit("stop");
                return true;
            } else {
                alert(i18next.t('settings.error'));
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
                $("#indication_error").text(i18next.t('settings.errormp3'));
            }
        } else {
            $('#effets_sonores').prop('checked', false);
            $('#effets_sonores').prop('checked', false);
            $("#effets_sonores").attr("disabled", "disabled");
            $("#indication_error").text(i18next.t('settings.erroraudio'));
        }
        // hacklol page loader
        var parametre_hacklol_pl = $.jStorage.get('hacklol_page_loader');
        if(hacklol.disablePageLoaderByDefault == true && pageChargeeFirst == 1 && parametre_hacklol_pl !== "Oui") {
            hacklol.loadPage(hacklol.urlPage, false);
            pageChargeeHPL = 0;
            pageChargeeFirst = 0;
        }
        else if(hacklol.disablePageLoaderByDefault == true && pageChargeeHPL != 0 && parametre_hacklol_pl !== "Oui") {
            hacklol.loadPage(hacklol.urlPage, false);
            pageChargeeHPL = 0;
            pageChargeeFirst = 0;
        }
        else if (parametre_hacklol_pl == "Non" && pageChargeeFirst == 1) {
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
        var couleur_barre_set = "#bdc3c7";
        $("#choixcouleur").hide();

        if(parametre_couleur_barre !== null && parametre_couleur_barre.charAt(0) == "#") {
            var couleur_barre_set = parametre_couleur_barre;
            $('#colorpicker1').attr("value", parametre_couleur_barre.substr(1)); // affiche le code couleur dans le input avec le # supprimé
            $("#colorpicker1").css("background-color", parametre_couleur_barre); // change la couleur du input
            $("#choixcouleur").show(); // affiche le choix de couleur
            $("#colorpicker1").colpickSetColor(parametre_couleur_barre);
        } else {
            if(parametre_couleur_barre !== null) {
                var colorName = ["Defaut", "Bleu", "Rouge", "Vert", "Jaune", "Orange", "Rose", "Violet", "Brun", "Noir", "Blanc"];
                var colorCode = ["#bdc3c7", "#3498db", "#e74c3c", "#2ecc71", "#f1c40f", "#e88834", "#f472d0", "#9b59b6", "#825a2c", "black", "white"];

                for (var i=0; i < colorName.length; i++) {
                    if(colorName[i] == parametre_couleur_barre) {
                        var couleur_barre_set = colorCode[i];
                    }
                }
            }
        }

        $("#toolbar-hacklol").css("background-color", couleur_barre_set);
        $("#paint-tools").css("background-color", couleur_barre_set);
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
        $("#colorpicker1").attr("value", "");
        $("#colorpicker1").css("background-color", "#ffffff");
        $("#colorpicker1").colpickSetColor("#ffffff");
        easterEggFound_global = new Array();
        cheatEasterEgg = false;
        $("#easter_egg_count").css("color", "green");
        $("#easter_egg_count").text("");
        $("#titre_deface_input").val("");
        $("#editeur_deface").val("");
        alert(i18next.t('settings.reseted'));
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
        $("#lienMenuMobile").html("<span class=\"icon icon_menu\"></span> " + i18next.t('toolbar.menu'));
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
    elementsWithBlur: ["#toolbar-hacklol", "#hacklol-iframe", "#btn-show-toolbar-paint", "#btn-show-toolbar", "#paint-tools", "#canvas", "#deface_div", "#gel_img", ".bulleMenu", "#q", "#menuMobile", "#mask_explosion", "#explosion_img", "#genericBSOD", "#win8BSOD", "#img_start_hacklol", "#background-loading-indicator"],
    // Activation de l'effet de flou
    flou: function() {
        for(i=0; i < hacklol.ui.elementsWithBlur.length; i++) {
            $(hacklol.ui.elementsWithBlur[i]).addClass("blur-desactived");
        }
    },
    // Desactivation de l'effet de flou
    desactivFlou: function() {
        for(i=0; i < hacklol.ui.elementsWithBlur.length; i++) {
            $(hacklol.ui.elementsWithBlur[i]).removeClass("blur-desactived");
        }
    },
    audio: function() {
        // AUDIO - SI L'UTILISATEUR A ACTIVE LES EFFETS SONORES ET QUE SON NAVIGATEUR EST COMPATIBLE, ON LES CHARGE
        var audioName = ["audio", "audio_explosion_bis", "audio_explosion_2", "audio_gel", "audio_mlp", "audio_aybabtu", "audio_wt", "audio_troll", "audio_ouais", "audio_ah", "audio_non", "audio_isname", "audio_issou", "audio_jspvips", "audio_hendek"];
        var audioSrc = ["effet_explosion.mp3", "effet_explosion_bis.mp3", "effet_explosion_2.mp3", "gel.mp3", "mlp.mp3", "aybabtu.mp3", "wt_egg.mp3", "trololo.mp3", "ouais.mp3", "ah.mp3", "non.mp3", "isname.mp3", "issou.mp3", "jspvips.mp3", "hendek.mp3"];
        if (window.HTMLAudioElement && $.jStorage.get('effets_sonores') != "Non" || $.jStorage.get('effets_sonores') == null) {
            for(var i=0; i < audioName.length; i++) {
                window[audioName[i]] = document.createElement("audio");
                window[audioName[i]].src = "assets/sounds/" + audioSrc[i];
                window[audioName[i]].muted = false;
            }
        } else if(window.HTMLAudioElement) {
            for(var i=0; i < audioName.length; i++) {
                if(typeof(window[audioName[i]]) != 'undefined') {
                    window[audioName[i]].muted = true;
                }
            }
            // audio played easter egg deface tool (see below)
            if(typeof(audio_tmp) != 'undefined') {
                audio_tmp.muted = true;
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
        if (menuLienLib == 1) {
            $("#menuMobile").stop().slideDown("slow");
            $("#lienMenuMobile").html("<span class=\"icon icon_fermer\"></span> " + i18next.t('toolbar.menuclose'));
            menuLienLib = 2;
        } else {
            $("#menuMobile").stop().slideUp("slow");
            $("#lienMenuMobile").html("<span class=\"icon icon_menu\"></span> " + i18next.t('toolbar.menu'));
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
    setTimeout(function() { hacklol.loadImages() }, 500);
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
        if(confirm(i18next.t('settings.resetconfirm'))) {
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
        cursor: 'mfp-ajax-cur',
        tError: '<a href="%url%" target="_blank">Le contenu</a> n\'a pas pu être chargé correctement.<br /><a href="%url%" target="_blank">The content</a> could not be loaded.',
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
        hacklol.changeSite();
    });
    // appui bouton entrer changer de site
    $('#urlChangeSite').keypress(function(e){
        if(e.which == 13) {
            hacklol.changeSite();
        }
    });
    $("#urlChangeSite").val(hacklol.urlPage);
    // Defacer site
    // Color picker
    $('#colorpicker3').colpick({
        layout:'hex',
        submit:0,
        color: 'FE4A4A',
        colorScheme:'dark',
        onChange:function(hsb,hex,rgb,el,bySetColor) {
            $("#colorpicker3").css("background-color", "#"+hex);
            $("#colorpicker3").attr("value", hex);
        }
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
        layout:'hex',
        submit:0,
        color: 'ffffff',
        colorScheme:'dark',
        onChange:function(hsb,hex,rgb,el,bySetColor) {
            $("#colorpicker1").css("background-color", "#"+hex);
            $("#colorpicker1").attr("value", hex);
        }
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
