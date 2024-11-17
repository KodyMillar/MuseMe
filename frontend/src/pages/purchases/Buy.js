import React, { useState, useEffect } from 'react';
import { getMusicBooks, searchMusicBooks } from '../../api/musicBooks';
import '../../styles/styles.css';

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
        <div id="buy-sidebar">
            <div id="buy-sidebar-list">
                <div>Instrument</div>
                <div>Difficulty Level</div>
                <div>Composer</div>
                <div>Course Bundle</div>
            </div>
        </div>
        <div id="buy-searchbar-div">
            <form onSubmit={handleSubmit}>
                <input 
                    placeholder="search book name..." 
                    id="buy-searchbar" 
                    type="search" 
                    name="searchText" 
                    value={searchText}
                    onChange={({target}) => setSearchText(target.value)} 
                />
            </form>
        </div>
        <section>
            <div id="buy-grid">
                {musicBooks.map((book) => (
                    <div class="book-div">
                        <a href={`/buy/purchase/${book.Book_ID}`}>
                            <img src={`${musicBookUrl}/images/purchase/${book.image_link}`} width="200" height="300" />
                        </a>
                        <div class="book-labels">
                            <h5>{ book.Instrument }</h5>
                            <h5>{ book.Difficulty }</h5>
                        </div>
                        <h4>{ book.Book_Name }</h4>
                    </div>
                ))}
            </div>
        </section>
        </>
    )
}

export default Buy;