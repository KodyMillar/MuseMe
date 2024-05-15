const db = require("../config/db");

const playController = {
	playOverview: (req, res) => {
		const statement = `SELECT * FROM music_book`
		const getSongs = `SELECT Book_Name, mb.Book_ID, s.Song_ID, Song_Name, s.Difficulty, s.Image_Link, pages FROM music_book AS mb 
		INNER JOIN book_song AS bs ON mb.Book_ID = bs.Book_ID 
		INNER JOIN song AS s ON bs.Song_ID = s.Song_ID`
		db.execute(statement, (err, books) => {
			if (err) throw err;
			else {
				db.execute(getSongs, (err, songs) => {
					if (err) throw err;
					else {
						let songsByBook = {}
						songs.forEach(song => {
							if (!songsByBook[song.Book_Name]) {
								songsByBook[song.Book_Name] = []
							}
							songsByBook[song.Book_Name].push(song)
						})
						console.log(songsByBook)
						res.render("play/play", { 
							userBooks: books,
							bookSongs: songsByBook
						});
					}
				})
			}
		})
	}
}

module.exports = playController