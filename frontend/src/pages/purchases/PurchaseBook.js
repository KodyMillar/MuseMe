import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    getMusicBooksAndSongs,
    addBookToPurchased 
    } from '../../api/musicBooks';
import { useParams } from 'react-router-dom';
import { displayMoreOrLessSongs } from '../../js/purchasePage';
import '../../styles/styles.css'

function PurchaseBook() {
    const [currentBook, setCurrentBook] = useState({});
    const [currentSongs, setCurrentSongs] = useState([]);
    const [allSongsDisplayed, setAllSongsDisplayed] = useState(false);
    const [purchaseError, setPurchaseError] = useState(null);
    const moreSongsRef = useRef(null);
    const { bookId } = useParams();  
    const navigate = useNavigate();

    useEffect(() => {
        async function requestBooksAndSongs(currentBookId) {
            const {book, songs} = await getMusicBooksAndSongs(currentBookId);
            setCurrentBook(book);
            setCurrentSongs(songs);
        }

        requestBooksAndSongs(bookId);
        displayMoreOrLessSongs();
    }, [bookId]);

    useEffect(() => {
        if (moreSongsRef.current) {
            moreSongsRef.current.textContent = allSongsDisplayed ? "See less" : "See more";
        }
    }, [allSongsDisplayed]);

    function handleClick() {
        setAllSongsDisplayed(prev => !prev);
    }

    function handleSubmit(e) {
        e.preventDefault();
        addBookToPurchased(currentBook.Book_ID)
            .then((purchasedBook) => navigate('/buy/purchase-complete', { state: purchasedBook }))
            .catch((err) => alert(err.message));
        
    }

    const backendHost = process.env.REACT_APP_BACKEND_HOST;
    const backendPort = process.env.REACT_APP_BACKEND_PORT;
    const musicBookUrl = `${backendHost}:${backendPort}`;
    
    return (
        <>
        <div id="back-button-purchase">
            <input type="submit" value="Back to all books" class="back-button"/>
        </div>
        <div class="purchase-grid">
            <div class="purchase-book-img">
                {currentBook.image_link ? 
                    <img 
                    src={`${musicBookUrl}/images/purchase/${ currentBook.image_link }`} 
                    alt={`${ currentBook.Book_Name }`} 
                    />
                : null }
            </div>
            <div>
                <h1 class="book-name">{ currentBook.Book_Name }</h1>
                <h3 class="book-author">{ currentBook.Book_Artist }</h3>
                <div class="book-price-container">
                    <h3 class="book-price">${ currentBook.Book_Price }</h3>
                </div>
                    <h3 class="book-level">Difficulty level: { currentBook.Difficulty }</h3>
                    <h5 class="book-shipping">
                        { currentBook.shipping ? "This book can be shipped" : "No hard copy available for this book" }
                    </h5>
                <form onSubmit={handleSubmit}>
                    <button type="submit" class="purchase-book-button">Purchase Book</button>
                </form>
                <h2>Songs included:</h2>
                <ul class="songs-included">
                    {currentSongs.slice(0, 6).map((song, idx, songs) => {
                        <li key={`song-${song.Song_ID}`}>{song.Song_Name}</li>
                        if (idx == songs.length - 1) {
                            return (
                                <>
                                <span 
                                    class="more-songs" 
                                    id={`more-songs-${currentBook.Book_ID}`} 
                                    key={`span-${currentBook.Book_ID}`}
                                    style={{ "display": allSongsDisplayed ? "inline" : "none" }}
                                >
                                    {currentSongs.slice(idx).map((song, idx, songs) => {
                                        return <li key={`song-${song.Song_ID}`}>{song.Song_Name}</li>
                                    })}
                                </span>
                                <p 
                                    id={`see-more-${currentBook.Book_ID}`} 
                                    class="see-more" 
                                    onClick={handleClick} 
                                    key={`see-more-${currentBook.Book_ID}`}
                                    ref={moreSongsRef}
                                    >
                                        See more
                                    </p>
                                </>
                            );
                        } else {
                            return <li key={`song-${song.Song_ID}`}>{song.Song_Name}</li>
                        }
                    })}
                </ul>
                <h2 class="book-description-subheader">Description</h2>
                {currentBook.Book_Description ? ( currentBook.Book_Description.split('\n').map((paragraph) => (
                    <p class="book-description-paragraph">{ paragraph }</p>
                ))
            ) : null }
            </div>
        </div>
        </>
    )
}

export default PurchaseBook;