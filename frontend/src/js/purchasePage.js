export const displayMoreOrLessSongs = () => {
	const seeMoreButtons = document.querySelectorAll('.see-more');
	const moreSongs = document.getElementsByClassName('more-songs');
	
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
		
		let songsDisplay = window.getComputedStyle(currentSongsListing).getPropertyValue('display');
		
		if (songsDisplay == 'none') {
			currentSongsListing.style.display = "inline";	
			e.target.textContent = "See less";
		} else {
			currentSongsListing.style.display = "none";
			e.target.textContent = "See more";
		};
	
	};
}

export const backPageEvent = () => {
	const backToPurchasePageDiv = document.getElementById('back-button-purchase');
	const backToPurchasePageButton = backToPurchasePageDiv.querySelector('.back-button');
	
	backToPurchasePageButton.addEventListener('click', () => {
		console.log(history.back());	
		history.back();	
	});
}