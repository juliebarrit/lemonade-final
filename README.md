# Webshop Project

This repository contains a web shop application that works across both Windows and Mac operating systems.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or newer recommended)
- [PHP](https://www.php.net/) (version 8.0 or newer)
- [Composer](https://getcomposer.org/)
- npm (comes with Node.js)
- Git

## Setup Instructions

### For all platforms (Windows, macOS, Linux)

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/webshop-project.git
   ```

2. Navigate to the project directory:
   ```
   cd webshop-project
   ```

3. Configure Git for cross-platform compatibility:
   ```
   git config core.autocrlf input
   ```

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd webshop-backend
   ```

2. Install PHP dependencies:
   ```
   composer install
   ```

3. Set up environment file:
   - Copy the example environment file: 
     - On Mac/Linux: `cp .env.example .env`
     - On Windows: `copy .env.example .env`
   - Generate application key:
     ```
     php artisan key:generate
     ```

4. Set up the database:
   ```
   php artisan migrate
   ```

5. Start the Laravel server:
   ```
   php artisan serve
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd ../webshop-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

## Environment Files

**Important**: Environment files (`.env`) contain sensitive information and are not committed to the repository for security reasons.

- The `.env.example` file serves as a template.
- Copy `.env.example` to `.env` and update the values as needed.
- Never commit your actual `.env` files to the repository!

## Line Ending Issues

This project uses Git's line ending normalization to ensure code works across platforms:

1. If you encounter line ending warnings:
   ```
   git config --global core.autocrlf input   # For Mac/Linux
   git config --global core.autocrlf true    # For Windows
   ```

2. For existing files with wrong line endings:
   ```
   git add --renormalize .
   ```

3. The `.gitattributes` file ensures consistent line endings for specific file types.

## Permission Issues

If you encounter permission issues with `.next/trace` or similar directories:

### On Mac/Linux:
```
chmod -R 755 .next
```

### On Windows:
Right-click the folder, go to Properties > Security tab, and ensure your user has Full Control.

## Troubleshooting

- **Path issues**: Ensure all file paths in code use forward slashes (/) rather than backslashes (\)
- **Line ending issues**: Follow the instructions in the "Line Ending Issues" section
- **Database issues**: If using SQLite, make sure the database file has write permissions
- **Cache issues**: Try clearing Next.js cache with `rm -rf .next` or `rd /s /q .next` on Windows

## License

[MIT](LICENSE)
