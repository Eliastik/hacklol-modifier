FROM alpine:3.23
 
ENV MUSL_LOCPATH="/usr/share/i18n/locales/musl"
ENV PHP_VER="php85"

RUN apk add --update --no-cache \
    bash curl ca-certificates openssl tzdata openntpd supervisor \
    apache2 apache2-proxy apache2-ssl \
    "$PHP_VER" "$PHP_VER"-apache2 "$PHP_VER"-fpm \
    gettext musl-locales musl-locales-lang icu-data-full \
    "$PHP_VER"-openssl \
    "$PHP_VER"-gettext \
    "$PHP_VER"-curl \
    "$PHP_VER"-session \
    "$PHP_VER"-intl \
    && rm -rf /tmp/* /var/cache/apk/* /var/log/apk.log
 
# Install locales
RUN cd "$MUSL_LOCPATH" \
    && for i in *.UTF-8; do cp -a "$i" "${i%%.UTF-8}"; done
 
# Create required directories in one layer
RUN mkdir -p \
    /etc/apache2/sites-available/ \
    /var/log/apache2/ \
    /etc/apache2/ssl/ \
    /run/supervisord/ \
    /var/log/"$PHP_VER"/ \
    /etc/docker-httpd/ \
    /run/apache2
 
# Copy config files
COPY /.docker/000-default.conf /etc/apache2/sites-available/000-default.conf
COPY /.docker/php-overrides.ini /etc/"$PHP_VER"/conf.d/
COPY /.docker/supervisord.conf /etc/supervisord.conf
COPY /.docker/ssl.conf /etc/apache2/conf.d/ssl.conf
COPY /.docker/start.sh /etc/docker-httpd/start.sh

COPY /.docker/fpm-pool.conf /etc/"$PHP_VER"/php-fpm.d/zz-custom.conf
 
RUN chmod +x /etc/docker-httpd/start.sh
 
# Configure Apache modules in one layer
RUN sed -i "s/#LoadModule\ rewrite_module/LoadModule\ rewrite_module/" /etc/apache2/httpd.conf \
 && sed -i "s/#LoadModule\ session_module/LoadModule\ session_module/" /etc/apache2/httpd.conf \
 && sed -i "s/#LoadModule\ session_cookie_module/LoadModule\ session_cookie_module/" /etc/apache2/httpd.conf \
 && sed -i "s/#LoadModule\ session_crypto_module/LoadModule\ session_crypto_module/" /etc/apache2/httpd.conf \
 && sed -i "s/#LoadModule\ deflate_module/LoadModule\ deflate_module/" /etc/apache2/httpd.conf \
 && sed -i "s/ErrorLog\ logs\/error.log/ErrorLog\ \/dev\/stderr/" /etc/apache2/httpd.conf \
 && sed -i "s/ErrorLog\ logs\/ssl_error.log/ErrorLog\ \/dev\/stderr/" /etc/apache2/httpd.conf \
 && sed -i "s/CustomLog\ logs\/access.log/CustomLog\ \/dev\/stdout/" /etc/apache2/httpd.conf \
 && sed -i "s/#LoadModule\ remoteip_module/LoadModule\ remoteip_module/" /etc/apache2/httpd.conf \
 && sed -i "s/#LoadModule\ logio_module/LoadModule\ logio_module/" /etc/apache2/httpd.conf \
 && sed -i "s/LoadModule\ mpm_prefork_module/#LoadModule\ mpm_prefork_module/" /etc/apache2/httpd.conf \
 && sed -i "s/#LoadModule\ mpm_event_module/LoadModule\ mpm_event_module/" /etc/apache2/httpd.conf \
 # Include custom vhosts
 && echo "IncludeOptional /etc/apache2/sites-available/*.conf" >> /etc/apache2/httpd.conf \
 # PHP-FPM via FastCGI
 && echo '<FilesMatch \.php$>' >> /etc/apache2/httpd.conf \
 && echo '    SetHandler "proxy:fcgi://127.0.0.1:9000"' >> /etc/apache2/httpd.conf \
 && echo '    ProxyErrorOverride on' >> /etc/apache2/httpd.conf \
 && echo '</FilesMatch>' >> /etc/apache2/httpd.conf \
 # Custom log format
 && echo 'LogFormat "%v:%p %h %l %u %t \"%r\" %>s %O \"%{Referer}i\" \"%{User-Agent}i\"" vhost_combined' >> /etc/apache2/httpd.conf \
 # Supprimer le module PHP natif Apache (on utilise FPM)
 && rm -f /etc/apache2/conf.d/"$PHP_VER"-module.conf
 
# Setup permissions in one layer
RUN touch /var/log/apache2/error.log \
    /var/log/"$PHP_VER"/error.log \
    /var/log/"$PHP_VER"/php-error.log \
 && chown -R apache:apache \
    /run/apache2/ \
    /run/supervisord/ \
    /var/log/apache2/ \
    /etc/apache2/ssl/ \
    /var/log/"$PHP_VER"/error.log \
    /var/log/"$PHP_VER"/php-error.log \
 && chmod -R 770 /run/apache2/ /run/supervisord/ /var/log/apache2/ \
 && chmod -R 750 /etc/apache2/ssl/

# Copy app files
RUN mkdir -p /var/www/hacklol-modifier
COPY www/ /var/www/hacklol-modifier
RUN chown -R apache:apache /var/www/hacklol-modifier

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD wget -q --no-cache --spider http://localhost/ || exit 1
 
ENTRYPOINT ["/etc/docker-httpd/start.sh"]