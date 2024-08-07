const express = require("express");
const app = express();
const fs = require("fs/promises");
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

            res.render('purchases/buy', {
                songBooks: books
            });

        } catch (err) {
            throw err;
        }  
    },

    searchBooks: async (req, res) => {
        const connection = await connectDB();
        const searchText = `%${req.query.searchText}%`;

        const books = await buyPageService.getBooksBySearch(searchText);
        
        res.render('purchases/buy', {
            songBooks: books
        });
    },

    purchaseBook: async (req, res) => {
        try {
            const bookId = req.params.id;

            const {book, songs} = await purchaseService.getBookAndSong(bookId);

            res.render("purchases/purchaseBook", {
                book: book.shift(),
                songs: songs
            });

        } catch ({name, message}) {
            console.log(name);
            console.log(message);
        }
    },

    purchaseComplete: async (req, res) => {
        try {
            const bookId = parseInt(req.params.id);
            const userId = '8153d61f-06f9-4228-b059-3a619f49801c'
    
            const book = await purchaseService.addBookPurchaseToDb(bookId, userId);
    
            res.render("purchases/purchaseComplete", {
                book: book.shift()
            });

        } catch (err) {
            console.log(err);
        }

    }
};

module.exports = buyController;