# Webshop Project

A full-stack webshop application built with Next.js and Laravel.

## Setup Instructions

### Backend (Laravel)

1. Navigate to the backend directory:
   ```
   cd webshop-backend
   ```

2. Run the setup script:
   ```
   setup-project.bat  # Windows
   ```
   
   Or manually:
   ```
   cp .env.example .env
   composer install
   php artisan key:generate
   php artisan migrate:fresh --seed
   php artisan storage:link
   ```

3. Start the Laravel server:
   ```
   php artisan serve
   ```

### Frontend (Next.js)

1. Navigate to the main project directory
   ```
   cd webshop-project
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

## Missing Dependencies Fix

If you encounter an error about missing `react-toastify`, run:
```
npm install react-toastify
```

## Database

This project uses SQLite for local development to make it easier for team members to have the same products during development.

- The database file is located at `webshop-backend/database/database.sqlite`
- Default products are populated via seeders

## Contributing

When adding new products to the database, please update the `ProductSeeder.php` file to ensure all team members can have the same products in their local environment.

## License

This project is licensed under the MIT License.
