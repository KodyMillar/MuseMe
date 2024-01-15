const express = require("express");
const app = express();
const fs = require("fs/promises");
const path = require("path");
const mysql = require("mysql2");

app.use(express.static(__dirname.replace("controllers", "") + "/public"));

// create a new MySQL connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// fs.readdir(__dirname.replace("controllers", "") + "/public/images/purchase")
//     .then((images) => songBookImages = images)
//     .catch((err) => console.log(err));

// console.log(songBookImages)

booksDirectory = path.join(__dirname.replace("controllers", ""), "/public/images/purchase")

let buyController = {
    listBooks: (req, res) => {

        // connect to the MySQL database
        connection.connect((error) => {
            if (error) {
                console.error('Error connecting to MySQL database:', error);
            } else {
                console.log('Connected to MySQL database!');
            }
        });  

        let statement = "SELECT * FROM music_book"

        connection.execute(statement, shoppingBooksList = (err, result) => {
            if (err) throw err;
            res.render("purchases/buy", { songBooks: result })
        });
        // close the MySQL connection
        // connection.end();
        
    }
}




module.exports = buyController;