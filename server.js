require("dotenv").config();
const express = require("express");
const app = express();
const mysql = require("mysql2");
const expressLayouts = require("express-ejs-layouts");
const buyController = require("./controllers/buy-controller");
const indexController = require("./controllers/index_controller");

app.set("view engine", "ejs");
const port = process.env.port || 8000;

// middleware
app.use(express.json());
// app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));

app.get("/", indexController.listComposers)

app.get("/buy", buyController.listBooks);

app.listen(port, () => {
  console.log(`App listening on port ${port}.`);
  console.log("Running on domain " + "http://127.0.0.1:8000/")
})

