import React, { useState, useEffect } from 'react';
import { getMusicBooks, searchMusicBooks } from '../../api/musicBooks';
import '../../styles/styles.css';
import BuySideBar from '../../components/layout/navigation/BuySideBar/BuySideBar';
import BuySearch from '../../components/forms/BuySearch/BuySearch';
import BookListing from '../../components/layout/grid/BookListing/BookListing';

function Buy() {
    const [musicBooks, setMusicBooks] = useState([]);
    const [searchText, setSearchText] = useState("");
    
    useEffect(() => {
        async function requestBooks() {
            const musicBooks = await getMusicBooks();
            setMusicBooks(musicBooks);
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
        <BuySearch searchText={searchText} setSearchText={setSearchText} handleSubmit={handleSubmit} />
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