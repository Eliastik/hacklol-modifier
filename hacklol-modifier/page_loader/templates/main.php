<?php
    include("../../config.php");
    if(isset($hacklolConfig)) {
        $appName = $hacklolConfig['pageLoaderName'];
    } else {
        $appName = "Hacklol Page Loader";
    }
?>
<!DOCTYPE html>
<html>
<head>

<title><?php echo $appName; ?></title>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="version" content="<?=$version;?>">

<style type="text/css">
html body {
    font-family: Arial,Helvetica,sans-serif;
    font-size: 12px;
}

#container {
    width:500px;
    margin:0 auto;
    margin-top:150px;
}

.error {
    color:red;
    font-weight:bold;
}

#frm {
    padding:10px 15px;
    background-color:#FFC8C8;

    border:1px solid #818181;

    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
}

#footer {
    text-align:center;
    font-size:10px;
    margin-top:35px;
    clear:both;
}
</style>

</head>

<body>


<div id="container">

    <div style="text-align:center;">
        <h1 style="color:blue;"><?php echo $appName; ?></h1>
    </div>

    <?php if(isset($error_msg)){ ?>

    <div class="error">
        <p><?php echo $error_msg; ?></p>
        <p>Une erreur est survenue. <a href="#" onclick="javascript:location.reload();">Essayez de recharger cette page</a>, ou <a href="#" onclick="javascript:history.back();">essayez de retourner &agrave; la page pr&eacute;c&eacute;dente</a>.</p>
        <p>An error has occured. <a href="#" onclick="javascript:location.reload();">Try to reload this page</a>, or <a href="#" onclick="javascript:history.back();">try to back to the previous page</a>.
    </div>

    <?php } ?>

    <?php if(isset($error_protect_plugin)){ ?>

    <div class="error">
        <p><?php echo $error_protect_plugin; ?></p>
    </div>

    <?php } ?>

    <?php if(isset($_GET['urlPage'])) { ?>

    <form action="index.php" method="post" style="margin-bottom:0; display: none;" name="formHPL">
        <input name="url" id="urlInput" type="text" style="width:400px;" autocomplete="off" placeholder="http://" value="" />
        <input type="submit" value="Go" />
    </form>
    <div style="text-align: center;"><img src="/hacklol-modifier/assets/img/chargement.gif" alt="Chargement/Loading" style="vertical-align: middle;" /></div>
    <script type="text/javascript">
        window.onload = function() {
            document.getElementById("urlInput").value = <?php echo json_encode(urldecode($_GET['urlPage'])); ?>;
            document.formHPL.submit();
        };
    </script>

    <?php } ?>
</div>

<div id="footer">Bas&eacute; sur <a href="//www.php-proxy.com/" target="_blank">PHP-Proxy</a><br />Based on <a href="//www.php-proxy.com/" target="_blank">PHP-Proxy</a></div>


</body>
</html>
