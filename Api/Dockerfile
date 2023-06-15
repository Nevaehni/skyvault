FROM php:8.1-apache

# Set working directory
WORKDIR /var/www/html

# Copy project files
COPY . .

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    libmagickwand-dev --no-install-recommends \
    fonts-dejavu-core \
    fontconfig

# Download and install Ghostscript 9.27
RUN wget https://github.com/ArtifexSoftware/ghostpdl-downloads/releases/download/gs927/ghostscript-9.27.tar.gz \
    && tar xzf ghostscript-9.27.tar.gz \
    && cd ghostscript-9.27 \
    && ./configure \
    && make \
    && make install \
    && cd .. \
    && rm -rf ghostscript-9.27

# Download and install Imagick 3.4.3
RUN pecl install imagick-3.4.3 \
    && docker-php-ext-enable imagick

# Install PHP extensions
RUN apt-get install -y \
    libzip-dev \
    zip \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Enable Apache modules
RUN a2enmod rewrite

# Install Laravel dependencies
RUN composer install --no-interaction --no-scripts --no-suggest --optimize-autoloader

# Set file permissions
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache
RUN chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Set up Apache configuration
COPY ./000-default.conf /etc/apache2/sites-available/000-default.conf

# Expose port 8000
EXPOSE 8001

# Add wait-for-it script to the container
ADD https://github.com/vishnubob/wait-for-it/raw/master/wait-for-it.sh /usr/bin/wait-for-it
RUN chmod +x /usr/bin/wait-for-it

# Set environment variable to track migration status
ENV RUN_MIGRATIONS=false

# Run key generation, wait for the database before running migrations, and set RUN_MIGRATIONS to true
CMD bash -c 'php artisan key:generate && wait-for-it -t 60 database:3306 -- bash -c "if [ \"$RUN_MIGRATIONS\" = false ]; then php artisan migrate:fresh --seed --force && export RUN_MIGRATIONS=true; fi" && php artisan serve --host 0.0.0.0 --port 8001'
