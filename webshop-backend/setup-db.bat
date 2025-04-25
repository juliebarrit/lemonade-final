@echo off
echo Setting up the database for webshop backend...

echo Creating database directory if not exists...
if not exist database (
    mkdir database
)

echo Creating empty SQLite database file...
if not exist database\database.sqlite (
    type NUL > database\database.sqlite
)

echo Running database migrations...
php artisan migrate --force

echo Setting up storage link for uploaded files...
php artisan storage:link

echo Setup completed successfully!
echo You can now run 'php artisan serve' to start the server.
pause
