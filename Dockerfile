FROM php:8.3-apache

# 1. Instalar dependencias del sistema y extensiones de PHP requeridas por Laravel
RUN apt-get update && apt-get install -y \
    libpq-dev \
    libzip-dev \
    libicu-dev \
    libpng-dev \
    libxml2-dev \
    libonig-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-configure intl \
    && docker-php-ext-install pdo pdo_pgsql zip intl gd bcmath mbstring xml ctype

# 2. Instalar Composer globalmente
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 3. Definir el directorio de trabajo
WORKDIR /var/www/html

# 4. Copiar los archivos del proyecto
COPY . .

# 5. Instalar dependencias de PHP (sin dependencias de desarrollo para producción)
RUN composer install --no-dev --optimize-autoloader

# 6. Ajustar permisos de las carpetas de almacenamiento y caché de Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# 7. Apuntar Apache a la carpeta public de Laravel
RUN sed -ri -e 's!/var/www/html!/var/www/html/public!g' /etc/apache2/sites-available/000-default.conf

# 8. Permitir sobreescritura de .htaccess (Vital para las rutas de Laravel)
RUN echo '<Directory /var/www/html/public>\n\
    Options Indexes FollowSymLinks\n\
    AllowOverride All\n\
    Require all granted\n\
</Directory>' >> /etc/apache2/apache2.conf

# 9. Habilitar módulo de reescritura de Apache
RUN a2enmod rewrite

# 10. Exponer el puerto 80
EXPOSE 80