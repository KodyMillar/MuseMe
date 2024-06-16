const bcrypt = require("bcrypt");
const db = require("../config/db");
const checkPass = require("strong-password-check");
const userService = require("../services/userService");

const authController = {
	authenticate: (username, password) => {

		const user = userService.getUser(username);
		if (!user) {
			console.log("no user")
			return false
		}
		
		const authenticated = userService.authenticateUser;
		if (authenticated) {
			return true;
		}
		return false;

	},
	checkUnique: (req, res, next) => {
		config = {
			lowercase: true,
			uppercase: true,
			digits: true,
			specialChars: true,
			minLength: 8,
		}

		const passwordStrength = checkPass(req.params.password, config);
	}
}

module.exports = authController