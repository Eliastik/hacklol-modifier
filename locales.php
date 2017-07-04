<?php
    if(empty($path)) {
        $path = './locale';
    }
    
    function set_custom_lang($lang_tmp) {
        switch($lang_tmp) {
            case 'fr':
                $lang = 'fr_FR';
                break;
            case 'en':
                $lang = 'en_US';
                break;
            default:
                $lang = 'en_US';
                break;
        }
        return $lang;
    }
    
    if(isset($_GET['lang'])) {
        $lang = set_custom_lang($_GET['lang']);
        setcookie("main-lang", $_GET['lang'], time()+3600*24*365*5, "/", null, null, true);
    } else if(isset($_COOKIE['main-lang'])) {
        $lang = set_custom_lang($_COOKIE['main-lang']);
    } else {
        $lang = locale_accept_from_http($_SERVER['HTTP_ACCEPT_LANGUAGE']);
    }
    
    $filename = 'default';
    putenv("LANGUAGE=$lang");
    putenv("LC_ALL=$lang");
    setlocale(LC_ALL, $lang);
    bindtextdomain($filename, $path);
    bind_textdomain_codeset($filename, "UTF-8");
    textdomain($filename);
?>
