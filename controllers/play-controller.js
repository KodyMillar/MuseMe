const db = require("../config/db");

const playController = {
	playOverview: async (req, res) => {
		const connection = await db();

		const query1 = `SELECT * FROM music_book`

		const query2 = `SELECT Book_Name, mb.Book_ID, s.Song_ID, Song_Name, s.Difficulty, s.Image_Link, pages FROM music_book AS mb 
		INNER JOIN book_song AS bs ON mb.Book_ID = bs.Book_ID 
		INNER JOIN song AS s ON bs.Song_ID = s.Song_ID`

		const [books] = await connection.query(query1);
		const [songs] = await connection.query(query2);

		let songsByBook = {}
		songs.forEach(song => {
			if (!songsByBook[song.Book_Name]) {
				songsByBook[song.Book_Name] = [];
			};
			songsByBook[song.Book_Name].push(song);
		});

		res.render("play/play", { 
			userBooks: books,
			bookSongs: songsByBook

		});
	}
};

module.exports = playController