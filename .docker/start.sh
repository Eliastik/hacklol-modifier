#!/bin/sh
set -e

mkdir -p /run/apache2
mkdir -p /run/supervisord

rm -f /run/apache2/httpd.pid
rm -f /run/supervisord/supervisord.pid
rm -f /run/supervisord/supervisord.sock

exec /usr/bin/supervisord -n -c /etc/supervisord.conf