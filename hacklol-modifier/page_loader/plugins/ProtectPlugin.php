<?php
/* ProtectPlugin pour Hacklol Modifier, by Eliastik
   Dernière modification : 25/06/2016 - Version 1.1 */

use Proxy\Plugin\AbstractPlugin;
use Proxy\Event\ProxyEvent;

class ProtectPlugin extends AbstractPlugin {

    protected $url_pattern;

    public function onBeforeRequest(ProxyEvent $event){
        // start the session
        session_start();
        if(isset($_SESSION['urlPageHacklol'])) {
            // on verifie si l'utilisateur n'est pas banni au niveau de l'ip
            require('ban_ip.php');
            foreach($ip_ban_page_loader as $ip_interdite) {
                if($ip_interdite == get_ip()) {
                    die("Votre adresse IP est bannie. Vous ne pouvez pas utiliser Hacklol Page Loader.");
                }
            }
            
            $url = $event['request']->getUri();

            /* on vérifie la validité de l'URL (vérifie si le site est appelé à partir de son IP)
            if(filter_var($url, FILTER_VALIDATE_URL) === false) {
                echo render_template("./templates/main.php", array('version' => 0,
                        'error_protect_plugin' => 'URL invalide. <a href="#" onclick="javascript:history.back();">Retourner &agrave; la page pr&eacute;c&eacute;dente</a><br />Invalid URL. <a href="#" onclick="javascript:history.back();">Back to the previous page</a>'
                        ));
                        die();
            }
            else*/ if(is_url_ip($url) === true) {
                echo render_template("./templates/main.php", array('version' => 0,
                        'error_protect_plugin' => 'Impossible d\'accéder à une URL de type adresse IP. <a href="#" onclick="javascript:history.back();">Retourner &agrave; la page pr&eacute;c&eacute;dente</a><br />It\'s impossible to access a website with its IP adress. <a href="#" onclick="javascript:history.back();">Back to the previous page</a>'
                        ));
                        die();
            }
        } else {
            echo render_template("./templates/main.php", array('version' => 0,
            'error_protect_plugin' => 'Votre session a expir&eacute;. Vous ne pouvez plus utiliser Hacklol Page Loader. Si ce message s\'est affich&eacute; imm&eacute;diatement apr&egrave;s l\'acc&egrave;s &agrave; Hacklol Modifier, v&eacute;rifiez que votre navigateur accepte bien les cookies (<a href="http://www.commentcamarche.net/faq/7543-activer-les-cookies" target="_blank">comment les activer</a>) et r&eacute;essayez. Sinon, si vous voulez continuer &agrave; utiliser Hacklol Modifier, d&eacute;cochez "Activer Hacklol Page Loader" dans les param&egrave;tres d\'Hacklol Modifier, ou quittez Hacklol Modifier et choisissez un autre site &agrave; modifier.<br /><br />Your session has expired. You can\'t use Hacklol Page Loader anymore. If this message have been displayed immediately after you have accessed to Hacklol Modifier, make sure your browser accepts cookies (<a href="http://ccm.net/faq/40614-how-to-enable-cookies" target="_blank">how to enable</a>) and try again. Otherwise, if you want to continue to use Hacklol Modifier, uncheck "Enable Hacklol Page Loader" in the settings of Hacklol Modifier, or exit Hacklol Modifier and choose another site to edit.'
            ));
            die();
        }
    }

    public function onHeadersReceived(ProxyEvent $event){
    }

    public function onCurlWrite(ProxyEvent $event){
    }

    public function onCompleted(ProxyEvent $event){
        /* suppression des scripts antis-iframes
        $response = $event['response'];
        $str = $response->getContent();

        $str = preg_replace('/if\(.*?window.*?parent.*?length.*\).*?\{.*?\}/i', '', $str);
        $str = preg_replace('/if\(*?top.*\).*?\{.*?\}/i', '', $str);
        $str = preg_replace('/.*?top.*?location.*?[\s.*?].*?;/i', '', $str);
        $str = preg_replace('/.*?window.*?self.*?;?/i', '', $str);
        $str = preg_replace('/.*?top.*?self.[\t\r\n\s]*?.*;?/i', '', $str);
        $str = preg_replace('/.*?window.*?open.\(.*?,[\t\r\n\s]*?.*_top.*\)/i', '', $str);

        $response->setContent($str);*/
    }
}
function is_url_ip($url) {
    $hostname = parse_url($url, PHP_URL_HOST);
    $long = ip2long($hostname);
    if (filter_var($hostname, FILTER_VALIDATE_IP) === FALSE || $long == -1 || $long === FALSE) {
        return false;
    } else {
        return true;
    }
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
     if (filter_var($ip, FILTER_VALIDATE_IP,
                         FILTER_FLAG_IPV4 |
                         FILTER_FLAG_IPV6 |
                         FILTER_FLAG_NO_PRIV_RANGE |
                         FILTER_FLAG_NO_RES_RANGE) === false)
         return false;
     $ip = $ip;
     return true;
 }
?>
