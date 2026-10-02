# 1. Imagen base: Usamos PHP 8.3 con Apache preinstalado como servidor web oficial
FROM php:8.3-apache

# 2. Actualizar el sistema e instalar librerías del sistema operativo necesarias para Laravel
RUN apt-get update && apt-get install -y \
    libpq-dev \    # Librería para la conexión con bases de datos PostgreSQL
    libzip-dev \   # Librería para manejar archivos comprimidos ZIP
    libicu-dev \   # Librería para internacionalización (intl)
    libpng-dev \   # Librería para procesamiento de imágenes (GD)
    zip \
    unzip \
    git \
    && docker-php-ext-configure intl \
    && docker-php-ext-install pdo pdo_pgsql zip intl gd bcmath

# 3. Instalar Composer (el gestor de dependencias de PHP) 
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# 4. Definir el directorio de trabajo dentro del contenedor (dónde se alojará la app web)
WORKDIR /var/www/html

# 5. Copiar todo el código fuente del proyecto al contenedor 
# (Gracias al archivo .dockerignore, las carpetas locales como 'vendor' o '.env' se ignoran de forma segura)
COPY . .

# 6. Instalar las dependencias de producción de PHP mediante Composer (sin paquetes de desarrollo y optimizando el autoloader)
RUN composer install --no-dev --optimize-autoloader

# 7. Asignar los permisos correctos al usuario de Apache para las carpetas de almacenamiento y caché de Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# 8. Reconfigurar Apache para que apunte directamente a la carpeta 'public' de Laravel (por seguridad y funcionamiento de rutas)
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2.conf

# Habilitar el módulo de reescritura de URLs de Apache (indispensable para las rutas de Laravel)
RUN a2enmod rewrite

# Exponer el puerto 80 para que Render pueda recibir las peticiones web HTTP
EXPOSE 80