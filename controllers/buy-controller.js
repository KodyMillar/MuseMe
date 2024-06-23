const express = require("express");
const app = express();
const fs = require("fs/promises");
const path = require("path");
var connectDB = require("../config/db");

app.use(express.static(__dirname.replace("controllers", "") + "/public"));

booksDirectory = path.join(__dirname.replace("controllers", ""), "/public/images/purchase")

let buyController = {
    listBooks: async (req, res) => {

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

        const connection = await connectDB();

        let query = `SELECT * FROM music_book`;
        
        const [rows] = await connection.query(query);
        res.render('purchases/buy', {
            songBooks: rows
        })
        // db.execute(statement, shoppingBooksList = (err, result) => {
        //     if (err) throw err;
        //     else {
        //         res.render("purchases/buy", { songBooks: result })
        //     }
        // });
        
    },

    searchBooks: async (req, res) => {
        const connection = await connectDB();
        const searchText = `%${req.query.searchText}%`;
        const query = `SELECT * FROM music_book WHERE Book_Name LIKE ?`;
        const [rows] = await connection.query(query, [searchText]);
        res.render('purchases/buy', {
            songBooks: rows
        });
        // db.execute(statement, shoppingBooksList = (err, result) => {
        //     if (err) throw err;
        //     else {
        //         res.render("purchases/buy", {
        //             songBooks: rows
        //         });
        //     }
        // });
    }
};




module.exports = buyController;