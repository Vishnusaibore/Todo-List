-- Todo List Website --
-Welcome to the Todo List Website! 
-This web application allows users to create custom todo lists, add and remove list elements, and stay organized with their tasks. 
-The application is built using HTML, CSS, Bootstrap 5 for the front end, and utilizes Node.js with Express.js, EJS, and Mongoose for the back end. 
-The data is stored in a MongoDB Community Server database.

-- Features --
-Custom Todo Lists: Users can create and manage multiple todo lists to organize their tasks efficiently.
-Add and Remove Elements: Easily add new tasks to your lists and remove them when they are completed or no longer needed.

-- Technologies Used --
-Front End: HTML, CSS,Bootsrap5
-Back End: Node.js, Express.js, EJS (Embedded JavaScript templates), Mongoose (Object Data Modeling for MongoDB)
-Database: MongoDB Community Server

INSTALLATION GUIDE
1)Clone the repository: 
$ git clone https://github.com/Vishnusaibore/todo-list.git

2)Install dependencies:(look package.json for required denpendencies)
$ npm install dependency_name

3)Set up the MongoDB connection:
Make sure you have MongoDB Community Server installed and running.

4)Run the application:
$ npm start / node app_name.js

5)Visit http://localhost:3000 in your web browser.

Folder Structure

todo-list/
│
│
├── public/
│   ├── css/
│   │   └── styles.css
│   
│      
├── views/
│   ├── partials/
    |   |--header.ejs
│   │   └── footer.ejs
│   ├── createList.ejs
│   |
│   └── list.ejs
│
├── app.js
├── package.json
├── README.md
