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
		
			const [rows] = await connection.query(query2, [bookId]);
			let query3 = `INSERT INTO song_progress VALUES`;
			let songIds = [];
		
			for (let i = 0; i < rows.length - 1; i++) {
				query3 += `\n(1, '8153d61f-06f9-4228-b059-3a619f49801c', ?, 'Not Started'),`;
				songIds.push(rows[i].Song_ID);
			};
		
			query3 += `\n(1, '8153d61f-06f9-4228-b059-3a619f49801c', ?, 'Not Started');`;
			songIds.push(rows.pop().Song_ID);
			
			await connection.query(query3, songIds);
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