const express = require("express");
const app = express();
const mysql = require("mysql2");
const expressLayouts = require("express-ejs-layouts");

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

app.get("/buy", (req, res) => {
  res.render("purchases/buy");
})

// create a new MySQL connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'Kody',
    password: 'Kodinux#0468',
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
  // close the MySQL connection
  connection.end();

app.listen(port, () => {
  console.log(`App listening on port ${port}.`);
  console.log("Running on domain " + "http://127.0.0.1:8000/")
})