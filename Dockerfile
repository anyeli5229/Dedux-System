
# Etapa 1: Compilar React, TypeScript y Vite
FROM node:22-bookworm-slim AS frontend

WORKDIR /var/www/html

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# Etapa 2: Ejecutar Laravel con PHP y Apache
FROM php:8.3-apache

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
    && docker-php-ext-install pdo pdo_pgsql zip intl gd bcmath mbstring xml ctype \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

COPY . .

# Instalar dependencias PHP de producción
RUN composer install --no-dev --optimize-autoloader

# Copiar los recursos recién compilados por Vite
COPY --from=frontend /var/www/html/public/build /var/www/html/public/build

# Configurar permisos de Laravel
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Configurar Apache para Laravel
RUN sed -ri 's!/var/www/html!/var/www/html/public!g' \
    /etc/apache2/sites-available/000-default.conf \
    && printf '<Directory /var/www/html/public>\n\
    Options FollowSymLinks\n\
    AllowOverride All\n\
    Require all granted\n\
</Directory>\n' >> /etc/apache2/apache2.conf \
    && a2enmod rewrite

EXPOSE 80
