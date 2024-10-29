import React, { useState, useEffect } from 'react';
import { getMusicBooks } from '../../api/musicBooks';
import '../../styles/styles.css';

function Buy() {

    const [musicBooks, setMusicBooks] = useState([]);
    
    useEffect(() => {
        async function requestBooks() {
            const musicBooks = await getMusicBooks();
            setMusicBooks(musicBooks);
        }
        requestBooks();
    }, []);

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
            <form action="/buy/search" method="get">
                <input placeholder="search book name..." id="buy-searchbar" type="search" name="searchText"></input>
            </form>
        </div>
        <section>
            <div id="buy-grid">
                {musicBooks.map((book) => (
                    <div class="book-div">
                        <a href={`/buy/purchase/${book.Book_ID}`}><img src={`${musicBookUrl}/images/purchase/${book.image_link}`} width="200" height="300" /></a>
                        <div class="book-labels"><h5>{ book.Instrument }</h5><h5>{ book.Difficulty }</h5></div>
                        <h4>{ book.Book_Name }</h4>
                    </div>
                ))}
                {/* <% for (let book of songBooks) { %>
                <div class="book-div">
                    <a href="/buy/purchase/<%= book.Book_ID %>"><img src="/images/purchase/<%= book.image_link %>" width="200" height="300"></a>
                    <div class="book-labels"><h5><%= book.Instrument %></h5><h5><%= book.Difficulty %></h5></div>
                    <h4><%= book.Book_Name %></h4>
                </div>
                <% } %> */}
            </div>
        </section>
        </>
    )
}

export default Buy;