import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
    getMusicBooksAndSongs,
    addBookToPurchased 
    } from '../../api/musicBooks';
import { displayMoreOrLessSongs } from '../../js/purchasePage';
import { useParams } from 'react-router-dom';
import BackToAllBooks from '../../components/buttons/BackToAllBooks/BackToAllBooks';
import BookImage from '../../components/layout/grid/BookImage/BookImage';
import PurchaseButton from '../../components/buttons/PurchaseButton/PurchaseButton';
import SongsIncludedInBook from '../../components/layout/list/SongsIncludedInBook/SongsIncludedInBook';
import styles from './PurchaseBook.module.css';

function PurchaseBook() {
    const [currentBook, setCurrentBook] = useState({});
    const [currentSongs, setCurrentSongs] = useState([]);
    const [purchaseError, setPurchaseError] = useState(null);
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

    function handleSubmit(e) {
        e.preventDefault();
        const isValidParam = /^[0-9]+$/.test(currentBook.Book_ID)
        if (!isValidParam) {
            console.error("Invalid parameter");
        }
        else {
            const encodedId = encodeURIComponent(currentBook.Book_ID);
            addBookToPurchased(currentBook.Book_ID)
                .then((purchasedBook) => navigate(`/buy/purchase-complete/${encodedId}`, { state: purchasedBook }))
                .catch((err) => alert(err.message));  
        }
    }

    const backendHost = process.env.REACT_APP_BACKEND_HOST;
    const backendPort = process.env.REACT_APP_BACKEND_PORT;
    const musicBookUrl = `${backendHost}:${backendPort}`;
    
    return (
        <>
        <BackToAllBooks />
        <div className={styles.purchaseGrid}>
            <div className={styles.purchaseBookImg}>
                {currentBook.image_link ? 
                    <BookImage
                    book={currentBook}
                    musicBookUrl={musicBookUrl}
                    alt={`${ currentBook.Book_Name }`} 
                    />
                : null }
            </div>
            <div>
                <h1 className="bookName">{ currentBook.Book_Name }</h1>
                <h3 className="bookAuthor">{ currentBook.Book_Artist }</h3>
                <div className="bookPriceContainer">
                    <h3 className="bookPrice">${ currentBook.Book_Price }</h3>
                </div>
                    <h3 className="bookLevel">Difficulty level: { currentBook.Difficulty }</h3>
                    <h5 className="bookShipping">
                        { currentBook.shipping ? "This book can be shipped" : "No hard copy available for this book" }
                    </h5>
                <PurchaseButton handleSubmit={handleSubmit} />
                <h2>Songs included:</h2>
                <SongsIncludedInBook currentBook={currentBook} currentSongs={currentSongs} />
                <h2 class="bookDescriptionSubheader">Description</h2>
                {currentBook.Book_Description ? ( currentBook.Book_Description.split('\n').map((paragraph) => (
                    <p class="bookDescriptionParagraph">{ paragraph }</p>
                ))
            ) : null }
            </div>
        </div>
        </>
    );
}

export default PurchaseBook;