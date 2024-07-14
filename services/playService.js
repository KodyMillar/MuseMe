const connectDB = require('../config/db');

const playService = {
	getUserBooks: async (username) => {
		try {
			const connection = await connectDB();

			const query1 = `SELECT * FROM music_book AS mb
			INNER JOIN purchase AS p ON p.Book_ID = mb.Book_ID
			INNER JOIN user_account AS ua ON ua.User_ID = p.User_ID
			WHERE username = ?`
	
			const query2 = `SELECT Username, Book_Name, mb.Book_ID, s.Song_ID, Song_Name, s.Difficulty, sp.progress, s.Image_Link, pages FROM music_book AS mb 
			INNER JOIN book_song AS bs ON mb.Book_ID = bs.Book_ID 
			INNER JOIN song AS s ON bs.Song_ID = s.Song_ID
			INNER JOIN purchase AS p ON p.Book_ID = mb.Book_ID
			INNER JOIN user_account AS ua ON ua.User_ID = p.User_ID
			INNER JOIN song_progress AS sp ON sp.User_ID = p.User_ID 
			AND sp.Book_ID = p.Book_ID
			AND sp.Song_ID = s.Song_ID
			WHERE Username = ?;`
	
			const [books] = await connection.query(query1, [username]);
			const [songs] = await connection.query(query2, [username]);

			return {books: books, songs: songs};
	
		} catch ({name, message, err}) {
			console.log(name);
			console.log(message);
			throw err;
		}

	}
}

module.exports = playService;