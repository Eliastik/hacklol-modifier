<?php
// Hacklol Modifier configuration file
// Do not delete this file!

$hacklolConfig = [
    "appName" => "Hacklol Modifier", // Change if you want to use another name for the app (don't forget to change the app name in hacklol_modifier/assets/src/js/main.js and the favicon.ico, then to run the command Gulp (see the README file))
    "shortAppName" => "Hacklol",
    "pageLoaderName" => "Hacklol Page Loader",
    "appVersion" => "1.4.1 REV6",
    "defaultWebsite" => "",
    "enableRecaptcha" => false, // Enable Google Recaptcha v2
    "recaptchaPublicKey" => "", // To get a Recaptcha key -> https://www.google.com/recaptcha/admin
    "recaptchaPrivateKey" => "",
    "disableSessionCheckForLocalhost" => true, // Disable session check for Hacklol Page Loader when the client is localhost
    "updateURL" => "https://hacklol.eliastiksofts.com/api/v1/update",
    "updateUserAgent" => "Mozilla/5.0 (X11; Ubuntu; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36",
];