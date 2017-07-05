<?php
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
session_start(); // on démarre une session

require("../config.php");
$path = "../locale";
require("../locales.php");

$url = null;
$valid = null;
$recaptchaVerifReponse = false;
$verifInBl = null;
if(isset($_POST['siteurl']) && isset($_POST['valider'])) {
    if(isset($_POST['siteurl'])) $url = $_POST['siteurl']; // Obtiens l'URL (sans filtrage !)
    if(isset($_POST['valider'])) $valid = $_POST['valider']; // Permet de savoir si le bouton de validation a été sélectionné
    if(isset($_POST['g-recaptcha-response'])) $recaptchaVerifReponse = isValid($_POST['g-recaptcha-response']); // Vérifie la réponse au ReCapatcha
}
// $maintenance vaut 1 si Hacklol Modifier est en maintenance
$maintenance = 0;
$ipSansMaintenance = ''; // Mettre l'ip qui pourra passer la maintenance (idéalement celle de l'admin)
// Vérification des erreurs du formulaire (11 possibles) - on set les variables des erreurs à false
$nbErreursForm = 0;
$erreurMaintenance = false; $erreurIsBan = false; $erreurButtonError = false; $erreurFlood = false; $erreurFormIncomplete = false; $erreurUrlIncorrect = false; $erreurUrlIP = false; $erreurUrlHacklol = false; $erreurUrlInBlacklist = false; $erreurRecaptchaIsNull = false; $erreurRecaptchaIsFalse = false;
if($maintenance == 1 && get_ip() != $ipSansMaintenance) {
    $erreurMaintenance = true;
    $nbErreursForm++;
}
else if(empty($valid)) {
    $erreurButtonError = true;
    $nbErreursForm++;
}
else {
    // Si rien est entré
    if (empty($url) || trim($url) == "") {
        $erreurFormIncomplete = true;
        $nbErreursForm++;
    }
    // Si les champs ont été remplis
    else {
        // Vérifie la validité de l'URL
        if(filter_var($url, FILTER_VALIDATE_URL) === false) {
            if(is_url_ip($url) === true) {
                $erreurUrlIP = true;
                $nbErreursForm++;
            } else {
                $erreurUrlIncorrect = true;
                $nbErreursForm++;
            }
        } else if(is_url_ip($url) === true) {
            $erreurUrlIP = true;
            $nbErreursForm++;
        }

        // Vérifie que l'URL est une URL d'Hacklol (Interdit)
        if(strpos($url, "http://hacklol.cwebh.org") !== false || strpos($url, "http://www.hacklol.cwebh.org") !== false || strpos($url, "http://hacklol.c-wh.org") !== false || strpos($url, "http://www.hacklol.c-wh.org") !== false || strpos($url, "http://hacklol.olympe.in") !== false || strpos($url, "http://hacklol.eliastiksofts.com") !== false || strpos($url, "https://hacklol.eliastiksofts.com") !== false) {
            $erreurUrlHacklol = true;
            $nbErreursForm++;
        }
    }
    if($hacklolConfig['enableRecaptcha'] == true) {
        // Si on obtient aucune réponse de Google, la connexion a échoué
        if (is_null($recaptchaVerifReponse)) {
            $erreurRecaptchaIsNull = true;
            $nbErreursForm++;
        }
        // Si on reçoit false, le ReCapatcha n'a pas été validé
        else if ($recaptchaVerifReponse == false) {
            $erreurRecaptchaIsFalse = true;
            $nbErreursForm++;
        }
    }
}
// Si une des erreurs est commise, on bloque le script et on affiche les erreurs
if($nbErreursForm > 0) {
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="">
        <meta name="author" content="">
        <link rel="icon" href="/favicon.ico">

        <title><?php echo $hacklolConfig['appName']; ?></title>

        <link href="/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
        <link href="/index.css" rel="stylesheet">

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
              <script src="/bower_components/html5shiv/dist/html5shiv.min.js"></script>
              <script src="/bower_components/respond/dest/respond.min.js"></script>
        <![endif]-->
    </head>
    <body>
        <div class="container">
            <?php
                if($nbErreursForm > 1) {
                    echo "<h2>". $hacklolConfig['appName'] ." – " . _("errors-form") . "</h2>
                    <p>" . _("the") . " " . $nbErreursForm . " " . _("following-errors") . "</p>";
                }
                else {
                    echo "<h2>". $hacklolConfig['appName'] ." – " . _("error-form") . "</h2>
                    <p>" . _("following-error") . "</p>";
                }

                echo"<ul>";

                if($erreurMaintenance == true) {
                    echo "<li>". $hacklolConfig['appName'] . " " . _("error-maintenance") . "</li>";
                }

                if($erreurFlood == true) {
                    echo "<li>" . _("anti-flood")  . " " . $hacklolConfig['appName'] .".</li>";
                }

                if($erreurButtonError == true) {
                    echo "<li>" . _("error-form-not-submited") . "</li>";
                }
                if($erreurFormIncomplete == true) {
                    echo "<li>" . _("error-form-field-empty") . "</li>";
                }
                if($erreurUrlIncorrect == true) {
                    echo "<li>" . _("error-url-incorrect") . "</li>";
                }
                if($erreurUrlIP == true) {
                    echo "<li>" . _("error-url-ip") . "</li>";
                }
                if($erreurUrlHacklol == true) {
                    echo "<li>" . _("error-hacklol") . " " . $hacklolConfig['appName'] ."…</li>";
                }
                if($erreurUrlInBlacklist == true) {
                    echo '<li>' . _("error-access") . ' '. $hacklolConfig['appName'] .' ' . _("error-access-forbidden") . '<br /><strong>' . _("error-detected-keyword") . '</strong> '. htmlspecialchars($verifInBl[1]) .'.</li>';
                }
                if($erreurRecaptchaIsNull == true) {
                    echo "<li>" . _("error-recaptcha-timeout") . "</li>";
                }
                if($erreurRecaptchaIsFalse == true) {
                    echo "<li>" . _("error-false-recaptcha") . "</li>";
                }
            ?>
            </ul>
        <a class="btn btn-lg btn-primary" href="/"><?php echo _("back-to-form") ?></a>
        </div> <!-- /container -->
    </body>
</html>
<?php
}
// Si tout va bien
else {
    $_SESSION['urlPageHacklol'] = $url;
    $hacklol_modifier_require_pass = "hacklol";

    require('hacklol-modifier.php');
}
// Fonction qui permet de vérifier la réponse du captcha - source : http://www.grafikart.fr/tutoriels/php/recaptcha-anti-spam-346
function isValid($code, $ip = null)
{
    if (empty($code)) {
        return false; // Si aucun code n'est entré, on ne cherche pas plus loin
    }
    $params = [
        'secret'    => $hacklolConfig['recaptchaPrivateKey'],
        'response'  => $code
    ];
    if( $ip ){
        $params['remoteip'] = $ip;
    }
    $url = "https://www.google.com/recaptcha/api/siteverify?" . http_build_query($params);
    if (function_exists('curl_version')) {
        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_HEADER, false);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_TIMEOUT, 2);
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
        $response = curl_exec($curl);
    } else {
        // Si curl n'est pas dispo, un bon vieux file_get_contents
        $response = file_get_contents($url);
    }

    if (empty($response) || is_null($response)) {
        return null;
    }
    $json = json_decode($response);
    return $json->success;
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
// Pour savoir si l'URL est une adresse IP
function is_url_ip($url) {
    $hostname = parse_url($url, PHP_URL_HOST);
    $long = ip2long($hostname);
    if (filter_var($hostname, FILTER_VALIDATE_IP) === FALSE || $long == -1 || $long === FALSE) {
        return false;
    } else {
        return true;
    }
}
?>
