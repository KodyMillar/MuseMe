const express = require("express");
const app = express();
const mysql = require("mysql2");
const expressLayouts = require("express-ejs-layouts");
const buyController = require("./controllers/buy-controller")

app.set("view engine", "ejs");
const port = process.env.port || 8000;

// middleware
app.use(express.json());
// app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/buy", buyController.listBooks);

// create a new MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'Kody',
    password: process.env.DB_PASSWORD,
    database: 'music_app'
  });
  // connect to the MySQL database
  connection.connect((error) => {
    if (error) {
      console.error('Error connecting to MySQL database:', error);
    } else {
      console.log('Connected to MySQL database!');
    }
  });

  let statement = `
    CREATE TABLE IF NOT EXISTS MUSIC_BOOKS (
      
    );
  `

  // close the MySQL connection
  connection.end();

app.listen(port, () => {
  console.log(`App listening on port ${port}.`);
  console.log("Running on domain " + "http://127.0.0.1:8000/")
})