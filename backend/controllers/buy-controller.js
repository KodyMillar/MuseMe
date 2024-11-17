const express = require("express");
const app = express();
const path = require("path");
var connectDB = require("../config/db");
const purchaseService = require('../services/purchaseService');
const buyPageService = require('../services/buyPageService');

app.use(express.static(__dirname.replace("controllers", "") + "/public"));

booksDirectory = path.join(__dirname.replace("controllers", ""), "/public/images/purchase")

let buyController = {
    listBooks: async (req, res) => {

        try {
            const books = await buyPageService.getAllBooks();

            res.status(200).json(books);

        } catch (err) {
            throw err;
        }  
    },

    searchBooks: async (req, res) => {
        try {
            const searchText = `%${req.query.searchText}%`;

            const books = await buyPageService.getBooksBySearch(searchText);

            res.status(200).json(JSON.stringify(books));

        } catch(err) {
            console.log(err);
            if (err.code === "ER_PARSE_ERROR") {
                res.status(422).json({"message": "Invalid search data format"});
            }
            else {
                res.sendStatus(500);
            }
        }
    },

    purchaseBook: async (req, res) => {
        try {
            const bookId = req.params.id;

            const booksAndSongs = await purchaseService.getBookAndSong(bookId);

            res.status(200).json(JSON.stringify(booksAndSongs));

            // res.render("purchases/purchaseBook", {
            //     book: book.shift(),
            //     songs: songs
            // });

        } catch ({name, message}) {
            console.log(name);
            console.log(message);
        }
    },

    purchaseComplete: async (req, res) => {
        // Adds book and book songs to database
        
        try {
            const bookId = parseInt(req.params.id);
            const userId = req.session.userId;
    
            const book = await purchaseService.addBookPurchaseToDb(bookId, userId);
    
            res.status(201).json(JSON.stringify(book.shift()));

        } catch (err) {
            if (err.code === "ER_DUP_ENTRY") {
                res.sendStatus(409);
            } else {
                res.sendStatus(500);
            }
        }

    }
};

module.exports = buyController;