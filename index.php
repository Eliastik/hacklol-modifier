<?php
        @session_start();
        @session_unset();
        @session_destroy();
        
        require("config.php");
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

        <link href="/bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
        <link href="/index.css" rel="stylesheet">

        <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
              <script src="/bower_components/html5shiv/dist/html5shiv.min.js"></script>
              <script src="/bower_components/respond/dest/respond.min.js"></script>
        <![endif]-->
        <?php
            if($hacklolConfig['enableRecaptcha'] == true) { ?>
        
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>
        <?php } ?>
        
    </head>
    <body>
        <div class="container">
            <form class="form-signin" method="post" action="/hacklol-modifier/index.php">
                <h2 class="form-signin-heading"><?php echo $hacklolConfig['appName']; ?></h2>
                <p>Entrez l'adresse du site web que vous souhaitez modifier. <strong>L'adresse doit commencer par http://</strong></p>
                <div class="checkbox">
                    <label for="inputEmail" class="sr-only">Adresse du site web</label>
                    <input type="url" id="siteurl" name="siteurl" class="form-control" placeholder="Adresse du site web" value="<?php echo $hacklolConfig['defaultWebsite']; ?>" required autofocus>
                </div>
                <?php
                    if($hacklolConfig['enableRecaptcha'] == true) { ?>
                        
                 <div class="g-recaptcha" data-lang="fr" data-sitekey="<?php echo $hacklolConfig['recaptchaPublicKey']; ?>" data-theme="white" style="margin-bottom: 10px;"></div>
                <?php } ?>
                
                <input id="valider" name="valider" class="btn btn-lg btn-primary btn-block" value="Valider" type="submit" />
            </form>
        <footer>
            By <a href="http://www.eliastiksofts.com" target="_blank">Eliastik</a> – <a href="https://github.com/Eliastik/hacklol-modifier/" target="_blank">Code source sur Github</a> – <a href="http://hacklol.eliastiksofts.com" target="_blank">Site web Hacklol officiel</a>
            <div class="version">Version <?php echo $hacklolConfig['appVersion']; ?></div>
        </footer>
        </div> <!-- /container -->
    </body>
</html>
