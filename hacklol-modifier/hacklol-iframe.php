<?php
    if(empty($_GET['q'])) {
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
        <iframe src="" style="width:100%;height:100%;position:absolute;top:0px;left:0px;border:0px;" frameBorder="0" sandbox="allow-forms allow-popups allow-scripts allow-same-origin" id="hacklol-iframe-protected" name="hacklol-iframe-protected"></iframe>

        <script type="text/javascript">
            window.onload = function() {
                document.getElementById("hacklol-iframe-protected").src = <?php echo json_encode(urldecode($_GET['q']), JSON_HEX_QUOT | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS); ?>;
            };
        </script>
    </body>
</html>
