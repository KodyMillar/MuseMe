import React, { useState, useEffect } from 'react';
import { getMusicBooks, searchMusicBooks } from '../../api/musicBooks';
import '../../styles/styles.css';
import BuySideBar from '../../components/layout/navigation/BuySideBar/BuySideBar';
import SearchBar from '../../components/forms/SearchBar/SearchBar';
import BookListing from '../../components/layout/grid/BookListing/BookListing';
import styles from './PurchaseBook.module.css';

function Buy() {
    const [musicBooks, setMusicBooks] = useState([]);
    const [searchText, setSearchText] = useState("");
    
    useEffect(() => {
        async function requestBooks() {
            try {
                const musicBooks = await getMusicBooks();
                setMusicBooks(musicBooks);
            } catch(err) {
                console.log(err);
            }
        }
        requestBooks();
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        searchMusicBooks(searchText)
            .then((filteredBooks) => setMusicBooks(filteredBooks))
            .catch((err) => console.log(err));
    }

    const musicBookUrl = `${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}`

    return (
        <>
        <BuySideBar />
        <div id={styles["buySearchbarDiv"]}>
            <SearchBar
                placeholder="search book name..."
                searchText={searchText} 
                setSearchText={setSearchText} 
                handleSubmit={handleSubmit}
                searchId="buySearchBar"
            >
                    <option>Book</option>
                    <option>Composer</option>
                    <option>Difficulty</option>
            </SearchBar>
        </div>
        <section>
            <div id="buy-grid">
                {musicBooks.map((book) => (
                    <BookListing book={book} musicBookUrl={musicBookUrl} />
                ))}
            </div>
        </section>
        </>
    );
}

export default Buy;