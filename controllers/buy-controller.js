const express = require("express");
const app = express();
const fs = require("fs/promises");
const path = require("path");
var connectDB = require("../config/db");

app.use(express.static(__dirname.replace("controllers", "") + "/public"));

booksDirectory = path.join(__dirname.replace("controllers", ""), "/public/images/purchase")

let buyController = {
    listBooks: async (req, res) => {

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
    },

    purchaseBook: async (req, res) => {
        try {
            const connection = await connectDB();
    
            const bookId = req.params.id;
            const query1 = `SELECT * FROM music_book
            WHERE Book_ID = ?`;
    
            const [book] = await connection.query(query1, [bookId]);
            
            const query2 = `SELECT * FROM song AS s
            INNER JOIN book_song AS bs ON s.Song_ID = bs.Song_ID
            INNER JOIN music_book AS mb ON bs.Book_ID = mb.Book_ID
            WHERE mb.Book_ID = ?
            LIMIT 20;`;

            const [songs] = await connection.query(query2, [bookId]);

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
        const connection = await connectDB();
        try {

            const bookId = parseInt(req.params.id);
            const userId = '8153d61f-06f9-4228-b059-3a619f49801c'
    
            await connection.beginTransaction();
            const query1 = `INSERT INTO purchase VALUES
            (?, ?);`
    
            await connection.query(query1, [bookId, userId]);
    
            const query2 = `SELECT * FROM music_book AS mb
            INNER JOIN book_song AS bs ON bs.Book_ID = mb.Book_ID
            INNER JOIN song AS s ON bs.Song_ID = s.Song_ID
            WHERE mb.Book_ID = ?`;
    
            const [rows] = await connection.query(query2, [bookId]);
            let query3 = `INSERT INTO song_progress VALUES`;
            let songIds = [];

            for (let i = 0; i < rows.length - 1; i++) {
                query3 += `\n(1, '8153d61f-06f9-4228-b059-3a619f49801c', ?, 'Not Started'),`;
                songIds.push(rows[i].Song_ID);
            };

            query3 += `\n(1, '8153d61f-06f9-4228-b059-3a619f49801c', ?, 'Not Started');`;
            songIds.push(rows.pop().Song_ID);
            
            await connection.query(query3, songIds);
            await connection.commit();

            const query4 = `SELECT * FROM music_book
            WHERE Book_ID = ?`

            const [book] = await connection.query(query4, [bookId]);
    
            res.render("purchases/purchaseComplete", {
                book: book.shift()
            });

        } catch (err) {
            await connection.rollback();
            console.log(err);
        }

    }
};

module.exports = buyController;