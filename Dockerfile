# Servidor de Producción con PHP y Apache
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

# Instalar Composer de forma oficial
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# CONFIGURAR LÍMITE DE MEMORIA INTERNA PARA COMPOSER Y PHP
ENV COMPOSER_MEMORY_LIMIT=512M

# Configurar directorio de trabajo
WORKDIR /var/www/html

# Copiar PRIMERO solo los archivos de Composer (Optimiza la caché de Docker)
COPY composer.json composer.lock ./

# INSTALACIÓN NATIVA DIRECTA (Con la variable de entorno ya inyectada)
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist --no-interaction

# Copiamosr el resto del código del proyecto (incluyendo public/build de React)
COPY . .

# Generamos el autoloader limpio y nativo en Linux de forma ligera
RUN composer dump-autoload --no-dev --no-scripts

# Configurar permisos para que Laravel pueda escribir
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Forzar dinámicamente a Apache a escuchar en el puerto de Render
RUN sed -i 's/Listen 80/Listen ${PORT}/g' /etc/apache2/ports.conf
RUN sed -i 's/<VirtualHost \*:80>/<VirtualHost \*:${PORT}>/g' /etc/apache2/sites-available/*.conf

CMD ["apache2-foreground"]