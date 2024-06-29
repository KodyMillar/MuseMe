const checkPass = require("strong-password-check");


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

	comparePass: (enteredPassword, dbPassword) => {
		try {
			return bcrypt.compare(enteredPassword, dbPassword)
				.then((isAuthenticated) => { return isAuthenticated })
				.catch((err) => console.log(err));

		} catch ({name, message, err}) {
			console.log(name);
			console.log(message);
			throw err;
		}
	}
}

module.exports = passwordService;