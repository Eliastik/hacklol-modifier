/* Hacklol Modifier 1.4.1 */
// Raccourci multi-touche
var isG = false;

$(document).keydown(function(e)
{
    if (e.which == 71 || e.keyCode == 71)
    {
        isG = true; // si la touche G a été pressée
    }
}).keyup(function(e)
{
    if ($('input:focus').length > 0 || $('textarea:focus').length > 0 || isG != true)
    {
        isG = false; // Si on se trouve dans un input, une textarea ou si on n'a pas pressé la touche G, on ne peut pas faire des raccourcis clavier
        return false;
    }

    if (e.keyCode == true)
    {
        var key = e.keyCode;
    }
    else
    {
        var key = e.which;
    }
    if($.jStorage.get('raccourcis_clavier') == null || $.jStorage.get('raccourcis_clavier') != "Non") {
        switch (key) // On regarde la deuxième touche pressée par l'utilisateur
        {
            // G + O
            case 79:
                $("#mask_opbh").fadeToggle();
                $("#toolbar-hacklol").slideToggle("slow");
                $("#btn-show-toolbar").fadeToggle("slow");
                $("#menuMobile").hide();
                $("#lienMenuMobile").html("<span class=\"icon icon_menu\"></span>" + i18next.t('toolbar.menu'));
                menuLienLib = 1;
                return false;
                break;
            // G + M
            case 77:
                hacklol.ui.hideButtonToolbar();
                return false;
                break;
            // G + Q
            case 81:
                hacklol.settings.check();
                hacklol.ui.quitHacklol();
                return false;
                break;
            // G + B
            case 66:
                history.back();
                return false;
                break;
            // G + F
            case 70:
                history.forward();
                return false;
                break;
            // G + R
            case 82:
                hacklol.reloadPage();
                return false;
                break;
        }
    }

    isG = false; // On réinitialise le booléen
});
