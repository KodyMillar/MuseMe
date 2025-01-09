const connectDB = require('../config/db');

const playService = {
	getUserBooks: async (username) => {
		try {

			const connection = await connectDB();

			const query1 = `SELECT * FROM music_book AS mb
			INNER JOIN purchase AS p ON p.Book_ID = mb.Book_ID
			INNER JOIN user_account AS ua ON ua.User_ID = p.User_ID
			WHERE username = ?
			ORDER BY mb.Book_ID;`
	
			const query2 = `SELECT ua.User_ID, Username, Book_Name, mb.Book_ID, s.Song_ID, Song_Name, s.Difficulty, sp.progress, s.Image_Link, pages FROM music_book AS mb 
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

	},

	getSongProgressCount: async (userId) => {
		try {
			const connection = await connectDB();

			const query = `SELECT MAX(sp.Book_ID) AS Book_ID, CONCAT(SUM(CASE WHEN sp.progress = 'Completed' THEN 1 ELSE 0 END), '/', MAX(mb.Num_Songs)) AS 'completed', SUM(CASE WHEN sp.progress = 'In Progress' THEN 1 ELSE 0 END) AS 'In_Progress' FROM music_book AS mb
			INNER JOIN purchase AS p ON mb.Book_ID = p.Book_ID
			INNER JOIN song_progress AS sp ON sp.Book_ID = p.Book_ID AND sp.User_ID = p.User_ID
			WHERE sp.User_ID = ?
			GROUP BY sp.progress AND sp.Book_ID
			ORDER BY Book_ID;`
	
			const [songProgressCount] = await connection.query(query, [userId]);
			
			return songProgressCount;
		
		} catch ({name, message, err}) {
			console.log(name);
			console.log(message);
			throw err;
		}
	},

	// getSongsInProgress: async(userId) => {
	// 	const connection = await connectDb();

	// 	const query = ``
	// }

	changeSongProgress: async (progress, bookId, songId, userId) => {
		const connection = await connectDB();

		try {
			await connection.beginTransaction();

			const query = `UPDATE song_progress
			SET progress = ?
			WHERE Book_ID = ? AND Song_ID = ? AND User_ID = ?`;
	
			const [rows] = await connection.query(query, [progress, bookId, songId, userId]);

			await connection.commit();

		} catch ({name, message, err}) {
			await connection.rollback();
			console.log(name);
			console.log(message);
			throw err;
		}

	},

	getSongByProgress: async (userId, songProgress) => {
		try {
			const connection = await connectDB();

			const query = `SELECT mb.Book_ID, mb.Book_Name, s.Song_ID, s.Song_Name, sp.progress, mb.image_link FROM music_book AS mb
			INNER JOIN purchase AS p ON mb.Book_ID = p.Book_ID
			INNER JOIN book_song AS bs ON bs.Book_ID = mb.Book_ID
			INNER JOIN song AS s ON s.Song_ID = bs.Song_ID
			INNER JOIN song_progress AS sp ON sp.Book_ID = p.Book_ID AND sp.User_ID = p.User_ID AND sp.Song_ID = s.Song_ID
			WHERE sp.User_ID = ? AND sp.progress = ?`;

			const [rows] = await connection.query(query, [userId, songProgress]);

			return rows;
		
		} catch ({name, message, err}) {
			console.log(name);
			console.log(message);
			throw err;
		}
	}
}

module.exports = playService;