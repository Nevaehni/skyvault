# SkyVault

This project aims to provide users with a reliable and efficient cloud storage platform similar to Google Drive. Users can create their accounts, enabling them to access their files remotely from any location, and with any internet-connected device.

The platform offers users a broad range of features such as uploading, downloading, sharing, managing permissions, and organizing files into folders. The sharing functionality provides users with the ability to collaborate with others by allowing them to share their files with specific individuals or groups. Users can also manage permissions and access levels for shared files to maintain privacy and security.

## Motivation

The motivation for creating a cloud storage platform like Google Drive is to solve the problem of limited storage capacity on personal devices and the need for remote access to files. 
Many individuals and businesses have a large amount of data that they need to store, but they do not have the storage capacity to do so on their local devices. 
Additionally, people need to be able to access their files remotely, whether they are traveling, working from home, or collaborating with others.

By providing a cloud storage platform, users can easily store, access, and share their files from any device with an internet connection. 
This solves the problem of limited storage capacity and allows users to work from anywhere. 
Furthermore, by allowing users to manage their own permissions and share their files with others, collaboration and teamwork can be improved. 

## Technology stack

The chosen technology stack for this cloud storage platform includes HTML/JS/CSS for the front-end and PHP/Mysql for the back-end.

HTML/JS/CSS is a popular front-end technology stack that enables the creation of responsive and interactive user interfaces. HTML provides the structure of the web page, CSS is used for styling and layout, and JavaScript is used for adding interactivity and functionality to the web page. By using this technology stack, we can provide users with a user-friendly and intuitive interface, allowing for easy navigation and access to various features of the platform.

On the other hand, PHP/Mysql is a powerful back-end technology stack that can handle complex data processing and management. PHP is a server-side scripting language used for building dynamic web applications, and MySQL is an open-source relational database management system that is widely used for storing and retrieving data. By using PHP/Mysql, we can manage user data and provide a seamless experience for users when accessing and managing their files.

Overall, this technology stack contributes to solving the business problem by enabling the creation of a robust and scalable cloud storage platform. With a powerful front-end interface and a reliable back-end management system, we can ensure that users can upload, download, share, and manage their files with ease. Additionally, the use of PHP/Mysql ensures that user data is managed efficiently and securely, providing users with peace of mind when storing sensitive data on the platform. 

###  Chosen frameworks
The technology stack for this cloud storage platform includes Next.js for the front-end, Laravel for the back-end, and Spatie media library for file management.

#### Next.js for Front-end
Next.js is a popular front-end JavaScript framework that allows for server-side rendering, automatic code splitting, and optimized performance. It offers a great developer experience with a wide range of features that make building complex applications more manageable. Next.js provides a smooth and seamless user experience, making it an ideal choice for building the front-end of a cloud storage platform.

#### Laravel for Back-end
Laravel is a powerful PHP-based web application framework with a range of features that make back-end development more manageable. It provides a robust set of tools for building complex applications, including database migrations, routing, and authentication. Laravel is easy to learn and maintain, making it a reliable choice for building the back-end of a cloud storage platform.

#### Spatie Media Library for File Management
Spatie Media Library is a PHP library that provides a convenient way to manage files in Laravel applications. It offers a range of features, including file uploading, image manipulation, and video conversion. Spatie Media Library provides a simple and efficient way to manage files, making it an ideal choice for the file management component of a cloud storage platform.

Overall, the chosen frameworks provide a robust and reliable technology stack for building a cloud storage platform. The use of Next.js for the front-end, Laravel for the back-end, and Spatie Media Library for file management offers a comprehensive solution for managing files in a cloud storage platform. These frameworks provide a user-friendly interface, efficient data management, and secure file storage capabilities, ensuring that the platform meets the needs of users while maintaining high performance and reliability.

### Scalability 
Optional section with explanation of how the code is designed with scalability in mind.
More info can be found here:
[https://lib.hva.nl/permalink/31UKB_UAM2_INST/1btjd75/alma9939263288505132
](https://lib.hva.nl/permalink/31UKB_UAM2_INST/1btjd75/alma9939263288505132)

### Privacy
Optional section with explanation of how the code is designed with privacy in mind.
For more info: [https://www.nldigital.nl/news/avg-uitgelegd-deel-3-privacy-by-design-privacy-by-default/](https://www.nldigital.nl/news/avg-uitgelegd-deel-3-privacy-by-design-privacy-by-default/)


## Repository overview
```
# Next.js directory structure

└── src
    ├── components
    ├── hooks
    ├── lib
    └── pages

# Laravel directory structure

├── app
│   ├── Console
│   ├── Exceptions
│   ├── Http
│   │   ├── Controllers
│   │   ├── Middleware
│   │   └── Requests
│   └── Providers
├── bootstrap
├── config
├── database
│   ├── factories
│   ├── migrations
│   └── seeders
├── public
├── resources
│   └── views
├── routes
├── storage
└── tests
```

## How to Install, Configure, Run and Deploy

### Install
1. You need to download Apache, MySql and PHP ^8.1.0
   2. For `Windows` use [Laragon](https://laragon.org/download/index.html)
   3. For `MacOs` follow [this](https://jasonmccreary.me/articles/install-apache-php-mysql-mac-os-x-catalina/) guide.
   4. For `Ubuntu` follow [this](https://phoenixnap.com/kb/how-to-install-lamp-in-ubuntu) guide.

### Configure
1. Clone the repository by downloading the ZIP file or using the Git command `git clone https://github.com/[repository-name].git`
2. Open your terminal or command prompt and navigate to the downloaded repository.
3. Navigate to the `/NextJs` directory by typing `cd NextJs` in your terminal or command prompt.
4. Copy the `.env.example` file to `.env.local`. If you're on a Mac or Linux, type `cp .env.example .env.local`. If you're on Windows, type `copy .env.example .env.local`.
5. Run `npm install` to install the dependencies needed for the Next.js project.
6. Navigate back to the root directory by typing `cd ..` in your terminal or command prompt.
7. Navigate to the `/Api` directory by typing `cd Api`.
8. Copy the `.env.example` file to `.env`. If you're on a Mac or Linux, type `cp .env.example .env`. If you're on Windows, type `copy .env.example .env`.
9. Update the variables in the `.env` file to match your database settings.
10. Run `composer install` to install the dependencies needed for the Laravel project.
11. Run `php artisan migrate` to run the database migrations and create the necessary tables.

### Run and Deploy
1. Open a new terminal or command prompt.
2. Navigate to the `/Api` directory by typing `cd Api`.
3. Run `php artisan serve` to start the Laravel development server.
4. Open another new terminal or command prompt.
5. Navigate to the `/NextJs` directory by typing `cd ../NextJs`.
6. Run `npm run dev` to start the Next.js development server.
7. Go to `http://localhost:3000` in your web browser to access the cloud storage platform.

## More resources

- [Nextjs documentation](https://nextjs.org/docs/getting-started)
- [Laravel 10 documentation](https://laravel.com/docs/10.x)
- [Spatie medialibrary documentation](https://spatie.be/docs/laravel-medialibrary/v10/introduction)

## About

Explain who has contributed to the repository. You can say it has been part of a class you've taken at the University of Applied Sciences Amsterdam.

Link to your methods and techniques document: 
1. [Sebahattin's MT](seba-mt.md)
2. [Jouri's MT](jouri-mt.md)