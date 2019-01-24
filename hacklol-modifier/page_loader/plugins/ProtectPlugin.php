<?php
/* ProtectPlugin for Hacklol Modifier, by Eliastik
   Latest modification: 24/01/2019 - Version 1.4
   Some parts are from: https://github.com/Athlon1600/php-proxy-plugin-bundle/pull/2/files
*/

use Proxy\Plugin\AbstractPlugin;
use Proxy\Event\ProxyEvent;

require("../ProtectForm.php");

$_SERVER["REMOTE_ADDR"] = get_ip();

class ProtectPlugin extends AbstractPlugin {

    protected $url_pattern;

    public function onBeforeRequest(ProxyEvent $event){
        $fileBlacklist = "../../blacklistedWebsites.php";
        $fileBanIP = "../../ban_ip.php";

        // start the session
        session_start();
        // appName
        include("../../config.php");

        if(isset($hacklolConfig)) {
            $appName = $hacklolConfig['pageLoaderName'];
            $hacklolModifierName = $hacklolConfig['appName'];
        } else {
            $appName = "Hacklol Page Loader";
            $hacklolModifierName = "Hacklol Modifier";
        }

        if(isset($_SESSION['urlPageHacklol'])) {
            if(is_ban(get_ip(), $fileBanIP)) {
                die("Votre adresse IP est bannie. Vous ne pouvez pas utiliser ". $appName);
            }

            $url = trim($event['request']->getUri());
            $blacklisted = in_blacklist($url, $fileBlacklist);

            if(is_url_ip($url) === true) {
                echo render_template("./templates/main.php", array('version' => 0,
                    'error_protect_plugin' => 'Impossible d\'accéder à une URL de type adresse IP. <a href="#" onclick="javascript:history.back();">Retourner &agrave; la page pr&eacute;c&eacute;dente</a><br />It\'s not possible to access to an IP address URL. <a href="#" onclick="javascript:history.back();">Back to the previous page</a>'
                ));
                die();
            } else if(is_invalid_url($url)) {
                echo render_template("./templates/main.php", array('version' => 0,
                    'error_protect_plugin' => 'Adresse URL invalide. <a href="#" onclick="javascript:history.back();">Retourner &agrave; la page pr&eacute;c&eacute;dente</a><br />Invalid URL address. <a href="#" onclick="javascript:history.back();">Back to the previous page</a>'
                ));
                die();
            } else if($blacklisted[0] === true) {
                echo render_template("./templates/main.php", array('version' => 0,
                    'error_protect_plugin' => 'L\'accès à ce site avec ' . $appName .' a été interdit pour des raisons de sécurité. <strong>Mot clef détecté :</strong> ' . htmlentities($blacklisted[1]) . '. <a href="#" onclick="javascript:history.back();">Retourner &agrave; la page pr&eacute;c&eacute;dente</a>.<br />The access to this website with ' . $appName .' is banned for security reasons. <strong>Detected keyword:</strong> ' . htmlentities($blacklisted[1]) . '. <a href="#" onclick="javascript:history.back();">Back to the previous page</a>.'
                ));
                die();
            }
        } else {
            echo render_template("./templates/main.php", array('version' => 0,
            'error_protect_plugin' => 'Votre session a expir&eacute;. Vous ne pouvez plus utiliser '. $appName .'. Si ce message s\'est affich&eacute; imm&eacute;diatement apr&egrave;s l\'acc&egrave;s &agrave; '. $hacklolModifierName .', v&eacute;rifiez que votre navigateur accepte bien les cookies (<a href="http://www.commentcamarche.net/faq/7543-activer-les-cookies" target="_blank">comment les activer</a>) et r&eacute;essayez. Sinon, si vous voulez continuer &agrave; utiliser '. $hacklolModifierName .', d&eacute;cochez &laquo; Activer '. $appName .' &raquo; dans les param&egrave;tres de '. $hacklolModifierName .', ou quittez '. $hacklolModifierName .' et choisissez un autre site &agrave; modifier.<br /><br />Your session has expired. You can\'t use '. $appName .' anymore. If this message have been displayed immediately after you have accessed to '. $hacklolModifierName .', make sure your browser accepts cookies (<a href="http://ccm.net/faq/40614-how-to-enable-cookies" target="_blank">how to enable</a>) and try again. Otherwise, if you want to continue to use '. $hacklolModifierName .', uncheck "Enable '. $appName .'" in the settings of '. $hacklolModifierName .', or exit '. $hacklolModifierName .' and choose another site to edit.'
            ));
            die();
        }
    }

