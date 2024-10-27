const db = require('../config/db');
const bcrypt = require('bcrypt');

module.exports = {
	authenticateSession: async (username, password) => {
		try {
			const connection = await db();

			const query = `SELECT User_ID, Password FROM user_account
			WHERE Username = ? AND Password = ?`;

			req.session.currentUser = {
				userId: user.User_ID,
				password: user.Password
			}
			
		} catch (err) {
			throw err;
		}
	}
}