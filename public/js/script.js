const songsList = document.querySelectorAll('.song');
var currentSong = null
songsList.forEach(song => {
	song.addEventListener('click', (e) => {
		console.log(currentSong)
		const songID = e.target.closest('.song').id.split('-').pop(-1);
		const songToDisplay = document.getElementById(`song-pages-${songID}`);
		if (currentSong) {
			currentSong.style.visibility = 'hidden';
		}
		currentSong = songToDisplay;
		songToDisplay.style.visibility = 'visible';
	});

	song.addEventListener('mouseover', (e) => {
		const songItem = e.target.closest('.song');
		songItem.style.boxShadow = '2px 7px 10px rgb(80, 15, 80)';
		songItem.style.cursor = 'pointer';
		songItem.style.borderBottom = 'none';

		const songBefore = songItem.previousElementSibling;
		if (songBefore) {
			songBefore.style.borderBottom = 'none';
		}
		else {
			songItem.style.borderTop = 'none';
		}
		
	})

	song.addEventListener('mouseleave', (e) => {
		const songItem = e.target.closest('.song');
		songItem.style.boxShadow = 'none';
		songItem.style.borderBottom = 'solid 2px black';

		const songBefore = songItem.previousElementSibling;
		if (songBefore) {
			songBefore.style.borderBottom = 'solid 2px black';
		}
		else {
			songItem.style.borderTop = 'solid 2px black';
		}
	})
})


const userBooks = document.querySelectorAll('.user-book-img');
var currentBook = null;

userBooks.forEach(book => {
	book.addEventListener('click', (e) => {
		const bookID = e.target.id.split('-').pop(-1);
		currentBook = document.getElementById(`book-window-id-${bookID}`)
		currentBook.style.visibility = 'visible';
	})

	book.addEventListener('mouseover', (e) => {
		e.target.style.cursor = 'pointer';
	})
})


const closeBookButtons = document.querySelectorAll('.close-book-button');

closeBookButtons.forEach(button => {
	button.addEventListener('click', () => {
		currentBook.style.visibility = 'hidden';
		currentSong.style.visibility = 'hidden';
	})

	button.addEventListener('mouseover', (e) => {
		e.target.style.cursor = 'pointer';
	})
})