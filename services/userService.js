const db = require("../config/db");
const bcrypt = require("bcrypt");

const userService = {
	getUser: (username) => {
		let statement = `SELECT username FROM user_account
		WHERE username = '${username}'`;

		db.execute(statement, (err, result) => {
			if (err) throw err;
			const user = result.shift().username;
			if (user) console.log("kodawg");
			if (user) return true;

			statement = `SELECT email FROM user_account
			WHERE email = '${username}'`;

			db.execute(statement, (err, result) => {
				if (err) throw err;
				if (result) return true;
				return false;
			})
		})


	},

	authenticateUser: (username, password) => {
		const statement = `SELECT username, password, email FROM user_account
		WHERE username = '${username}'`

		db.execute(statement, (err, result) => {
			if (err) throw err;
			bcrypt.compare(password, result.shift().password, (err, result) => {
				if (err) throw err;
				console.log(result);
				return result;
			})
			// console.log(result)	
			// bcrypt.compare(password, result.shift().password)
			// 	.then((isAuthenticated) => { return isAuthenticated })
			// 	.catch((err) => console.log(err))
		})

	}
}

module.exports = userService