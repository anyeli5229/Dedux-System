# ==========================================
# ETAPA 1: Construcción nativa en Linux (Composer y NodeJS)
# ==========================================
FROM php:8.3-cli AS builder

WORKDIR /app

# Instalar dependencias del sistema necesarias para Composer y Node
RUN apt-get update && apt-get install -y \
    curl \
    zip \
    unzip \
    git \
    libpq-dev \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Copiar Composer oficial
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copiar dependencias del backend y frontend
COPY composer.json composer.lock package.json package-lock.json ./

# Instalar dependencias borrando restricciones
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist --no-interaction --ignore-platform-reqs
RUN npm ci

# Copiar todo el código del proyecto
COPY . .

# Correr el build de Vite directamente en Linux y generar el autoloader
RUN npm run build
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

# 1. Copiar el código base limpio en el repositorio
COPY . .

# 2. TRAER VENDOR Y EL BUILD DESDE EL BUILDER DE LINUX
COPY --from=builder /app/vendor /var/www/html/vendor
COPY --from=builder /app/public/build /var/www/html/public/build

# Configurar permisos para que Laravel pueda escribir sin trabas
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache /var/www/html/vendor /var/www/html/public/build

# Forzar dinámicamente a Apache a escuchar en el puerto de Render
RUN sed -i 's/Listen 80/Listen ${PORT}/g' /etc/apache2/ports.conf
RUN sed -i 's/<VirtualHost \*:80>/<VirtualHost \*:${PORT}>/g' /etc/apache2/sites-available/*.conf

# Corre las migraciones antes de encender Apache
CMD php artisan migrate --force && apache2-foreground