# --- Compilar el Frontend (React + TypeScript + Tailwind) ---
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---  Servidor de Producción con PHP y Apache ---
FROM php:8.3-apache

# Instalar dependencias del sistema y extensiones de PHP necesarias para Laravel y Postgres
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

# Habilitar el módulo rewrite de Apache (rutas de Laravel)
RUN a2enmod rewrite

# Configurar el directorio público de Laravel en Apache
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copiar el código del proyecto
WORKDIR /var/www/html
COPY . .

# Copiar los assets compilados de React
COPY --from=frontend-builder /app/public/build ./public/build

# Instalar dependencias de PHP para producción
RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs

# Configurar permisos correctos para que Laravel pueda escribir en caché y logs
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Exponer el puerto por defecto de Render
EXPOSE 80

CMD ["apache2-foreground"]