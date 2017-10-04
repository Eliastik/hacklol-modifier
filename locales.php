<?php
    $config_lang_supported = ["fr-FR", "en-US", "fr", "en"];
    $config_lang_supported_min = ["fr", "en"];

    if(empty($path)) {
        $path = './locale';
    }

    function set_custom_lang($lang_tmp) {
        switch($lang_tmp) {
            case 'fr':
                $lang = 'fr_FR';
                break;
            case 'fr_FR':
                $lang = 'fr_FR';
                break;
            case 'en':
                $lang = 'en_US';
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

    function set_custom_lang_cookie($lang_tmp) {
        switch($lang_tmp) {
            case 'fr':
                $lang = 'fr';
                break;
            case 'fr_FR':
                $lang = 'fr';
                break;
            case 'en':
                $lang = 'en';
                break;
            case 'en_US':
                $lang = 'en';
                break;
            default:
                $lang = 'en';
                break;
        }

        return $lang;
    }

    function get_lang($two = false) {
        if(isset($_GET['lang'])) {
            $lang = set_custom_lang($_GET['lang']);
        } else if(isset($_COOKIE['main-lang'])) {
            $lang = set_custom_lang($_COOKIE['main-lang']);
        } else {
            $lang = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
            $lang = set_custom_lang($lang);
        }

        if(isset($two) && $two == true) {
            return substr($lang, 0, 2);
        } else {
            return $lang;
        }
    }

    function get_image_lang($num) {
        $img_fr = [""];

        $img_en = [""];

        $lang = get_lang();

        switch($lang) {
            case "fr":
                return $img_fr[$num];
            case "fr_FR":
                return $img_fr[$num];
            case "en":
                return $img_en[$num];
            case "en_US":
                return $img_en[$num];
        }

        return false;
    }

    function get_href_lang_tags($langs) {
        $html_code_tmp = "";

        foreach($langs as $value) {
            $html_code_tmp = $html_code_tmp . "\t<link rel=\"alternate\" href=\"http://". htmlspecialchars($_SERVER['SERVER_NAME'] . "/" . substr($value, 0, 2) . $_SERVER['PHP_SELF']) . "\" hreflang=\"". $value ."\"/>\n";
        }
        
        $html_code_tmp = $html_code_tmp . "\t<link rel=\"alternate\" href=\"http://". htmlspecialchars($_SERVER['SERVER_NAME'] . $_SERVER['PHP_SELF']) . "\" hreflang=\"x-default\"/>\n";

        return $html_code_tmp;
    }

    function curPageURL() {
        $pageURL = 'http';

        $pageURL .= "://";

        if ($_SERVER["SERVER_PORT"] != "80") {
            $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
        } else {
            $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
        }

        return $pageURL;
    }

    function get_current_lang_path() {
        $path = substr(parse_url(curPageURL(), PHP_URL_PATH), 1, 2);
        $path = set_custom_lang_cookie($path);

        return "/" . $path . "/";
    }
    
    if(isset($_GET['lang'])) {
        $lang = set_custom_lang($_GET['lang']);
        setcookie("main-lang", set_custom_lang_cookie($_GET['lang']), time()+3600*24*365*5, "/", null, null, true);
    } else if(isset($_COOKIE['main-lang'])) {
        $lang = set_custom_lang($_COOKIE['main-lang']);
    } else {
        $lang_tmp = substr($_SERVER['HTTP_ACCEPT_LANGUAGE'], 0, 2);
        $lang = set_custom_lang_cookie($lang_tmp);
    }
    
    $filename = 'default';
    putenv("LANGUAGE=$lang");
    putenv("LC_ALL=$lang");
    setlocale(LC_ALL, $lang);
    bindtextdomain($filename, $path);
    bind_textdomain_codeset($filename, "UTF-8");
    textdomain($filename);
?>
