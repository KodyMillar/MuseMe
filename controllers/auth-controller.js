const bcrypt = require("bcrypt");
const db = require("../config/db");
const userService = require("../services/userService");
const passwordService = require('../services/passwordService');

const authController = {
	authenticate: async (username, password) => {
		try {
			const user = await userService.getUser(username);
			
			if (!user) {
				return false
			}
			
			const authenticated = await userService.authenticateUser(username, password);
			if (authenticated) {
				return true;
			}
			return false;

		} catch {
			return false;
		}

	},
	register: async (userInfo) => {
		try {
			const uniqueUsername = await userService.checkUsernameUnique(userInfo.username);
			if (!uniqueUsername) {
				return false;
			};

			const uniqueEmail = await userService.checkEmailUnique(userInfo.email);
			if (!uniqueEmail) {
				return false;
			};

			const strongPassword = await passwordService.checkPass(userInfo.password);
			if (!strongPassword) {
				return false;
			};

			await userService.createUser(userInfo);
			return true;

		} catch {
			return false;
		}
	}
};

module.exports = authController