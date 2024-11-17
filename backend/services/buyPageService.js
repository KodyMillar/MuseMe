const connectDB = require('../config/db');

const buyPageService = {
	getAllBooks: async () => {
		try {
			const connection = await connectDB();
	
			let query = `SELECT * FROM music_book`;
			const [rows] = await connection.query(query);
	
			return rows;
	
		} catch ({name, message, err}) {
			console.log(name);
			console.log(message);
			throw err;
		}
	},
	getBooksBySearch: async (searchText) => {
		try {
			const connection = await connectDB();
			const query = `SELECT * FROM music_book WHERE Book_Name LIKE ?`;
			const [rows] = await connection.query(query, [searchText]);
			return rows;

		} catch (err) {
			console.log(err.name);
			console.log(err.message);
			throw err;
		}
	}
};

module.exports = buyPageService;