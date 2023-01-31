## Prerequisites

1. Your PC must be install GIT **_(Required)_**
2. Your PC must be installed `PHP` with **8.1.13** version or greater **_(Required)_**
3. Your PC must be installed `NodeJS` with latest version **_(Required)_**
4. Your PC should optionally installed **Yarn package manager** with latest version **_(Optional)_**

## Setup Project Part 1

1. First clone this project by typing `git clone https://github.com/rachmizard/sawargi-ticketing-app.git` if you decide to use HTTPS
2. Next, type in your terminal `composer install` to install the dependencies to our application
3. Next, after dependencies folder `vendor` deployed, type in your terminal `yarn install`

## Setup Utility Project Part 2

1. Create your database using mysql named `sawargi_ticket_db`
2. Next, edit `.env` file in your root project application, for full example which following :

> DB_CONNECTION=mysql

> DB_HOST=127.0.0.1 		

> DB_PORT=3306

> DB_DATABASE=sawargi_ticket_db 		

> DB_USERNAME="your DB username here" 

> DB_PASSWORD="your DB password here"

3. Once done, type `php artisan migrate` or `php artisan migrate:refresh` to migrate the tables
4. Next, type in your terminal `php artisan db:seed` to inject sample master data
5. Last type `php artisan storage:link` to link your storage application

## Running your local application

1. To run the Application Server first, type `php artisan serve`
2. Second, run your Client Application by typing `yarn hot` to listen any changes during development
