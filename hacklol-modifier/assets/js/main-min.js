function optionsCheck(){hacklol.settings.check()}function modifier_page_tool(){hacklol.tools.edit("edit")}function modifier_page_tool_arret(){hacklol.tools.edit("stop")}page_gelee=0,menuLienLib=1,pageChargeeHPL=0,pageChargeeFirst=1,errorDisabled=!1,paintEnabled=!1,countEasterEgg=0;var easterEggFound_global=new Array,cheatEasterEgg=!1,errorLoadingImages=!1,errorLoadingAudio=!1;loadInBackground=!1,loadedAudioAlreadyCounted=!1,String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")});var hacklol={appName:"Hacklol Modifier",hacklolPageLoaderName:"Hacklol Page Loader",disablePageLoaderByDefault:!1,description:null,version:"1.4.1",dateVersion:"23/10/2017",lang:function(){return void 0!==i18next.language&&i18next.language.substr(0,2)},asciiArt:" _____         _   _     _ \n|  |  |___ ___| |_| |___| |\n|     | .'|  _| '_| | . | |\n|__|__|__,|___|_,_|_|___|_|",tools:10,settings:"Settings Method",ui:"User Interface Method",urlPage:urlPage_global,console:function(){console.log(hacklol.asciiArt+"\n"+i18next.t("console"))},rgb2hex:function(e){function o(e){return("0"+parseInt(e).toString(16)).slice(-2)}return/^#[0-9A-F]{6}$/i.test(e)?e:(e=e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/),o(e[1])+o(e[2])+o(e[3]))},getContrastYIQ:function(e){return(299*parseInt(e.substr(0,2),16)+587*parseInt(e.substr(2,2),16)+114*parseInt(e.substr(4,2),16))/1e3>=128?"black":"white"},checkVersion:function(){var e=hacklol.version;$("#testVersionHacklol").text(""),$.post("versionHacklol.html",{},function(o){o.trim()!=e.trim()&&$("#testVersionHacklol").html(i18next.t("outdatedversion")+" "+o.trim()+".")},"text")},random:function(e,o){return e+Math.floor(Math.random()*(o-e+1))},cleanArray:function(e){var o,t,a=e.length,l=[],i={};for(o=0;o<a;o++)i[e[o]]=0;for(t in i)l.push(t);return l},sleep:function(e){for(var o=(new Date).getTime();o+e>=(new Date).getTime(););},validateUrl:function(e){return/^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(e)},loadPage:function(e,o){if(0==o)return $("#hacklol-iframeWrapper").html(""),$("#hacklol-iframeWrapper").html('<iframe src="" id="hacklol-iframe" frameBorder="0"></iframe>'),$("#hacklol-iframe").attr("src","hacklol-iframe.php?q="+encodeURIComponent(e)),!0;var t="page_loader/index.php?urlPage="+encodeURIComponent(e);return $("#hacklol-iframeWrapper").html(""),$("#hacklol-iframeWrapper").html('<iframe src="" id="hacklol-iframe" frameBorder="0"></iframe>'),$("#hacklol-iframe").attr("src","hacklol-iframe.php?q="+t),!0},reloadPage:function(){var e=$.jStorage.get("hacklol_page_loader");return hacklol.tools.edit("stop"),"Non"==e?hacklol.loadPage(hacklol.urlPage,!1):hacklol.loadPage(hacklol.urlPage,!0),!0},creerOutil:function(e,o,t,a,l){var i=document.createElement("a");return null!==o&&i.setAttribute("onclick",o),i.setAttribute("class","btn"),1==t&&i.setAttribute("class",i.getAttribute("class")+" popup-modal-dismiss"),null!==a&&i.setAttribute("id",a),null!==l&&i.setAttribute("style",l),i.innerHTML=e,document.getElementById("toolbox-popup").appendChild(i),hacklol.tools++,!0},blinkFontBSOD:function(){document.getElementById("blink").style.color="#00A",setTimeout("hacklol.setblinkFontBSOD()",800)},setblinkFontBSOD:function(){document.getElementById("blink").style.color="",setTimeout("hacklol.blinkFontBSOD()",800)},shake:function(e){return $("body").addClass("shake").addClass("shake-constant"),setTimeout(function(){$("body").removeClass("shake").removeClass("shake-constant")},e),!0},loadImages:function(){for(var e=0,o=["assets/img/select-arrow.png","assets/img/explosion.gif","assets/img/explosion2.gif","assets/img/gel.png","assets/img/points.png","assets/img/sadface.png","assets/img/mlp_egg.png","assets/img/aybabtu.png","assets/img/trollface.png","assets/img/check.png","assets/img/ouais.png","assets/img/ah.gif","assets/img/non.gif","assets/img/isname.jpg","assets/img/issou.jpg","assets/img/jspvips.gif","assets/img/hendek.jpg"],t=[],a=0;a<o.length;a++){var l=new Image;l.src=o[a],l.onload=function(){e++;var t=Math.round(100*e/o.length);$("#progressLoading").css("width",t+"%"),$("#loadingInfos").text(i18next.t("load.graphics")),$("#backgroundLoadingInfos").text(i18next.t("load.graphics")),$("#pourcentageLoadingInfos").text(t+"%"),$("#backgroundPourcentageLoadingInfos").text(t+"%"),e>=o.length&&hacklol.loadAudio()},l.onerror=function(){errorLoadingImages=!0,e++,$("#loadingInfos").css("color","red");var t=Math.round(100*e/o.length);$("#progressLoading").css("width",t+"%"),$("#loadingInfos").text(i18next.t("load.graphics")),$("#backgroundLoadingInfos").text(i18next.t("load.graphics")),$("#pourcentageLoadingInfos").text(t+"%"),$("#backgroundPourcentageLoadingInfos").text(t+"%"),e>=o.length&&hacklol.loadAudio()},t.push(l)}return!0},loadAudio:function(){if($("#loadingInfos").css("color",""),$("#backgroundLoadingInfos").css("color",""),$("#progressLoading").css("width","0%"),window.HTMLAudioElement){var e=document.createElement("audio"),o=["effet_explosion.mp3","effet_explosion_bis.mp3","effet_explosion_2.mp3","gel.mp3","mlp.mp3","aybabtu.mp3","wt_egg.mp3","trololo.mp3","ah.mp3","ouais.mp3","non.mp3","isname.mp3","issou.mp3","jspvips.mp3","hendek.mp3"];if(e.canPlayType&&e.canPlayType("audio/mpeg")){$("#loadingInfos").text(i18next.t("load.audio")),$("#backgroundLoadingInfos").text(i18next.t("load.audio")),$("#pourcentageLoadingInfos").text("0%"),$("#backgroundPourcentageLoadingInfos").text("0%");for(var t=0,a=[],l=function(){if(-1==$.inArray(this.src,a)){t++,clearTimeout(e);var e=setTimeout(function(){!0!==loadInBackground&&(hacklol.completeLoading(),$("#background-loading-indicator").fadeIn(),loadInBackground=!0),clearTimeout(e)},5e3),l=Math.round(100*t/o.length);$("#progressLoading").css("width",l+"%"),$("#loadingInfos").text(i18next.t("load.audio")),$("#backgroundLoadingInfos").text(i18next.t("load.audio")),$("#pourcentageLoadingInfos").text(l+"%"),$("#backgroundPourcentageLoadingInfos").text(l+"%"),t>=o.length&&(clearTimeout(e),hacklol.completeLoading(),$("#wrapper-background-loading-indicator").fadeOut()),a.push(this.src)}},i=setTimeout(function(){!0!==loadInBackground&&(hacklol.completeLoading(),$("#background-loading-indicator").fadeIn(),loadInBackground=!0),clearTimeout(i)},5e3),n=0;n<o.length;n++)!function(){var e=new Audio;e.src="assets/sounds/"+o[n],e.preload="auto",e.oncanplaythrough=function(){if(-1==$.inArray(this.src,a)){t++,clearTimeout(e);var e=setTimeout(function(){!0!==loadInBackground&&(hacklol.completeLoading(),$("#background-loading-indicator").fadeIn(),loadInBackground=!0),clearTimeout(e)},5e3),l=Math.round(100*t/o.length);$("#progressLoading").css("width",l+"%"),$("#loadingInfos").text(i18next.t("load.audio")),$("#backgroundLoadingInfos").text(i18next.t("load.audio")),$("#pourcentageLoadingInfos").text(l+"%"),$("#backgroundPourcentageLoadingInfos").text(l+"%"),t>=o.length&&(clearTimeout(e),hacklol.completeLoading(),$("#wrapper-background-loading-indicator").fadeOut()),a.push(this.src)}},e.onerror=l,e.onsuspend=l,e.onabort=l}()}else hacklol.completeLoading()}else hacklol.completeLoading()},completeLoading:function(){!0!==loadInBackground&&(hacklol.settings.exe(),$("#chargement").fadeOut("slow"),$("#mask_chargement").fadeOut("slow"),hacklol.blinkFontBSOD()),$("#background-loading-indicator").fadeOut()}};hacklol.console(),hacklol.checkVersion(),document.title=hacklol.appName,hacklol.tools={edit:function(e){var o=$.jStorage.get("hacklol_page_loader");if("edit"==e){if("Non"==o&&confirm(i18next.t("edit.confirm")+" "+hacklol.hacklolPageLoaderName+" "+i18next.t("edit.confirm2")))try{document.body.contentEditable=!0,$("#arret_modif_page").show(),$("#modif_page").hide(),hacklol.ui.closeToolbar(),hacklol.tools.paint("stop")}catch(e){alert(i18next.t("edit.error"))}else if("Non"!=o)try{document.getElementById("hacklol-iframe").contentEditable=!0,document.getElementById("hacklol-iframe").contentWindow.document.body.contentEditable=!0,document.getElementById("hacklol-iframe").contentWindow.document.getElementById("hacklol-iframe-protected").contentEditable=!0,document.getElementById("hacklol-iframe").contentWindow.document.getElementById("hacklol-iframe-protected").contentWindow.document.body.contentEditable=!0,$("#arret_modif_page").show(),$("#modif_page").hide(),hacklol.ui.closeToolbar(),hacklol.tools.paint("stop")}catch(e){alert(i18next.t("edit.error"))}}else if("stop"==e)if("Non"==o)try{document.body.contentEditable=!1,$("#arret_modif_page").hide(),$("#modif_page").show()}catch(e){}else try{document.getElementById("hacklol-iframe").contentEditable=!1,document.getElementById("hacklol-iframe").contentWindow.document.body.contentEditable=!1,document.getElementById("hacklol-iframe").contentWindow.document.getElementById("hacklol-iframe-protected").contentEditable=!1,document.getElementById("hacklol-iframe").contentWindow.document.getElementById("hacklol-iframe-protected").contentWindow.document.body.contentEditable=!1,$("#arret_modif_page").hide(),$("#modif_page").show()}catch(e){}},hidePage:function(e){"hide"==e?($("#hacklol-iframeWrapper").fadeOut("slow","linear"),$("#disparition_page").hide(),$("#re_apparition_page").show(),$("#click-explosion-stop").show(),$("#click-explosion").hide()):"show"==e&&($("#hacklol-iframeWrapper").fadeIn("slow","linear"),$("#disparition_page").show(),$("#re_apparition_page").hide(),$("#click-explosion-stop").hide(),$("#click-explosion").show())},paint:function(e){"paint"==e?(hacklol.ui.closeToolbar(),$("#paint-tools").slideDown("slow"),$("#wrapper").show(),$("#click-paint").hide(),$("#click-paint-stop").show(),paintEnabled=!0):"stop"==e&&($("#paint-tools").hide(),$("#wrapper").hide(),$("#click-paint").show(),$("#click-paint-stop").hide(),$("#mask_opbb").hide(),$("#btn-show-toolbar-paint").hide(),$("#bulleCouleur").hide(),$("#bulleBrush").hide(),paintEnabled=!1)},explode:function(e){if("explode"==e){"Non"!=$.jStorage.get("effets_sonores")&&5==hacklol.random(1,10)&&"undefined"!=typeof audio_wt&&audio_wt.play(),hacklol.ui.closeToolbar(),hacklol.ui.paint.closeToolbar();var o=hacklol.random(1,2),t=hacklol.random(1,2);$("#explosion_img_effet").attr("src",""),$("#explosion_img_effet").removeAttr("src",""),$("#explosion_img_effet").removeClass("vertical-align-bottom"),$("#explosion_img").fadeIn(),$("#mask_explosion").fadeIn(),1==o?("Non"!=$.jStorage.get("effets_sonores")&&"undefined"!=typeof audio&&1==t?audio.play():"Non"!=$.jStorage.get("effets_sonores")&&"undefined"!=typeof audio_explosion_bis&&2==t&&audio_explosion_bis.play(),hacklol.shake(3e3),$("#explosion_img").fadeOut(3e3,function(){$("#explosion_img_effet").removeAttr("src","")}),$("#explosion_img_effet").show().each(function(){this.offsetHeight}).prop("src","assets/img/explosion.gif"),$("#mask_explosion").fadeOut(3e3),setTimeout("hacklol.ui.showToolbar(); hacklol.ui.paint.showToolbar();",3100),0==page_gelee?($("#hacklol-iframeWrapper").fadeOut(2e3),$("#click-explosion-stop").show(),$("#click-explosion").hide(),$("#disparition_page").hide(),$("#re_apparition_page").show()):1==page_gelee&&(page_gelee=0,"Non"!=$.jStorage.get("effets_sonores")&&"undefined"!=typeof audio_gel&&audio_gel.play(),$("#gel_img").fadeOut(2e3),$("#click-gel").show(),$("#click-gel-infos-d").hide())):2==o&&("Non"!=$.jStorage.get("effets_sonores")&&"undefined"!=typeof audio_explosion_2&&audio_explosion_2.play(),$("#explosion_img_effet").addClass("vertical-align-bottom"),hacklol.shake(1510),$("#explosion_img").fadeOut(1510,function(){$("#explosion_img_effet").removeAttr("src","")}),$("#explosion_img_effet").show().each(function(){this.offsetHeight}).prop("src","assets/img/explosion2.gif"),$("#mask_explosion").fadeOut(1510),setTimeout("hacklol.ui.showToolbar(); hacklol.ui.paint.showToolbar();",1610),0==page_gelee?($("#hacklol-iframeWrapper").fadeOut(1e3),$("#click-explosion-stop").show(),$("#click-explosion").hide(),$("#disparition_page").hide(),$("#re_apparition_page").show()):1==page_gelee&&(page_gelee=0,"Non"!=$.jStorage.get("effets_sonores")&&"undefined"!=typeof audio_gel&&audio_gel.play(),$("#gel_img").fadeOut(1300),$("#click-gel").show(),$("#click-gel-infos-d").hide()))}else"stop"==e&&($("#hacklol-iframeWrapper").fadeIn(),$("#click-explosion-stop").hide(),$("#click-explosion").show(),$("#disparition_page").show(),$("#re_apparition_page").hide())},freeze:function(){page_gelee=1,$("#gel_img").fadeIn(1e3),$("#click-gel").hide(),$("#click-gel-infos-d").show()},deface:function(e){var o=["MLP","MY LITTLE PONY","ALL YOUR BASE ARE BELONG TO US","AYBABTU","TROLL","TROLO","TROL","OUAIS","OUI","AH","NON","NAN","NO","JOHN","CENA","ISSOU","SOUFFRIR","JSPVIPS","HENDEK"],t=["mlp_egg.png","mlp_egg.png","aybabtu.png","aybabtu.png","trollface.png","trollface.png","trollface.png","ouais.png","ouais.png","ah.gif","non.gif","non.gif","non.gif","isname.jpg","isname.jpg","issou.jpg","jspvips.gif","jspvips.gif","hendek.jpg"],a=["300","300","336","336","336","336","336","150","150","","","","","","","","","",""],l=["300","300","224","224","224","224","224","214","214","","","","","","","","","",""],i=["mlp","mlp","aybabtu","aybabtu","troll","troll","troll","ouais","ouais","ah","non","non","non","isname","isname","issou","jspvips","jspvips","hendek"],n=["mlp.mp3","mlp.mp3","aybabtu.mp3","aybabtu.mp3","trololo.mp3","trololo.mp3","trololo.mp3","ouais.mp3","ouais.mp3","ah.mp3","non.mp3","non.mp3","non.mp3","isname.mp3","isname.mp3","issou.mp3","jspvips.mp3","jspvips.mp3","hendek.mp3"],r=[null,null,null,null,null,null,null,null,null,i18next.t("egg.ah"),null,null,null,null,null,null,null,null,null],c=new Array,s=hacklol.cleanArray(i).length;if("deface"==e){var d=$("#colorpicker3").attr("value"),g=hacklol.getContrastYIQ(d);$("#deface_div").css("background-color","#"+d),$("#deface_div").css("color",g),$("#deface_div").show(),$("#p_egg").text(""),$("#defacer_site_reafficher").show(),""==$("#titre_deface_input").val().trim()?$("#titre_deface").text("–"):$("#titre_deface").text($("#titre_deface_input").val()),""==$("#editeur_deface").val().trim()?$("#texte_deface").text("–"):$("#texte_deface").text($("#editeur_deface").val());for(f=0;f<o.length;f++)if(-1!=$("#titre_deface_input").val().toUpperCase().indexOf(o[f])||-1!=$("#editeur_deface").val().toUpperCase().indexOf(o[f])){var u=!1,p=f;if(-1!=c.indexOf(i[p]))u=!0;c.push(i[p]),easterEggFound_global.push(i[p]),1!=u&&(null==r[f]&&"Non"!=$.jStorage.get("effets_sonores")?$("#p_egg").html($("#p_egg").html()+"<br /><img src='assets/img/"+t[f]+"' alt='"+o[f].toLowerCase()+"' id='"+o[f].toLowerCase()+"' width='"+a[f]+"' height='"+l[f]+"' class='img-resize' onclick='hacklol.ui.replayEgg(this.src, this.id, \""+n[f]+"\");' style='cursor: pointer;' /><br />"+i18next.t("egg.found1")):null==r[f]?$("#p_egg").html($("#p_egg").html()+"<br /><img src='assets/img/"+t[f]+"' alt='"+o[f].toLowerCase()+"' id='"+o[f].toLowerCase()+"'  width='"+a[f]+"' height='"+l[f]+"' class='img-resize' /><br />"+i18next.t("egg.found1")+" "+i18next.t("egg.notaudio")):null!=r[f]&&"Non"!=$.jStorage.get("effets_sonores")?$("#p_egg").html($("#p_egg").html()+"<br /><img src='assets/img/"+t[f]+"' alt='"+o[f].toLowerCase()+"' id='"+o[f].toLowerCase()+"'  width='"+a[f]+"' height='"+l[f]+"' class='img-resize' onclick='hacklol.ui.replayEgg(this.src, this.id, \""+n[f]+"\");' style='cursor: pointer;' /><br />"+r[f]):$("#p_egg").html($("#p_egg").html()+"<br /><img src='assets/img/"+t[f]+"' alt='"+o[f].toLowerCase()+"' id='"+o[f].toLowerCase()+"'  width='"+a[f]+"' height='"+l[f]+"' class='img-resize' /><br />"+r[f]+" "+i18next.t("egg.notaudio")))}for(var c=hacklol.cleanArray(c),h=(easterEggFound_global=hacklol.cleanArray(easterEggFound_global)).length,f=0;f<c.length;f++)"Non"!=$.jStorage.get("effets_sonores")&&window["audio_"+c[f]].play();if($("#easter_egg_count").css("color","green"),h<s&&h>0){k=s-h;h>1?$("#easter_egg_count").text(i18next.t("egg.found")+" "+h+" "+i18next.t("egg.easter-eggs")+". "+i18next.t("egg.remaining")+" "+k+" "+i18next.t("egg.tofind")):$("#easter_egg_count").text(i18next.t("egg.found")+" "+h+" "+i18next.t("egg.easter-egg")+". "+i18next.t("egg.remaining")+" "+k+" "+i18next.t("egg.tofind")),1==cheatEasterEgg&&(h>1?$("#easter_egg_count").text(i18next.t("egg.foundcheat")+" "+h+" "+i18next.t("egg.easter-eggs")+" "+i18next.t("egg.cheated")+". "+i18next.t("egg.cheatbad")+" "+i18next.t("egg.remaining")+" "+k+" "+i18next.t("egg.tofind")):$("#easter_egg_count").text(i18next.t("egg.foundcheat")+" "+h+" "+i18next.t("egg.easter-egg")+" "+i18next.t("egg.cheated")+". "+i18next.t("egg.cheatbad")+" "+i18next.t("egg.remaining")+" "+k+" "+i18next.t("egg.tofind")),$("#easter_egg_count").css("color","red"))}else h==s&&($("#easter_egg_count").text(i18next.t("egg.foundall")),1==cheatEasterEgg&&($("#easter_egg_count").text(i18next.t("egg.foundallcheat")),$("#easter_egg_count").css("color","red")));$.jStorage.set("easter_egg_deface_found",easterEggFound_global)}else if("check"==e){if($("#numberEasterEgg").text(s),null!==$.jStorage.get("easter_egg_deface_found"))if((h=(easterEggFound_global=$.jStorage.get("easter_egg_deface_found")).length)<s&&h>0){var k=s-h;if(h>1?$("#easter_egg_count").text(i18next.t("egg.found")+" "+h+" "+i18next.t("egg.easter-eggs")+". "+i18next.t("egg.remaining")+" "+k+" "+i18next.t("egg.tofind")):$("#easter_egg_count").text(i18next.t("egg.found")+" "+h+" "+i18next.t("egg.easter-egg")+". "+i18next.t("egg.remaining")+" "+k+" "+i18next.t("egg.tofind")),null!==$.jStorage.get("easter_egg_deface_cheated")&&"Oui"==$.jStorage.get("easter_egg_deface_cheated"))return cheatEasterEgg=!0,h>1?$("#easter_egg_count").text(i18next.t("egg.foundcheat")+" "+h+" "+i18next.t("egg.easter-eggs")+" "+i18next.t("egg.cheated")+". "+i18next.t("egg.cheatbad")+" "+i18next.t("egg.remaining")+" "+k+" "+i18next.t("egg.tofind")):$("#easter_egg_count").text(i18next.t("egg.foundcheat")+" "+h+" "+i18next.t("egg.easter-egg")+" "+i18next.t("egg.cheated")+". "+i18next.t("egg.cheatbad")+" "+i18next.t("egg.remaining")+" "+k+" "+i18next.t("egg.tofind")),void $("#easter_egg_count").css("color","red")}else if(h==s&&($("#easter_egg_count").text(i18next.t("egg.foundall")),null!==$.jStorage.get("easter_egg_deface_cheated")&&"Oui"==$.jStorage.get("easter_egg_deface_cheated")))return cheatEasterEgg=!0,$("#easter_egg_count").text(i18next.t("egg.foundallcheat")),void $("#easter_egg_count").css("color","red")}else{if("indice"==e){var m=hacklol.random(1,s);return confirm(i18next.t("egg.indice."+m)+"\n\n"+i18next.t("egg.indice.newIndice"))&&hacklol.tools.deface("indice"),!0}if("cheat"==e){if(1==cheatEasterEgg)return void alert(i18next.t("egg.cheatalready"));confirm(i18next.t("egg.cheatconfirm1"))&&confirm(i18next.t("egg.cheatconfirm2"))&&(alert(i18next.t("egg.cheatok")),$("#editeur_deface").val(o),cheatEasterEgg=!0,$.jStorage.set("easter_egg_deface_cheated","Oui"))}else"stop"==e&&($("#deface_div").hide(),$("#defacer_site_reafficher").hide())}},matrix:function(){return"Matrix Tool"},bsod:function(e){if("bsod"==e){var o=$("#bsodType option:selected").val();"WINXP"==o?($("#genericBSOD").show(),$("#win8BSOD").hide()):"WIN8"==o?($("#genericBSOD").hide(),$("#win8BSOD").show()):($("#genericBSOD").show(),$("#win8BSOD").hide()),$("#click-bsod").hide(),$("#click-bsod-stop").show()}else"stop"==e&&($("#genericBSOD").hide(),$("#win8BSOD").hide(),$("#click-bsod").show(),$("#click-bsod-stop").hide())},shake:function(e){"shake"==e?($("#hacklol-iframeWrapper").addClass("shake").addClass("shake-constant"),$("#click-secouer").hide(),$("#click-secouer-stop").show()):"stop"==e&&($("#hacklol-iframeWrapper").removeClass("shake").removeClass("shake-constant"),$("#click-secouer").show(),$("#click-secouer-stop").hide())},flou:function(e){"flou"==e?($("#hacklol-iframeWrapper").addClass("blur-desactived"),$("#click-flouter").hide(),$("#click-flouter-stop").show()):"stop"==e&&($("#hacklol-iframeWrapper").removeClass("blur-desactived"),$("#click-flouter").show(),$("#click-flouter-stop").hide())}},hacklol.tools.matrix={start:function(){window.HTMLCanvasElement&&("undefined"!=typeof Game_Interval&&clearInterval(Game_Interval),Game_Interval=setInterval(draw,33),$("#matrix-stop").show(),$("#matrix").hide(),$("#q").show());var e=hacklol.random(1,15);"Non"!=$.jStorage.get("effets_sonores")&&"undefined"!=typeof audio_aybabtu&&e>=5&&e<=10&&audio_aybabtu.play()},stop:function(){window.HTMLCanvasElement&&(clearInterval(Game_Interval),$("#matrix-stop").hide(),$("#matrix").show(),$("#q").hide())}},function(){if(window.HTMLCanvasElement){var e=window.screen,o=q.width=e.width,t=q.height=window.innerHeight,a=Array(300).join(0).split(""),l=q.getContext("2d");draw=function(){l.fillStyle="rgba(0,0,0,.05)",l.fillRect(0,0,o,t),l.fillStyle="#0F0",l.font="10pt Georgia",a.map(function(e,o){text=String.fromCharCode(100+33*Math.random()),x=10*o+10,q.getContext("2d").fillText(text,x,e),e>100+1e4*Math.random()?a[o]=0:a[o]=e+10})}}else $("#matrix-not-compatible").show(),$("#matrix").hide(),$("#matrix-not-compatible").click(function(){alert(i18next.t("matrix.error"))})}(),hacklol.settings={check:function(){var e=$.jStorage.get("affichage_barre");"Oui"==e?$("#affichagebarre").prop("checked",!0):"Non"==e?$("#affichagebarre").prop("checked",!1):$("#affichagebarre").prop("checked",!0);var o=$.jStorage.get("transparence_barre");"Oui"==o?$("#transparencebarre").prop("checked",!0):"Non"==o?$("#transparencebarre").prop("checked",!1):$("#transparencebarre").prop("checked",!0);var t=$.jStorage.get("effets_sonores");"Oui"==t?$("#effets_sonores").prop("checked",!0):"Non"==t?$("#effets_sonores").prop("checked",!1):$("#effets_sonores").prop("checked",!0);var a=$.jStorage.get("raccourcis_clavier");"Oui"==a?$("#raccourcis_clavier").prop("checked",!0):"Non"==a?$("#raccourcis_clavier").prop("checked",!1):$("#raccourcis_clavier").prop("checked",!0);var l=$.jStorage.get("flou_effet");"Oui"==l?$("#flou_effet").prop("checked",!0):$("#flou_effet").prop("checked",!1);var i=$.jStorage.get("hacklol_page_loader");1==hacklol.disablePageLoaderByDefault&&"Oui"!==i?$("#hacklol_page_loader_check").prop("checked",!1):"Oui"==i?$("#hacklol_page_loader_check").prop("checked",!0):"Non"==i?$("#hacklol_page_loader_check").prop("checked",!1):$("#hacklol_page_loader_check").prop("checked",!0),1==hacklol.disablePageLoaderByDefault&&$("#hacklolPageLoaderDisabledByDefault").show();var n=$.jStorage.get("couleur_barre"),r="Defaut";if(null!==n&&"#"==n.charAt(0)){$("#choixcouleur").show();r="Personnalisation";$("#colorpicker1").colpickSetColor(n),$("#colorpicker1").attr("value",n.substr(1)),$("#colorpicker1").css("background-color",n.substr(1))}else if($("#choixcouleur").hide(),null!==n)for(var c=["Defaut","Bleu","Rouge","Vert","Jaune","Orange","Rose","Violet","Brun","Noir","Blanc"],s=0;s<c.length;s++)if(c[s]==n)r=c[s];return $('#couleurBarreSelect option[value="'+r+'"]').prop("selected",!0),!0},save:function(){1==$("#affichagebarre").is(":checked")?$.jStorage.set("affichage_barre","Oui"):$.jStorage.set("affichage_barre","Non"),1==$("#transparencebarre").is(":checked")?$.jStorage.set("transparence_barre","Oui"):$.jStorage.set("transparence_barre","Non"),1==$("#effets_sonores").is(":checked")?$.jStorage.set("effets_sonores","Oui"):$.jStorage.set("effets_sonores","Non"),1==$("#raccourcis_clavier").is(":checked")?$.jStorage.set("raccourcis_clavier","Oui"):$.jStorage.set("raccourcis_clavier","Non"),1==$("#flou_effet").is(":checked")?$.jStorage.set("flou_effet","Oui"):$.jStorage.set("flou_effet","Non"),1==$("#hacklol_page_loader_check").is(":checked")?$.jStorage.set("hacklol_page_loader","Oui"):$.jStorage.set("hacklol_page_loader","Non");var e=$("#couleurBarreSelect option:selected").val(),o="Defaut";if("Personnalisation"==e)o="#"+$("#colorpicker1").attr("value").substr(0,6);else o=e;return $.jStorage.set("couleur_barre",o),changeLng($("#languageSelect").val()),hacklol.checkVersion(),$.jStorage.storageAvailable()?(alert(i18next.t("settings.saved")),hacklol.settings.exe(),hacklol.ui.closeWindow(),hacklol.tools.edit("stop"),!0):(alert(i18next.t("settings.error")),hacklol.settings.exe(),hacklol.ui.closeWindow(),hacklol.tools.edit("stop"),!1)},exe:function(){if("Oui"==$.jStorage.get("img_start_hacklol_vu")&&$("#img_start_hacklol").hide(),"Non"==$.jStorage.get("affichage_barre")&&hacklol.ui.closeToolbar(),"Non"==$.jStorage.get("transparence_barre")?($("#toolbar-hacklol").css("opacity","1"),$("#paint-tools").css("opacity","1")):($("#toolbar-hacklol").css("opacity",""),$("#paint-tools").css("opacity","")),window.HTMLAudioElement){var e=document.createElement("audio");e.canPlayType&&e.canPlayType("audio/mpeg")?hacklol.ui.audio():($("#effets_sonores").prop("checked",!1),$("#effets_sonores").prop("checked",!1),$("#effets_sonores").attr("disabled","disabled"),$("#indication_error").text(i18next.t("settings.errormp3")))}else $("#effets_sonores").prop("checked",!1),$("#effets_sonores").prop("checked",!1),$("#effets_sonores").attr("disabled","disabled"),$("#indication_error").text(i18next.t("settings.erroraudio"));var o=$.jStorage.get("hacklol_page_loader");1==hacklol.disablePageLoaderByDefault&&1==pageChargeeFirst&&"Oui"!==o?(hacklol.loadPage(hacklol.urlPage,!1),pageChargeeHPL=0,pageChargeeFirst=0):1==hacklol.disablePageLoaderByDefault&&0!=pageChargeeHPL&&"Oui"!==o?(hacklol.loadPage(hacklol.urlPage,!1),pageChargeeHPL=0,pageChargeeFirst=0):"Non"==o&&1==pageChargeeFirst?(hacklol.loadPage(hacklol.urlPage,!1),pageChargeeHPL=0,pageChargeeFirst=0):1==pageChargeeFirst?(hacklol.loadPage(hacklol.urlPage,!0),pageChargeeHPL=1,pageChargeeFirst=0):"Non"==o&&0!=pageChargeeHPL?(hacklol.loadPage(hacklol.urlPage,!1),pageChargeeHPL=0,pageChargeeFirst=0):"Oui"==o&&1!=pageChargeeHPL&&(hacklol.loadPage(hacklol.urlPage,!0),pageChargeeHPL=1,pageChargeeFirst=0),hacklol.tools.deface("check");var t=$.jStorage.get("couleur_barre"),a="#bdc3c7";if($("#choixcouleur").hide(),null!==t&&"#"==t.charAt(0)){a=t;$("#colorpicker1").attr("value",t.substr(1)),$("#colorpicker1").css("background-color",t),$("#choixcouleur").show(),$("#colorpicker1").colpickSetColor(t)}else if(null!==t)for(var l=["Defaut","Bleu","Rouge","Vert","Jaune","Orange","Rose","Violet","Brun","Noir","Blanc"],i=["#bdc3c7","#3498db","#e74c3c","#2ecc71","#f1c40f","#e88834","#f472d0","#9b59b6","#825a2c","black","white"],n=0;n<l.length;n++)if(l[n]==t)a=i[n];$("#toolbar-hacklol").css("background-color",a),$("#paint-tools").css("background-color",a);var r=hacklol.getContrastYIQ(hacklol.rgb2hex($("#toolbar-hacklol").css("background-color")));return $("#toolbar-hacklol").css("color",r),$("#paint-tools").css("color",r),document.querySelector("meta[name=theme-color]").setAttribute("content","#"+hacklol.rgb2hex($("#toolbar-hacklol").css("background-color"))),hacklol.settings.check(),!0},resetData:function(){$.jStorage.flush(),$.jStorage.reInit(),codeMirrorUserScript.getDoc().setValue('// exemple de script utilisateur\nalert("Hello world !");'),errorDisabled=!1,pageChargeeFirst=1,$("input[name=checkboxDisableErrors]").prop("checked",!1),$("#colorpicker1").attr("value",""),$("#colorpicker1").css("background-color","#ffffff"),$("#colorpicker1").colpickSetColor("#ffffff"),easterEggFound_global=new Array,cheatEasterEgg=!1,$("#easter_egg_count").css("color","green"),$("#easter_egg_count").text(""),alert(i18next.t("settings.reseted")),hacklol.settings.exe(),hacklol.ui.closeWindow()}},hacklol.ui={closeToolbar:function(){$("#toolbar-hacklol").slideUp("slow"),$("#mask_opbh").stop(!0,!0).show(),$("#btn-show-toolbar").stop(!0,!0).fadeIn("slow"),$("#menuMobile").hide(),$("#lienMenuMobile").html('<span class="icon icon_menu"></span> '+i18next.t("toolbar.menu")),menuLienLib=1},showToolbar:function(){$("#toolbar-hacklol").slideDown("slow"),$("#btn-show-toolbar").stop(!0,!0).fadeOut("slow"),$("#mask_opbh").stop(!0,!0).fadeOut("slow")},closeWindow:function(){$.magnificPopup.close()},hideButtonToolbar:function(){$("#btn-show-toolbar").fadeToggle("slow"),$("#btn-show-toolbar-paint").fadeToggle("slow")},quitHacklol:function(){$.magnificPopup.open({items:{src:"#changer-site-popup",type:"inline"},removalDelay:300,mainClass:"mfp-fade",callbacks:{open:function(){$("body").addClass("scrollBarAuto"),$("html").addClass("scrollBarAuto"),"Oui"==$.jStorage.get("flou_effet")&&hacklol.ui.flou(),void 0!=typeof colpickHide&&($("#choixCouleur").colpickHide(),$("#colorpicker1").colpickHide(),$("#colorpicker3").colpickHide())},beforeClose:function(){$("body").removeClass("scrollBarAuto"),$("html").removeClass("scrollBarAuto"),hacklol.ui.desactivFlou()}}})},flou:function(){$("#toolbar-hacklol").addClass("blur-desactived"),$("#hacklol-iframe").addClass("blur-desactived"),$("#btn-show-toolbar-paint").addClass("blur-desactived"),$("#btn-show-toolbar").addClass("blur-desactived"),$("#paint-tools").addClass("blur-desactived"),$("#canvas").addClass("blur-desactived"),$("#deface_div").addClass("blur-desactived"),$("#gel_img").addClass("blur-desactived"),$(".bulleMenu").addClass("blur-desactived"),$("#q").addClass("blur-desactived"),$("#menuMobile").addClass("blur-desactived"),$("#mask_explosion").addClass("blur-desactived"),$("#explosion_img").addClass("blur-desactived"),$("#genericBSOD").addClass("blur-desactived"),$("#win8BSOD").addClass("blur-desactived"),$("#img_start_hacklol").addClass("blur-desactived"),$("#background-loading-indicator").addClass("blur-desactived")},desactivFlou:function(){$("#toolbar-hacklol").removeClass("blur-desactived"),$("#hacklol-iframe").removeClass("blur-desactived"),$("#btn-show-toolbar-paint").removeClass("blur-desactived"),$("#btn-show-toolbar").removeClass("blur-desactived"),$("#paint-tools").removeClass("blur-desactived"),$("#canvas").removeClass("blur-desactived"),$("#deface_div").removeClass("blur-desactived"),$("#gel_img").removeClass("blur-desactived"),$(".bulleMenu").removeClass("blur-desactived"),$("#q").removeClass("blur-desactived"),$("#menuMobile").removeClass("blur-desactived"),$("#mask_explosion").removeClass("blur-desactived"),$("#explosion_img").removeClass("blur-desactived"),$("#genericBSOD").removeClass("blur-desactived"),$("#win8BSOD").removeClass("blur-desactived"),$("#img_start_hacklol").removeClass("blur-desactived"),$("#background-loading-indicator").removeClass("blur-desactived")},audio:function(){var e=["audio","audio_explosion_bis","audio_explosion_2","audio_gel","audio_mlp","audio_aybabtu","audio_wt","audio_troll","audio_ouais","audio_ah","audio_non","audio_isname","audio_issou","audio_jspvips","audio_hendek"],o=["effet_explosion.mp3","effet_explosion_bis.mp3","effet_explosion_2.mp3","gel.mp3","mlp.mp3","aybabtu.mp3","wt_egg.mp3","trololo.mp3","ouais.mp3","ah.mp3","non.mp3","isname.mp3","issou.mp3","jspvips.mp3","hendek.mp3"];if(window.HTMLAudioElement&&"Non"!=$.jStorage.get("effets_sonores")||null==$.jStorage.get("effets_sonores"))for(t=0;t<e.length;t++)window[e[t]]=document.createElement("audio"),window[e[t]].src="assets/sounds/"+o[t],window[e[t]].muted=!1;else if(window.HTMLAudioElement){for(var t=0;t<e.length;t++)void 0!==window[e[t]]&&(window[e[t]].muted=!0);"undefined"!=typeof audio_tmp&&(audio_tmp.muted=!0)}},playAudio:function(e){return!!(window.HTMLAudioElement&&"Non"!=$.jStorage.get("effets_sonores")||null==$.jStorage.get("effets_sonores"))&&(audio_tmp=document.createElement("audio"),""!=audio_tmp.canPlayType("audio/mp3")&&(audio_tmp.src=e,audio_tmp.muted=!1,audio_tmp.play(),!0))},replayEgg:function(e,o,t){return hacklol.ui.playAudio("assets/sounds/"+t),$("#"+o).attr("src",e),!0}},hacklol.ui.paint={closeToolbar:function(){1==paintEnabled&&($("#paint-tools").slideUp("slow"),$("#btn-show-toolbar-paint").stop(!0,!0).fadeIn("slow"),$("#mask_opbb").stop(!0,!0).show(),$("#bulleCouleur").hide(),$("#bulleBrush").hide())},showToolbar:function(){1==paintEnabled&&($("#paint-tools").slideDown("slow"),$("#btn-show-toolbar-paint").stop(!0,!0).fadeOut("slow"),$("#mask_opbb").stop(!0,!0).fadeOut("slow"))}},hacklol.ui.menuMobile={click:function(){1==menuLienLib?($("#menuMobile").stop().slideDown("slow"),$("#lienMenuMobile").html('<span class="icon icon_fermer"></span> '+i18next.t("toolbar.menuclose")),menuLienLib=2):($("#menuMobile").stop().slideUp("slow"),$("#lienMenuMobile").html('<span class="icon icon_menu"></span> '+i18next.t("toolbar.menu")),menuLienLib=1)}},$(document).ready(function(){$("#loadInBackground").click(function(){hacklol.completeLoading(),$("#background-loading-indicator").fadeIn(),loadInBackground=!0}),$("#background-loading-indicator").click(function(){$("#background-loading-indicator").fadeOut()}),$("#btn-show-toolbar").draggable(),$("#btn-show-toolbar-paint").draggable(),$(window).on("resize",function(){$("#btn-show-toolbar").css("top",""),$("#btn-show-toolbar").css("left",""),$("#btn-show-toolbar-paint").css("top",""),$("#btn-show-toolbar-paint").css("left","")}),setTimeout(function(){hacklol.loadImages()},500),$("#versionHacklolAbout").text(hacklol.version),$("#dateVersionHacklolAbout").text(hacklol.dateVersion),$(".btn_close_bar").click(function(){hacklol.ui.closeToolbar()}),$("#btn-show-toolbar").click(function(){hacklol.ui.showToolbar()}),$("#lienMenuMobile").click(function(){hacklol.ui.menuMobile.click()}),$("#reload-page-button").click(function(){hacklol.reloadPage()}),$("#retour-page-button").click(function(){history.back()}),$("#suivant-page-button").click(function(){history.forward()}),$("#hacklol-iframe").on("load",function(){hacklol.tools.edit("stop")}),$("#quitHacklolBtn").click(function(){$("#hacklol-iframeWrapper").html(""),window.location.href="../index.php"}),$("#reset_data").click(function(){confirm(i18next.t("settings.resetconfirm"))&&hacklol.settings.resetData()}),$("#toolbar-hacklol").click(function(){$("#img_start_hacklol").hide(),$.jStorage.storageAvailable()&&$.jStorage.set("img_start_hacklol_vu","Oui")}),$("input[name=checkboxDisableErrors]").change(function(){$("input[name=checkboxDisableErrors]").is(":checked")?errorDisabled=!0:errorDisabled=!1}),$(".open-popup-link").magnificPopup({type:"inline",removalDelay:300,mainClass:"mfp-fade",callbacks:{open:function(){$("body").addClass("scrollBarAuto"),$("html").addClass("scrollBarAuto"),"Oui"==$.jStorage.get("flou_effet")&&hacklol.ui.flou(),void 0!=typeof colpickHide&&($("#choixCouleur").colpickHide(),$("#colorpicker1").colpickHide(),$("#colorpicker3").colpickHide())},beforeClose:function(){$("body").removeClass("scrollBarAuto"),$("html").removeClass("scrollBarAuto"),hacklol.ui.desactivFlou()}}}),$(".popup-parametres").magnificPopup({type:"inline",preloader:!1,focus:"#affichagebarre",removalDelay:300,mainClass:"mfp-fade",callbacks:{beforeOpen:function(){$(window).width()<700?this.st.focus=!1:this.st.focus="#affichagebarre"},open:function(){$("body").addClass("scrollBarAuto"),$("html").addClass("scrollBarAuto"),"Oui"==$.jStorage.get("flou_effet")&&hacklol.ui.flou(),void 0!=typeof colpickHide&&($("#choixCouleur").colpickHide(),$("#colorpicker1").colpickHide(),$("#colorpicker3").colpickHide())},beforeClose:function(){$("body").removeClass("scrollBarAuto"),$("html").removeClass("scrollBarAuto"),hacklol.settings.check(),hacklol.ui.desactivFlou()}}}),$(".ajax-popup-link").magnificPopup({type:"ajax",removalDelay:300,mainClass:"mfp-fade",cursor:"mfp-ajax-cur",tError:'<a href="%url%" target="_blank">Le contenu</a> n\'a pas pu être chargé correctement.<br /><a href="%url%" target="_blank">The content</a> could not be loaded.',callbacks:{open:function(){$("body").addClass("scrollBarAuto"),$("html").addClass("scrollBarAuto"),"Oui"==$.jStorage.get("flou_effet")&&hacklol.ui.flou(),void 0!=typeof colpickHide&&($("#choixCouleur").colpickHide(),$("#colorpicker1").colpickHide(),$("#colorpicker3").colpickHide())},beforeClose:function(){$("body").removeClass("scrollBarAuto"),$("html").removeClass("scrollBarAuto"),hacklol.ui.desactivFlou()}}}),$(document).on("click",".popup-modal-dismiss",function(e){hacklol.ui.closeWindow()}),$("#disparition_page").click(function(){hacklol.tools.hidePage("hide")}),$("#re_apparition_page").click(function(){hacklol.tools.hidePage("show")}),$("#click-explosion").click(function(){hacklol.tools.explode("explode")}),$("#click-explosion-stop").click(function(){hacklol.tools.explode("stop")}),$("#click-gel").click(function(){hacklol.tools.freeze()}),$("#click-flouter").click(function(){hacklol.tools.flou("flou")}),$("#click-flouter-stop").click(function(){hacklol.tools.flou("stop")}),$("#click-secouer").click(function(){hacklol.tools.shake("shake")}),$("#click-secouer-stop").click(function(){hacklol.tools.shake("stop")}),$("#indiceEgg").click(function(){hacklol.tools.deface("indice")}),$("#cheatEgg").click(function(){hacklol.tools.deface("cheat")}),$("#change_site_ok").click(function(){var e=$.jStorage.get("hacklol_page_loader"),o=$("#urlChangeSite").val();return $("#errorUrlChange").text(""),$("#errorUrlChange").hide(),hacklol.tools.edit("stop"),""==o.trim()?($("#errorUrlChange").html("<span class='icon icon_error'></span> "+i18next.t("changesite.empty")),void $("#errorUrlChange").show()):0==hacklol.validateUrl(o)?($("#errorUrlChange").html("<span class='icon icon_error'></span> "+i18next.t("changesite.errorurl")),void $("#errorUrlChange").show()):("Non"==e?hacklol.loadPage(o,!1):hacklol.loadPage(o,!0),void hacklol.ui.closeWindow())}),$("#urlChangeSite").val(hacklol.urlPage),$("#colorpicker3").colpick({layout:"hex",submit:0,color:"FE4A4A",colorScheme:"dark",onChange:function(e,o,t,a,l){$("#colorpicker3").css("background-color","#"+o),$("#colorpicker3").attr("value",o)}}),$("#defacer_site_ok").click(function(){hacklol.tools.deface("deface")}),$("#defacer_site_reafficher").click(function(){hacklol.tools.deface("stop")}),$("#bsod_site_ok").click(function(){hacklol.tools.bsod("bsod")}),$("#click-bsod-stop").click(function(){hacklol.tools.bsod("stop")}),$("#matrix-stop").click(function(){hacklol.tools.matrix.stop()}),$("#matrix").click(function(){hacklol.tools.matrix.start()}),$("#click-paint").click(function(){hacklol.tools.paint("paint")}),$("#click-paint-stop").click(function(){hacklol.tools.paint("stop")}),$("#close-dessin-tools").click(function(){hacklol.ui.paint.closeToolbar()}),$("#btn-show-toolbar-paint").click(function(){hacklol.ui.paint.showToolbar()}),function(){if(window.HTMLCanvasElement){var e,o=document.getElementById("canvas"),t=document.getElementById("wrapper");function a(a){e?(e=!1,o.width=800,o.height=600,o.className="canvasNormal",t.className="wrapperNormal"):(e=!0,o.className="canvasFullWindow",t.className="wrapperFullfullWindow",o.width=window.innerWidth,o.height=window.innerHeight)}function l(t){if(e){var a=document.createElement("canvas"),l=a.getContext("2d");a.width=o.width,a.height=o.height,l.drawImage(o,0,0);var i=o.getContext("2d");o.width=window.innerWidth,o.height=window.innerHeight,i.drawImage(a,0,0),a="",l=""}}window.onresize=l;document.getElementById("canvas");a()}}(),function(){var e,o,t,a;$(".ripplelink").click(function(l){0===$(this).find(".ink").length&&$(this).prepend("<span class='ink'></span>"),(e=$(this).find(".ink")).removeClass("animate"),e.height()||e.width()||(o=Math.max($(this).outerWidth(),$(this).outerHeight()),e.css({height:o,width:o})),t=l.pageX-$(this).offset().left-e.width()/2,a=l.pageY-$(this).offset().top-e.height()/2,e.css({top:a+"px",left:t+"px"}).addClass("animate")})}(),$("#colorpicker1").colpick({layout:"hex",submit:0,color:"ffffff",colorScheme:"dark",onChange:function(e,o,t,a,l){$("#colorpicker1").css("background-color","#"+o),$("#colorpicker1").attr("value",o)}}),$("#couleurBarreSelect").change(function(){"Personnalisation"==$("#couleurBarreSelect option:selected").val()?$("#choixcouleur").show():$("#choixcouleur").hide()}),$("#parametre_ok").click(function(){hacklol.settings.save()})});