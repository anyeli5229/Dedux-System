# Servidor de Producción con PHP y Apache (Sin compilación en la nube)
FROM php:8.3-apache

# Instalar dependencias del sistema y extensiones necesarias
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    libpq-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd zip pdo pdo_pgsql

# Habilitar el módulo rewrite de Apache
RUN a2enmod rewrite

# Configurar el directorio público de Laravel
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

WORKDIR /var/www/html
COPY . .

# VOLVER A MAPEAR EL AUTOLOADER DE FORMA ULTRA LIGERA PARA LINUX (Cero consumo de RAM)
RUN --mount=type=bind,from=composer:latest,source=/usr/bin/composer,target=/usr/bin/composer \
    composer dump-autoload --no-dev --classmap-authoritative --ignore-platform-reqs

# Configurar permisos para las carpetas de Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/vendor

# Forzar dinámicamente a Apache a escuchar en el puerto de Render
RUN sed -i 's/Listen 80/Listen ${PORT}/g' /etc/apache2/ports.conf
RUN sed -i 's/<VirtualHost \*:80>/<VirtualHost \*:${PORT}>/g' /etc/apache2/sites-available/*.conf

CMD ["apache2-foreground"]