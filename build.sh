#!/usr/bin/env bash

composer install --no-dev --optimize-autoloader --no-interaction

npm ci --production
npm run build

if [ -z "$APP_KEY" ]; then
    php artisan key:generate --show
fi

php artisan config:cache
php artisan route:cache
php artisan view:cache

php artisan migrate --force