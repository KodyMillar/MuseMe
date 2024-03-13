const express = require("express");
const app = express();
const fs = require("fs/promises");
const path = require("path");
var db = require("../config/db");

app.use(express.static(__dirname.replace("controllers", "") + "/public"));

booksDirectory = path.join(__dirname.replace("controllers", ""), "/public/images/purchase")

let buyController = {
    listBooks: (req, res) => {

        // app.post("/sendData", async (req, res) => {
        //     let searchText = await req.data;
        //     console.log(searchText)
        //     if (!searchText) {
        //         searchText = "*";
        //     }
        //     let statement = `SELECT ${searchText} FROM music_book`;
            
        //     connection.execute(statement, shoppingBooksList = (err, result) => {
        //         if (err) throw err;
        //         else {
        //             res.render("purchases/buy", { songBooks: result })
        //         }
        //     });
        // })

        let statement = `SELECT * FROM music_book`;
            
        db.execute(statement, shoppingBooksList = (err, result) => {
            if (err) throw err;
            else {
                res.render("purchases/buy", { songBooks: result })
            }
        });
        
    },

    searchBooks: (req, res) => {
        const searchText = req.query.searchText;
        const statement = `SELECT * FROM music_book WHERE Book_Name LIKE '%${searchText}%'`;
        db.execute(statement, shoppingBooksList = (err, result) => {
            if (err) throw err;
            else {
                res.render("purchases/buy", {songBooks: result});
            }
        });
    }
};




module.exports = buyController;