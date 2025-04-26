@echo off
echo Setting up the webshop backend...

echo Creating database file if not exists...
if not exist database (
    mkdir database
)
if not exist database\database.sqlite (
    type NUL > database\database.sqlite
)

echo Running migrations...
php artisan migrate

echo Setting up storage symlink...
php artisan storage:link

echo Setup completed!
echo You can now run 'php artisan serve' to start the server
