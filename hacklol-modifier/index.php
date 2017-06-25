<?php
/* Hacklol Modifier PHP - Version 1.3.1
by Eliastik */
session_start(); // on démarre une session
require("../config.php");
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
            } else if(filter_var("http://" . $url, FILTER_VALIDATE_URL) !== false) { // si URL invalide, on essaye de voir si l'URL est valide en ajoutant http:// (si l'utilisateur l'a oublié)
                $url = "http://" . $url;
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
                    echo "<h2>". $hacklolConfig['appName'] ." – Erreurs dans le formulaire</h2>
                    <p>Les $nbErreursForm erreurs suivantes ont été commises lors de l'envoi du formulaire :</p>";
                }
                else {
                    echo "<h2>". $hacklolConfig['appName'] ." – Erreur dans le formulaire</h2>
                    <p>L'erreur suivante a été commise lors de l'envoi du formulaire :</p>";
                }
                
                echo"<ul>";
                
                if($erreurMaintenance == true) {
                    echo "<li>". $hacklolConfig['appName'] ." est actuellement en maintenance. Veuillez réessayer ultérieurement.</li>";
                }

                if($erreurFlood == true) {
                    echo "<li>Vous devez attendre 3 minutes avant d'envoyer à nouveau un formulaire pour accéder à ". $hacklolConfig['appName'] .".</li>";
                }

                if($erreurButtonError == true) {
                    echo "<li>Il semble que vous ayez accédé à cette page sans passer par le formulaire.</li>";
                }
                if($erreurFormIncomplete == true) {
                    echo "<li>Certains champs de formulaire sont vides.</li>";
                }
                if($erreurUrlIncorrect == true) {
                    echo "<li>L'adresse URL entrée est invalide.</li>";
                }
                if($erreurUrlIP == true) {
                    echo "<li>L'adresse du site ne doit pas être une adresse IP.</li>";
                }
                if($erreurUrlHacklol == true) {
                    echo "<li>Il est impossible de modifier Hacklol avec ". $hacklolConfig['appName'] ."…</li>";
                }
                if($erreurUrlInBlacklist == true) {
                    echo '<li>L\'accès à ce site avec '. $hacklolConfig['appName'] .' a été interdit pour des raisons de sécurité et/ou suite à une demande de son webmaster.<br /><strong>Mot clef détecté :</strong> '. htmlspecialchars($verifInBl[1]) .'.</li>';
                }
                if($erreurRecaptchaIsNull == true) {
                    echo "<li>Une erreur est survenue lors de la vérification du ReCaptcha auprès du serveur de Google. Veuillez réessayer ultérieurement.</li>";
                }
                if($erreurRecaptchaIsFalse == true) {
                    echo "<li>ReCaptcha invalide.</li>";
                }
            ?>
            </ul>
        <a class="btn btn-lg btn-primary" href="/">Retour au formulaire</a>
        </div> <!-- /container -->
    </body>
</html>
<?php
}
// Si tout va bien
else {
    $_SESSION['urlPageHacklol'] = $url;
    
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
