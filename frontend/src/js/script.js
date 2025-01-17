/* Play page
----------------------------------------*/

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

		songProgressLabel.forEach(label => {
			const otherDropDown = label.querySelector('.song-progress-dropdown');

			if (! otherDropDown.classList.contains('hidden')) {
				otherDropDown.classList.add('hidden');
				otherDropDown.style.height = '0';

				const arrow = label.querySelector('.song-progress-arrow');
				arrow.style.transform = 'rotate(45deg)';
			}
		})
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
		currentBook = document.getElementById(`book-window-id-${bookID}`);
		currentBook.style.visibility = 'visible';
		document.body.style.overflowY = 'hidden';
	});

	book.addEventListener('mouseover', (e) => {
		e.target.style.cursor = 'pointer';
	});

	const bookId = book.id.split('-').pop(-1);
	const bookWindow = document.getElementById(`book-window-id-${bookId}`);
	const bookWindowVisibility = window.getComputedStyle(bookWindow).getPropertyValue('visibility');

	if (bookWindowVisibility == 'visible') {
		currentBook = bookWindow;
		currentSong = bookWindow.querySelector('.song-pages-visible');
	}
	
})


const closeBookButtons = document.querySelectorAll('.close-book-button');

closeBookButtons.forEach(button => {
	button.addEventListener('click', () => {
		currentBook.style.visibility = 'hidden';
		if (currentSong) {
			currentSong.style.visibility = 'hidden';
		}

		document.body.style.overflowY = 'scroll';
	})

	button.addEventListener('mouseover', (e) => {
		e.target.style.cursor = 'pointer';
	})
});


const fullScreenButtons = document.querySelectorAll('.full-screen-button');
const exitFullScreenButtons = document.querySelectorAll('.close-full-screen-button');

fullScreenButtons.forEach(button => {
	button.addEventListener('click', () => {
		button.style.display = 'none';

		const songDiv = button.parentElement;
		const songPages = songDiv.children;
		
		for (i=2; i < songPages.length; i++) {
			// songPages[i].style.height = '200vh';
			// songPages[i].style.width = '75vw';
			// songPages[i].style.transform = 'scale(1.5)';
			songPages[i].style.transform = 'translateX(25vw) scale(1.3)';
			songPages[i].style.marginTop = 'auto';
			songPages[i].style.marginBottom = '25%';
		};

		const closeCurrentFullScreenButton = songDiv.querySelector('.close-full-screen-button');
		closeCurrentFullScreenButton.style.visibility = 'visible';
		
		const songPagesDiv = songDiv.parentElement;
		songPagesDiv.style.width = '100%';
		// songPagesDiv.parentElement.style.display = 'block';
		
		// songDiv.style.display = 'flex';
		songDiv.style.overflow = 'auto';
		// songDiv.style.flexDirection = 'column';
		// songDiv.style.gap = '60vh';
		// songDiv.style.alignItems = 'center';
		// songDiv.style.position = 'static';

		const songsList = songPagesDiv.nextElementSibling;
		songsList.style.visibility = 'hidden';

	});
});


exitFullScreenButtons.forEach(button => {
	button.addEventListener('click', () => {
		button.style.visibility = 'hidden';
		
		const songDiv = button.parentElement;
		const songPages = songDiv.children;
		
		for (i=2; i < songPages.length; i++) {
			songPages[i].style.transform = '';
			songPages[i].style.marginTop = '';
			songPages[i].style.marginBottom = '2%';
		};

		const fullScreenButton = songDiv.querySelector('.full-screen-button');
		fullScreenButton.style.display = 'inline';

		const songPagesDiv = songDiv.parentElement;
		// songPagesDiv.parentElement.style.display = 'grid';

		const songsList = songPagesDiv.nextElementSibling;
		songsList.style.visibility = '';
	});
});

const songProgressLabel = document.querySelectorAll('.song-progress');

