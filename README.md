# Webshop Project

A Laravel-based webshop application running in Docker.

## Getting Started

These instructions will help you set up the project on your local machine for development.

### Prerequisites

- Docker and Docker Compose installed on your machine
- Git

### Installation

1. Clone the repository
   ```
   git clone <your-repository-url>
   cd webshop-project
   ```

2. Start the Docker containers
   ```
   docker-compose up -d
   ```

3. The application will automatically install Laravel if it's not already installed.

4. Set up your environment file
   ```
   cp .env.example .env
   docker-compose exec app php artisan key:generate
   ```

5. Run database migrations
   ```
   docker-compose exec app php artisan migrate
   ```

6. Access the application at http://localhost:8000

### Common Commands

- Run artisan commands:
  ```
  docker-compose exec app php artisan <command>
  ```

- Install Composer packages:
  ```
  docker-compose exec app composer require <package>
  ```

- Run database migrations:
  ```
  docker-compose exec app php artisan migrate
  ```

- Run tests:
  ```
  docker-compose exec app php artisan test
  ```

## License

This project is licensed under the MIT License.
