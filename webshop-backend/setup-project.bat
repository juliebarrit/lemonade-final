@echo off
echo ======================================
echo Setting up Webshop Backend Project
echo ======================================

echo Copying .env.example to .env...
copy .env.example .env

echo Creating SQLite database...
if not exist database (
    mkdir database
)
if not exist database\database.sqlite (
    type NUL > database\database.sqlite
)

echo Installing Composer dependencies...
composer install

echo Generating application key...
php artisan key:generate

echo Running migrations...
php artisan migrate:fresh

echo Seeding the database...
php artisan db:seed

echo Setting up storage link...
php artisan storage:link

echo Creating image directories...
if not exist public\storage\images (
    mkdir public\storage\images
)

echo Copying default images...
if not exist public\storage\images\default-pink-earrings.webp (
    copy resources\default-images\default-pink-earrings.webp public\storage\images\
)
if not exist public\storage\images\default-blue-necklace.webp (
    copy resources\default-images\default-blue-necklace.webp public\storage\images\
)

echo ======================================
echo Setup completed successfully!
echo You can now run 'php artisan serve' to start the server.
echo ======================================
pause
