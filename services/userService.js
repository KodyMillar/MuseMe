const db = require('../config/db');
const bcrypt = require('bcrypt');
const passwordService = require('./passwordService');
const { v4: uuidv4 } = require('uuid');

const userService = {
	getUser: async (username) => {
		try {
			const connection = await db();
	
			let query = `SELECT username, email FROM user_account
			WHERE username = ? OR email = ?`;
			
			const [rows] = await connection.query(query, [username, username]);

			if (rows.length > 0) return true;
	
			return false;
			
		} catch ({name, message, err}) {
			console.log(name);
			console.log(message);
			throw err;
		}

	},

	authenticateUser: async (username, password) => {
		try {
			const connection = await db();
	
			const query = `SELECT username, password, email FROM user_account
			WHERE username = ?`;
	
			let [rows] = await connection.query(query, [username]);
	
			return await passwordService.comparePass(password, rows.shift().password);

			// return bcrypt.compare(password, rows.shift().password)
			// 	.then((isAuthenticated) => { return isAuthenticated })
			// 	.catch((err) => console.log(err));

		} catch ({name, message, err}) {
			console.log(name);
			console.log(message);
			throw err;
		}
	},

	checkUsernameUnique: async (username) => {
		try {
			const connection = await db();
	
			const query = `SELECT username FROM user_account
			WHERE username = ?`
	
			const [rows] = await connection.query(query, [username]);
	
			if (rows.length > 0) {
				return false;
			}
			return true;

		} catch ({name, message, err}) {
			console.log(name);
			console.log(message);
			throw err;
		}
	},

	checkEmailUnique: async (email) => {
		try {
			const connection = await db();
	
			const query = `SELECT email FROM user_account
			WHERE email = ?`
	
			const [rows] = await connection.query(query, [email]);
	
			if (rows.length > 0) {
				return false;
			}
			return true;

		} catch ({name, message, err}){
			console.log(name);
			console.log(message);
			throw err;
		}
	},

	createUser: async (userInfo) => {
		try {
			const connection = await db();

			const uuid = uuidv4();
			const saltrounds = 10;
	
			const username = userInfo.username;
			const password = userInfo.password;
			const firstName = userInfo.firstName;
			const lastName = userInfo.lastName;
			const email = userInfo.email;
	
			const hash = await bcrypt.hash(password, saltrounds);
			
			const query = `INSERT INTO user_account VALUES
			(?, ?, ?, ?, ?, ?);`
			
			const insert = await connection.query(query, [uuid, username, hash, firstName, lastName, email]);

		} catch ({name, message, err}) {
			console.log(name);
			console.log(message);
			throw err;
		}
	}
}

module.exports = userService