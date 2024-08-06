const playService = require('../services/playService');

const playController = {
	playOverview: async (req, res) => {
		try {

			const {books, songs} = await playService.getUserBooks('Kodawg395');
			const songsCompleted = await playService.getSongsCompleted('8153d61f-06f9-4228-b059-3a619f49801c');
	
			let songsByBook = {}
			songs.forEach(song => {
				if (!songsByBook[song.Book_Name]) {
					songsByBook[song.Book_Name] = [];
				};
				songsByBook[song.Book_Name].push(song);
			});
	
			let songsCompletedByBook = {}
			songsCompleted.forEach(songCount => {
				songsCompletedByBook[songCount.Book_ID] = songCount.completed;
			});

			const userId = songs[0]['User_ID'];
	
			res.render("play/play", { 
				userBooks: books,
				bookSongs: songsByBook,
				songsCompleted: songsCompletedByBook,
				userId: userId
			});

		} catch (err) {
			console.log(err);
		}

	},

	changeSongProgress: async (req, res) => {
		const progress = req.body['song-progress']
		const [bookId, songId, userId] = req.body['s ong-progress-id'].split('~').splice(1);
		
		await playService.changeSongProgress(progress, bookId, songId, userId);

		res.redirect('/play');
	},

	searchSongProgress: async (req, res) => {
		try {
			const songProgress = req.query['user-book-filter'];
			const userId = req.params.userId;
	
			const filteredSongs = await playService.getSongByProgress(userId, songProgress);
	
			const songsByBook = {}
			filteredSongs.forEach(song => {
				if (!songsByBook[song.Book_ID]) {
					songsByBook[song.Book_ID] = [];
				}
				songsByBook[song.Book_ID].push(song);
			});
			
			res.render("play/filteredSongs", {
				songProgress: songProgress,
				filteredSongs: songsByBook,
				userId: userId
			});

		} catch(err) {
			console.log(err);
		}
	}
};

module.exports = playController;