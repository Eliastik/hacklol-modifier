<?php
        @session_start();
        @session_unset();
        @session_destroy();

        require("config.php");
        require("locales.php");
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="author" content="Eliastik">
        <link rel="icon" href="/favicon.ico">

        <title><?php echo $hacklolConfig['appName']; ?></title>

        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="css/index.css" rel="stylesheet">
        <script src="js/dark-mode.js"></script>
        <?php
            if($hacklolConfig['enableRecaptcha'] == true) { ?>

        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
        <?php } ?>
    </head>
    <body>
        <div class="container">
            <form class="form-signin" method="post" action="/hacklol-modifier/index.php">
                <h2 class="form-signin-heading"><?php
                if(strtoupper($hacklolConfig['appName']) == "HACKLOL MODIFIER") {
                    echo '<img src="img/logo_hacklol_modifier.png" width="306" alt="Hacklol Modifier" class="img-auto-resize" id="logo-hacklol-light" />';
                    echo '<img src="img/logo_hacklol_modifier_dark.png" width="306" alt="Hacklol Modifier" class="img-auto-resize" id="logo-hacklol-dark" />';
                } else {
                    echo $hacklolConfig['appName'];
                }
                ?></h2>
                <p><?php echo _("enter-address") ?> <strong><?php echo _("url-http") ?></strong></p>
                <div class="checkbox">
                    <input type="url" id="siteurl" name="siteurl" class="form-control" placeholder="<?php echo _("url-site-placeholder") ?>" value="<?php echo $hacklolConfig['defaultWebsite']; ?>" required autofocus>
                </div>
                <?php
                    if($hacklolConfig['enableRecaptcha'] == true) { ?>

                 <div class="g-recaptcha" data-lang="fr" data-sitekey="<?php echo $hacklolConfig['recaptchaPublicKey']; ?>" data-theme="white" style="margin-bottom: 10px;"></div>
                <?php } ?>

                <div class="d-grid gap-2">
                    <input id="valider" name="valider" class="btn btn-lg btn-primary" value="<?php echo _("form-validate") ?>" type="submit" />
                </div>
            </form>
            <footer>
                By <a href="http://www.eliastiksofts.com" target="_blank">Eliastik</a> – <a href="https://github.com/Eliastik/hacklol-modifier/" target="_blank"><?php echo _("source-code") ?></a> – <a href="http://hacklol.eliastiksofts.com" target="_blank"><?php echo _("hacklol-official") ?></a>
                <div class="version">Version <?php echo $hacklolConfig['appVersion']; ?> <span id="newVersion" style="display: none; color: blue;">–</span> <span id="newVersionText" style="color: blue;"></span> <span id="newVersionLink" style="color: blue;"></span></span></div>
                <div class="lang"><a href="?lang=fr">Français</a> – <a href="?lang=en">English</a></div>
                <div class="theme" id="bd-theme"><button type="button" class="btn btn-link" data-bs-theme-value="light"><?php echo _("lightTheme"); ?></button> – <button type="button" class="btn btn-link" data-bs-theme-value="dark"><?php echo _("darkTheme"); ?></button> – <button type="button" class="btn btn-link" data-bs-theme-value="auto"><?php echo _("autoTheme"); ?></button></div>
            </footer>
            <?php
                $ch = curl_init($hacklolConfig["updateURL"]);

                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_HEADER, 0);
                curl_setopt($ch, CURLOPT_USERAGENT, $hacklolConfig["updateUserAgent"]);
                curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

                $data = json_decode(curl_exec($ch));

                curl_close($ch);

                if(isset($data) && isset($data->version)) {
                    if(version_compare($hacklolConfig["appVersion"], $data->version) < 0) {
            ?>
                <div class="text-center text-info-emphasis">
                    <?php echo _("new-version-available"); ?>
                    <a href="<?php echo htmlspecialchars($data->url) ?>" target="_blank" style="inline-block"><?php echo _("download-new-version") ?></a>
                </div>
            <?php
                }
            }
            ?>
        </div> <!-- /container -->
    </body>
</html>