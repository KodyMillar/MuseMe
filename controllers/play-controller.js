const playService = require('../services/playService');

const playController = {
	playOverview: async (req, res) => {

		const {books, songs} = await playService.getUserBooks('Kodawg395');

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
	},

	changeSongProgress: async (req, res) => {
		const progress = req.body['song-progress']
		const [bookId, songId, userId] = req.body['song-progress-id'].split('~').splice(1);
		
		await playService.changeSongProgress(progress, bookId, songId, userId);

		res.redirect('/play');
	}
};

module.exports = playController;