FROM php:7.4-apache
RUN apt update && apt install -y libicu-dev locales && rm -rf /var/lib/apt/lists/*
RUN docker-php-ext-configure intl \
    && docker-php-ext-configure gettext \
    && docker-php-ext-install \
    intl \
    gettext
RUN sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
    sed -i -e 's/# fr_FR.UTF-8 UTF-8/fr_FR.UTF-8 UTF-8/' /etc/locale.gen && \
    sed -i -e 's/# fr.UTF-8 UTF-8/fr.UTF-8 UTF-8/' /etc/locale.gen && \
    sed -i -e 's/# en.UTF-8 UTF-8/en.UTF-8 UTF-8/' /etc/locale.gen && \
    dpkg-reconfigure --frontend=noninteractive locales && \
    update-locale LANG=en_US.UTF-8
COPY .docker/000-default.conf /etc/apache2/sites-available/000-default.conf
COPY .docker/start-apache /usr/local/bin
RUN chmod 755 /usr/local/bin/start-apache
RUN chmod +r /usr/local/bin/start-apache
RUN a2enmod rewrite
COPY . /var/www/
RUN chown -R www-data:www-data /var/www
ENTRYPOINT start-apache
