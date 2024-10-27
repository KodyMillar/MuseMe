const checkPass = require("strong-password-check");
const bcrypt = require('bcrypt');

const passwordService = {
	checkPass: async (password) => {
		try {
			config = {
				lowercase: true,
				uppercase: true,
				digits: true,
				specialChars: true,
				minLength: 8,
			}
		
			const passwordStrength = checkPass(password, config);

			if (passwordStrength.strength == "Strong") {
				return true;
			}
			else {
				console.log(passwordStrength.messages);
				console.log(passwordStrength.strength);
				return false;
			}

		} catch ({name, message, err}) {
			console.log(name);
			console.log(message);
			throw err;
		}
	},

	encryptPass: async (password) => {
		const saltRounds = 10;
		return bcrypt.hash(password, saltRounds)
			.catch((err) => {throw err});
	},

	comparePass: async (enteredPassword, dbPassword) => {
		try {
			console.log("ENTERED PASSWORD: " + enteredPassword)
			return await bcrypt.compare(enteredPassword, dbPassword)
				.then((isAuthenticated) => { 
					console.log(enteredPassword)
					console.log(isAuthenticated)
					return isAuthenticated 
				})
				.catch((err) => console.log(err));

		} catch ({name, message, err}) {
			console.log(name);
			console.log(message);
			throw err;
		}
	}
}

module.exports = passwordService;