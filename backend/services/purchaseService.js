const connectDB = require('../config/db')

const purchaseService = {
	getBookAndSong: async (bookId) => {
		const connection = await connectDB();    
		try {
			const query1 = `SELECT * FROM music_book
			WHERE Book_ID = ?`;
	
			const [book] = await connection.query(query1, [bookId]);
			
			const query2 = `SELECT * FROM song AS s
			INNER JOIN book_song AS bs ON s.Song_ID = bs.Song_ID
			INNER JOIN music_book AS mb ON bs.Book_ID = mb.Book_ID
			WHERE mb.Book_ID = ?
			LIMIT 20;`;
	
			const [songs] = await connection.query(query2, [bookId]);
			return {book: book, songs: songs};

		} catch ({name, message, err}) {
			console.log(name);
			console.log(message);
			throw err;
		}
	},

	addBookPurchaseToDb: async (bookId, userId) => {
		// add purchased book and songs to user purchase list
		// returns the book the user purchased

		const connection = await connectDB();

		try {
			await connection.beginTransaction();
			const query1 = `INSERT INTO purchase VALUES
			(?, ?);`
		
			await connection.query(query1, [bookId, userId]);
		
			const query2 = `SELECT * FROM music_book AS mb
			INNER JOIN book_song AS bs ON bs.Book_ID = mb.Book_ID
			INNER JOIN song AS s ON bs.Song_ID = s.Song_ID
			WHERE mb.Book_ID = ?`;
		
			const [songs] = await connection.query(query2, [bookId]);
			let query3 = `INSERT INTO song_progress VALUES`;
			let query3Values = [];
		
			for (let i = 0; i < songs.length; i++) {
				query3 += `\n(?, ?, ?, 'Not Started'),`;
				query3Values.push(bookId);
				query3Values.push(userId);
				query3Values.push(songs[i].Song_ID);
			};
		
			// replace last comma with semi-colon
			query3 = query3.replace(/([,])$/, ';')
			console.log(query3);
			
			await connection.query(query3, query3Values);
			await connection.commit();
		
			const query4 = `SELECT * FROM music_book
			WHERE Book_ID = ?`
		
			const [book] = await connection.query(query4, [bookId]);
		
			return book

		} catch ({name, message, err}) {
			await connection.rollback();
			console.log(name);
			console.log(message);
			console.log(err);
		}
	}
}

module.exports = purchaseService