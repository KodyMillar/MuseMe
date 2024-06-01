const bcrypt = require("bcrypt");
const db = require("../config/db");

const authController = {
	login: (req, res) => {
		res.render("authentication/login");
	},

	authenticate: (req, res) => {
		statement = `SELECT username, password FROM user_account
		WHERE username = '${req.params.username}`;

		db.execute(statemet, (err, user) => {
			const password = req.params.password;
	
			if (password === user.password) {
				// Redirect to the home page
			}
			else {
				// Redirect user back to login page, with an error message
				console.log("not authenticated")
			}
		})

	}
}

module.exports = authController