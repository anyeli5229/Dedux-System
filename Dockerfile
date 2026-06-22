# Servidor de Producción Ultra Ligero con PHP y Apache
FROM php:8.3-apache

# Instalar dependencias del sistema y extensiones de PHP necesarias
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

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copiar todo el código del proyecto
WORKDIR /var/www/html
COPY . .

# 1. Configurar permisos primero (Es vital para que Composer y Laravel no colapsen al escribir)
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# 2. Instalar dependencias de PHP de forma ultra plana
RUN composer install --no-dev --no-scripts --no-autoloader --ignore-platform-reqs

# 3. Generar un autoloader básico y súper ligero (Consume casi 0 MB de RAM)
RUN composer dump-autoload --no-dev

# Forzar dinámicamente a Apache a escuchar en el puerto de Render
RUN sed -i 's/Listen 80/Listen ${PORT}/g' /etc/apache2/ports.conf
RUN sed -i 's/<VirtualHost \*:80>/<VirtualHost \*:${PORT}>/g' /etc/apache2/sites-available/*.conf

CMD ["apache2-foreground"]