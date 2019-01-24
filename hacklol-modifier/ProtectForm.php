<?php
function is_url_ip($url) {
    if(filter_var($url, FILTER_VALIDATE_URL) !== false) {
        $hostname = parse_url($url, PHP_URL_HOST);
    } else {
        return false;
    }

    $long = ip2long($hostname);

    if (filter_var($hostname, FILTER_VALIDATE_IP) === FALSE || $long == -1 || $long === FALSE) {
        return false;
    } else {
        return true;
    }
}
function is_ban_stats($ip_visiteur, $file) {
    require("" . $file);

    foreach($ip_ban_stats as $ip_interdite) {
        if($ip_interdite == $ip_visiteur) {
            return true;
        }
    }

    return false;
}
function is_ban($ip_visiteur, $file) {
    require("" . $file);

    foreach($ip_ban_hacklol_modifier as $ip_interdite) {
        if($ip_interdite == $ip_visiteur) {
            return true;
        }
    }

    return false;
}
// Function to know if the site is in blacklist
// Warning: returns an array with the first value of $inBlacklist and second the value of the detected keyword
function in_blacklist($urlSite, $file) {
    require("" . $file);

    if(filter_var($urlSite, FILTER_VALIDATE_URL) !== false) {
        $domain = parse_url($urlSite, PHP_URL_HOST);
    } else {
        return array(false, "");
    }

    foreach($sites_interdits as $site) {
        if(stripos($domain, $site) !== false) {
            return array(true, $site);
        }
    }

    return array(false, "");
}
?>
