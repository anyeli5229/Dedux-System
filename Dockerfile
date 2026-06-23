# ==========================================
# ETAPA 1: Construcción nativa en Linux (Temporal)
# ==========================================
FROM composer:latest AS builder

WORKDIR /app

# Copiar solo los archivos de dependencias
COPY composer.json composer.lock ./

# INSTALACIÓN ELIMINANDO RESTRICCIONES DE EXTENSIONES O PHP (--ignore-platform-reqs)
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist --no-interaction --ignore-platform-reqs

# Copiar el resto del código para generar el autoloader real
COPY . .
RUN composer dump-autoload --no-dev --classmap-authoritative --no-scripts

# ==========================================
# ETAPA 2: Servidor de Producción Final (Apache)
# ==========================================
FROM php:8.3-apache

# Instalar extensiones de PHP requeridas por Laravel
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    libpq-dev \
    zip \
    unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd zip pdo pdo_pgsql

# Habilitar el módulo rewrite de Apache
RUN a2enmod rewrite

# Configurar el directorio público de Laravel
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Configurar directorio de trabajo final
WORKDIR /var/www/html

# 1. Copiar el código limpio de tu repositorio local (incluyendo public/build de React)
COPY . .

# 2. TRAER LA CARPETA VENDOR PERFECTA DESDE LA ETAPA DE COMPILACIÓN LINUX
COPY --from=builder /app/vendor /var/www/html/vendor

# Configurar permisos para que Laravel pueda escribir sin trabas
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/vendor

# Forzar dinámicamente a Apache a escuchar en el puerto de Render
RUN sed -i 's/Listen 80/Listen ${PORT}/g' /etc/apache2/ports.conf
RUN sed -i 's/<VirtualHost \*:80>/<VirtualHost \*:${PORT}>/g' /etc/apache2/sites-available/*.conf

CMD ["apache2-foreground"]