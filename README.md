# Exams App

Exams App is a web application designed to effortlessly streamline exam creation and taking.
Teachers are provided with the tools to create, edit, update, and delete exams,   as well as getting statistics of each exam. They have a dashboard where they can manage user details, see the course they teach in, the students enrolled, and well as manage their exams.
Students are able to manage user and course details, see upcoming exams, tale exams, and get results instantly, including failed questions with correct answers!
Admin can manage users and courses, with the tools to create, edit, update, and delete users and courses.
The application is a ReactJs UI interacting with an Asp.Net web Api server, while storing all data in a database.<br>
the backend application can be found <a href="https://github.com/LeahMerzel/Exams-App-C-.Net-Server">here</a>.

## Table of Contents

[Installation](#installation) <br>
[usage](#usage) <br>
[Features](#features) <br>
[Code Features](#code-features) <br>
[Troubleshooting](#troubleshooting)

## Installation

- To run the application, you will need to have the following software installed on your computer:

  - Node.js (v12.13.0 or higher)
  - Web Browser/Android/Ios/Emulator

- Once you have these dependencies installed, follow these steps:

- Clone the repository to your local machine using the following command:

```bash
https://github.com/LeahMerzel/Exams-App-Client-Side.git
```
  - instead of main branch, navigate to master.
  - open the code with Visual Studio.
  - Open a terminal in the project directory.
  - Run npm install to install the project's dependencies:
  
## Usage

- To use the application, you will need to have a web browser on desktop or an Android or iOS device or an emulator. 

## Features

- User begins in the app’s home page, where he chooses which type of user he is: Teacher, Student, or Admin.
- next he chooses between login and register for a new user.
- then he lands on a dashboard providing data and tools appropriate to user type.
- All dashboard provide user details and option to edit them and logout.
- Admin dashboard includes: viewing courses + ability to edit and delete, viewing users + ability to edit and delete.
- Teacher dashboard includes enrolling in a course to teach in, course details, viewing teacher’s exams + edit and delete, creating new exams, seeing statistics on exams, viewing all students.
- Student dashboard includes enrolling in a course, course details, viewing upcoming exams + option to take exam, viewing all student’s taken exams + failed questions with correct answers.

## Code Features:

This frontend code is a fully responsive web UI, written in ReactJs.

Components divided in folders as follows:

api: calls to api
auth: handling authentication, and user details in Context
courses: handling courses CRUD operations
exams: handling exams, question, and answers CRUD operations
filterable-Table: handling rendering data in table, and filtering it
forms: handling rendering forms
hooks: custom hooks
images
layout: across-app screen layout
pages: app pages and dashboards
users: handling users CRUD operations

Packages and Concepts I used:

react-router-dom for navigation/ routing
react-bootstrap for styling
react-toastify for notifications
font-awesome for icons

Context used for holding the logged-in user’s details.
Custom hooks created to reduce code redundancy.


## Troubleshooting
If you encounter any issues when using or installing ExamsApp application, please refer to the project's GitHub Issues page to see if a solution has already been proposed. If not, you can open a new issue to report the problem.
