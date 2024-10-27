const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const indexController = {
    listComposers: (req, res) => {
        fs.readdir(path.join(__dirname.replace("\\controllers", ""), "public", "images", "composers"), (err, images) => {
            if (err) throw err;
            res.render("index", { composers: images });
        });
    }
}

module.exports = indexController;