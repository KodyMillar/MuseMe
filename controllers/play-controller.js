const db = require("../config/db");
const express = require("express");
const app = express();
const path = require("path");


app.use(express.static(__dirname.replace("controllers", "") + "/public"));

booksDirectory = path.join(__dirname.replace("controllers", ""), "/public/images/purchase")

const playController = {
	playOverview: (req, res) => {
		statement = `SELECT * FROM music_book`
		db.execute(statement, (err, result) => {
			if (err) throw err;
			else {
				res.render("play/play", { userBooks: result });
			}
		})
	}
}

module.exports = playController