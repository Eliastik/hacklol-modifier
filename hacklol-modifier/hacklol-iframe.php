<?php
    preg_match("/([^q=]+)(.+)/i", parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY), $urlSite);

    if(count($urlSite) > 0) {
        $urlSite = htmlspecialchars($urlSite[0]);
    } else {
        die();
    }
?>
<html>
    <head>
        <title>Hacklol Modifier - Affichage protégé du site</title>
        <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    </head>
    <body>
            <script type="text/javascript">
                var prevent_bust = 0
                window.onbeforeunload = function() { prevent_bust++ }
                setInterval(function() {
                    if (prevent_bust > 0) {
                    prevent_bust -= 2
                    window.top.location = "hacklol-204.php"
                    }
                }, 1)
            </script>
        <iframe src="<?php echo $urlSite; ?>" style="width:100%;height:100%;position:absolute;top:0px;left:0px;border:0px;" frameBorder="0" sandbox="allow-forms allow-popups allow-scripts allow-same-origin" id="hacklol-iframe-protected" name="hacklol-iframe-protected"></iframe>
    </body>
</html>
