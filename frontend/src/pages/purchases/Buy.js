import React from 'react';
import '../../styles/styles.css';

function Buy() {
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