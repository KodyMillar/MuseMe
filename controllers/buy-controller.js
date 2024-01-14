const express = require("express");
const app = express();
const fs = require("fs/promises");
const path = require("path");

app.use(express.static(__dirname.replace("controllers", "") + "/public"))

// fs.readdir(__dirname.replace("controllers", "") + "/public/images/purchase")
//     .then((images) => songBookImages = images)
//     .catch((err) => console.log(err));

// console.log(songBookImages)

booksDirectory = path.join(__dirname.replace("controllers", ""), "/public/images/purchase")

let buyController = {
    listBooks: (req, res) => {
        fs.readdir(booksDirectory)
            .then((images) => {
                res.render("purchases/buy", { songBooks: songBookImages })
            })
            .catch((err) => console.log(err));
    }
}

module.exports = buyController;