    public function onCompleted(ProxyEvent $event){
        // Remove anti-iframes scripts
        $response = $event['response'];
        $str = $response->getContent();

        /* $str = preg_replace('/if\(.*?window.*?parent.*?length.*\).*?\{.*?\}/i', '', $str);
        $str = preg_replace('/if\(*?top.*\).*?\{.*?\}/i', '', $str);
        $str = preg_replace('/.*?top.*?location.*?[\s.*?].*?;/i', '', $str);
        $str = preg_replace('/.*?window.*?self.*?;?/i', '', $str);
        $str = preg_replace('/.*?top.*?self.[\t\r\n\s]*?.*;?/i', '', $str);
        $str = preg_replace('/.*?window.*?open.\(.*?,[\t\r\n\s]*?.*_top.*\)/i', '', $str); */

        // Fix for Facebook (and maybe other websites) :
        $str = preg_replace('/<script.*?if\s*\(\s*top.*?self.*?\).*?script>|<script.*?if\s*\(\s*self.*?top.*?\).*?script>/i', '', $str);

        // Remove target attribute (prevent opening links in new tab) :
        $str = preg_replace('/\s*target=("|\'|\s|)(_blank|_top|_parent)("|\'|\s)/i', '', $str);

        $response->setContent($str);
    }
}
/* Parts from: https://github.com/Athlon1600/php-proxy-plugin-bundle/pull/2/files */
function is_invalid_url($url) {
    $url_host = preg_replace('/^www\./is', '', trim(parse_url($url, PHP_URL_HOST)));
    $app_host = preg_replace('/^www\./is', '', trim(parse_url(app_url(), PHP_URL_HOST)));

    // Do not proxify invalid URLs
    if(!filter_var($url, FILTER_VALIDATE_URL)){
        return true;
    }

    // Do not proxify URLs with "/.htpasswd" or "/../" (hidden folders or files)
    if(preg_match('/(\/\.|\.\.)/is', $url)){
        return true;
    }

    // Do not proxify URLs with invalid or unsupported scheme
    if(!in_array(strtolower(parse_url($url, PHP_URL_SCHEME)), array("http","https"))){
        return true;
    }

    // Do not proxify localhost
    if(preg_match('/^localhost/is', $url_host)){
        return true;
    }

    // Do not proxify ftp
    if(preg_match('/^(http:\/\/|https:\/\/)ftp$/is', $url)){
        return true;
    }

    // Do not proxify internal IP addresses
    if(filter_var($url_host, FILTER_VALIDATE_IP)){
        if(filter_var($url_host, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) === false){
            return true;
        }
    }

    // Do not proxify the server's IP address
    if(filter_var($_SERVER['SERVER_ADDR'], FILTER_VALIDATE_IP)){
        if($url_host == $_SERVER['SERVER_ADDR']){
            return true;
        }
    }

    // Do not proxify our own proxy host ($_SERVER['HTTP_HOST'])
    if(stripos($url_host, $_SERVER['HTTP_HOST']) === 0){
        return true;
    }

    // Do not proxify our own proxy host (app_url())
    if(stripos($url_host, $app_host) === 0){
        return true;
    }

    return false;
}
// https://stackoverflow.com/questions/1634782/what-is-the-most-accurate-way-to-retrieve-a-users-correct-ip-address-in-php
function get_ip() {
    // Check for shared internet/ISP IP
    if (!empty($_SERVER['HTTP_CLIENT_IP']) && validate_ip($_SERVER['HTTP_CLIENT_IP'])) {
        return $_SERVER['HTTP_CLIENT_IP'];
    }

    // Check for IPs passing through proxies
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        // Check if multiple IP addresses exist in var
        $iplist = explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']);

        foreach ($iplist as $ip) {
            if (validate_ip($ip))
            return $ip;
        }
    }

    if (!empty($_SERVER['HTTP_X_FORWARDED']) && validate_ip($_SERVER['HTTP_X_FORWARDED']))
    return $_SERVER['HTTP_X_FORWARDED'];

    if (!empty($_SERVER['HTTP_X_CLUSTER_CLIENT_IP']) && validate_ip($_SERVER['HTTP_X_CLUSTER_CLIENT_IP']))
    return $_SERVER['HTTP_X_CLUSTER_CLIENT_IP'];

    if (!empty($_SERVER['HTTP_FORWARDED_FOR']) && validate_ip($_SERVER['HTTP_FORWARDED_FOR']))
    return $_SERVER['HTTP_FORWARDED_FOR'];

    if (!empty($_SERVER['HTTP_FORWARDED']) && validate_ip($_SERVER['HTTP_FORWARDED']))
    return $_SERVER['HTTP_FORWARDED'];

    // Return unreliable IP address since all else failed
    return $_SERVER['REMOTE_ADDR'];
}

function validate_ip($ip) {
    if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_IPV4 | FILTER_FLAG_IPV6 | FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) === false)
    return false;
    $ip = $ip;
    return true;
}
?>