songProgressLabel.forEach(div => {
	const label = div.children[0];
	if (label.textContent == "Not Started") {
		div.style.backgroundColor = "#bfbfbf";
	}
	else if (label.textContent == "In Progress") {
		div.style.backgroundColor = "#f0eb89";
	}
	else if (label.textContent == "Completed") {
		div.style.backgroundColor = "#38add1";
	}
})


songProgressLabel.forEach(div => {
	const divColor = window.getComputedStyle(div, null).getPropertyValue('background-color');

	div.addEventListener('mouseover', () => {
		div.style.backgroundColor = '#8b61c9'
	});

	div.addEventListener('mouseleave', () => {
		div.style.backgroundColor = divColor;
	})

	div.addEventListener('click', (e) => {
		const dropdown = e.currentTarget.querySelector('.song-progress-dropdown');
		const arrow = e.currentTarget.querySelector('.song-progress-arrow');
		
		e.stopPropagation();
		dropdown.classList.toggle('hidden');
		
		if (dropdown.style.height == '0px' || ! dropdown.style.height) {
			dropdown.style.height = '25vh';
			arrow.style.transform = 'rotate(225deg)';
		}
		else if (dropdown.style.height == '25vh') {
			dropdown.style.height = '0';
			arrow.style.transform = 'rotate(45deg)';
		}

		songProgressLabel.forEach(label => {
			const otherDropDown = label.querySelector('.song-progress-dropdown');

			if (! otherDropDown.classList.contains('hidden') && otherDropDown != dropdown) {
				otherDropDown.classList.add('hidden');
				otherDropDown.style.height = '0';

				const arrow = label.querySelector('.song-progress-arrow');
				arrow.style.transform = 'rotate(45deg)';
			}
		})
	})
})



/* filtered songs page 
-------------------------------*/

const playSongButton = document.querySelectorAll('.play-song-button');

playSongButton.forEach(button => {
	const buttonColor = window.getComputedStyle(button).getPropertyValue('background-color');

	button.addEventListener('mouseover', () => {
		button.style.backgroundColor = '#8b61c9';
		button.style.color = '#EFEFEF';
	});

	button.addEventListener('mouseleave', () => {
		button.style.backgroundColor = buttonColor;
		button.style.color = '#000000'
	})
})

const backButton = document.querySelector('.back-button');

const originalBackgroundColor = window.getComputedStyle(backButton).getPropertyValue('background-color');

backButton.addEventListener('mouseover', () => {
	backButton.style.backgroundColor = 'rgb(214, 195, 69)'
});

backButton.addEventListener('mouseleave', () => {
	backButton.style.backgroundColor = originalBackgroundColor;
})



/* purchase page
------------------------------- */


const seeMoreButtons = document.querySelectorAll('.see-more');
const moreSongs = document.getElementsByClassName('more-songs');

console.log("more songs")
seeMoreButtons.forEach(seeMoreButton => seeMoreButton.addEventListener('click', readMore));

function readMore(e) {
	const seeMoreId = e.target.id.split('-').pop();

	let currentSongsListing; 
	for (let i = 0; i < moreSongs.length; i++) {
		const moreSongsId = moreSongs[i].id.split('-').pop()
		if (seeMoreId == moreSongsId) {
			currentSongsListing = moreSongs[i];
		}
	};
	console.log(currentSongsListing)
	let songsDisplay = window.getComputedStyle(currentSongsListing).getPropertyValue('display');
	
	if (songsDisplay == 'none') {
		currentSongsListing.style.display = "inline";	
		e.target.textContent = "See less";
	} else {
		currentSongsListing.style.display = "none";
		e.target.textContent = "See more";
	};

	
};

const backToPurchasePageDiv = document.getElementById('back-button-purchase');
const backToPurchasePageButton = backToPurchasePageDiv.querySelector('.back-button');

backToPurchasePageButton.addEventListener('click', () => {
	console.log(history.back());	
	history.back();	
});


