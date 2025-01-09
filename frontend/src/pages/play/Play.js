import React, { useState, useEffect } from 'react';
import UserBookFilter from '../../components/forms/UserBookFilter/UserBookFilter';
import SearchBar from '../../components/forms/SearchBar/SearchBar';
import { getUserBooksAndSongs } from '../../api/musicBooks';
import '../../styles/styles.css';

function Play() {
    const [searchText, setSearchText] = useState("");
    const [userBooks, setUserBooks] = useState({});
    const [bookSongs, setBookSongs] = useState({});
    const [bookToOpen, setBookToOpen] = useState(null);
    const [songToOpen, setSongToOpen] = useState(null);
    const [songsCompleted, setSongsCompleted] = useState({});
    const [songsInProgress, setSongsInProgress] = useState({});

    useEffect(() => {
        async function requestBooksAndSongs() {
            try {
                const booksAndSongs = await getUserBooksAndSongs();
                setUserBooks(booksAndSongs.books);
                setBookSongs(booksAndSongs.bookSongs);
                setBookToOpen(booksAndSongs.bookToOpen);
                setSongToOpen(booksAndSongs.songToOpen);
                setSongsCompleted(booksAndSongs.songsCompleted);
                setSongsInProgress(booksAndSongs.songsInProgress);
            } catch (err) {
                console.log(err.name);
            }
        }
        requestBooksAndSongs();
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        // searchMusicBooks(searchText)
        //     .then((filteredBooks) => setMusicBooks(filteredBooks))
        //     .catch((err) => console.log(err));
    }

    const userBookUrl = `${process.env.REACT_APP_BACKEND_HOST}:${process.env.REACT_APP_BACKEND_PORT}`

    let booksDisplayed;
    if (userBooks && userBooks.length > 0) {
        booksDisplayed = (
            <div id="play-grid">
            {Object.keys(userBooks).forEach((book) => {
                return (
                <div class="user-book-listing">
                    <img 
                        src={`${userBookUrl}/images/purchase/${userBooks[book].image_link}`} 
                        width="220" 
                        height="340" 
                        class="user-book-img" 
                        id={`book-id-${userBooks[book].Book_ID}`}
                        key={userBooks[book].Book_ID}
                    />
                    <h4>{ userBooks[book].Book_Name }</h4>
                    <div class="user-book-info">
                        <h5>Songs Completed: { songsCompleted[userBooks[book].Book_ID] }</h5>
                        <h5>Difficulty: { userBooks[book].Difficulty }</h5>
                    </div>
                    <h5 class="in-progress-count">Songs in progress: { songsInProgress[userBooks[book].Book_ID] }</h5>
                </div>
                )
            })}
            </div>
            );
    } else {
        booksDisplayed = (
            <div class="no-books">
                <h3 >You don't have any books yet</h3>
                <form action="/buy" method="get">
                    <input type="submit" value="Purchase Books" />
                </form>
            </div>
        );
    }

    async function getSongPages(song) {
        const songPages = [];
        for (let i=1; i <= song.pages; i++) {
            songPages.push(
            <img 
                src={`${userBookUrl}/images/songs/${song.Image_Link}/page${i}.jpg`} 
                class="book-song"
            />);
        };
        return songPages;
    }
    console.log(booksDisplayed);
    return (
        <>  
        <h1 id="play-page-header">Your Books</h1>
        <div class="user-book-filters">
            <UserBookFilter formId="leftFilter" spanId="buttonEdgeLeft" inputId="innerButtonLeft" value="Not Started" userId="3f2973db-5f51-4b0d-b87b-74302036c8a2" />
            <UserBookFilter formId="centerFilter" spanId="buttonEdgeCenter" inputId="innerButtonCenter" value="In Progress" userId="3f2973db-5f51-4b0d-b87b-74302036c8a2" />
            <UserBookFilter formId="rightFilter" spanId="buttonEdgeRight" inputId="innerButtonRight" value="Completed" userId="3f2973db-5f51-4b0d-b87b-74302036c8a2" />
        </div>
        <SearchBar
            className="playPageSearch"
            placeholder="search your books..."
            searchText={searchText}
            setSearchText={setSearchText}
            handleSubmit={handleSubmit}
        >
            <option value="book">Book</option>
            <option value="song">Song</option>
        </SearchBar>
        {booksDisplayed}
        {/* { if (userBooks.length > 0)  }
        <div id="play-grid">
            <% for (let book of userBooks) { %>
                <div class="user-book-listing">
                    <img src="/images/purchase/<%= book.image_link %>" width="220" height="340" class="user-book-img" id="book-id-<%= book.Book_ID %>">
                    <h4><%= book.Book_Name %></h4>
                    <div class="user-book-info">
                        <h5>Songs Completed: <%= songsCompleted[book.Book_ID] %></h5>
                        <h5>Difficulty: <%= book.Difficulty %></h5>
                    </div>
                    <h5 class="in-progress-count">Songs in progress: <%= songsInProgress[book.Book_ID] %></h5>
                </div>
            <% } %>
        </div>
        <% } else { %>
            <div class="no-books">
                <h3 >You don't have any books yet</h3>
                <form action="/buy" method="get">
                    <input type="submit" value="Purchase Books" />
                </form>
            </div>
        <% } %> */}
        {/* {bookSongs && Object.keys(bookSongs).map((book) => {
            const isOpen = bookToOpen && book === bookToOpen;
            return (
                <div 
                    className={isOpen ? "book-songs-window-visible" : "book-songs-window"}
                    id={`book-window-id-${bookSongs[book][0].Book_ID}`}
                >
                <div>
                    {bookSongs[book].map((song) => {   
                        const isSongToOpen = songToOpen && song.Song_ID === parseInt(songToOpen);
                        return (
                            <div>
                                <div 
                                    class={isSongToOpen ? "song-pages-visible" : "song-pages"} 
                                    id={`song-pages-${song.Song_ID}`}
                                > 
                                <button class="close-full-screen-button">Exit Full Screen</button>
                                <button class="full-screen-button">Full Screen</button>
                                {getSongPages(song)}
                                </div>
                            </div>
                        );
                    })}
                </div>
                </div>
            );
            })}; */}
            {/* </div> */}
            {/* })} */}
            {/*<div class="songs-list">
                <div class="close-book-button"><h6>Close book</h6></div>
                <h2 class="book-title"><%= bookSongs[book][0].Book_Name %></h2>
                <% for (let song of bookSongs[book]) { %>
                    <div class="song" id="song-id-<%= song.Song_ID %>">
                        <h3 class="song-name"><%= song.Song_Name %></h3>
                        <div class="user-song-info">
                            <h4 class="song-difficulty"><%= song.Difficulty %></h4>
                            <div class="song-progress">
                                <h4><%= song.progress %></h4>
                                <p class="arrow-parent"><i class="song-progress-arrow"></i></p>
                                <form action="/play" method="post">
                                <fieldset class="song-progress-dropdown hidden">
                                    <div class="song-progress-dropdown-item">
                                        <input type="radio" id="not-started-<%= song.Book_ID %>-<%= song.Song_ID %>-<%= song.User_ID %>" name="song-progress" value="Not Started"/>
                                        <label for="not-started-<%= song.Book_ID %>-<%= song.Song_ID %>-<%= song.User_ID %>">Not Started</label>
                                    </div>
                                    <div class="song-progress-dropdown-item">
                                        <input type="radio" id="in-progress-<%= song.Book_ID %>-<%= song.Song_ID %>-<%= song.User_ID %>" name="song-progress" value="In Progress" />
                                        <label for="in-progress-<%= song.Book_ID %>-<%= song.Song_ID %>-<%= song.User_ID %>">In Progress</label>
                                    </div>
                                    <div class="song-progress-dropdown-item">
                                        <input type="radio" id="completed-<%= song.Book_ID %>-<%= song.Song_ID %>-<%= song.User_ID %>" name="song-progress" value="Completed" />
                                        <label for="completed-<%= song.Book_ID %>-<%= song.Song_ID %>-<%= song.User_ID %>">Completed</label>
                                    </div>
                                    <input type="hidden" name="song-progress-id" value="song-progress~<%= song.Book_ID %>~<%= song.Song_ID %>~<%= song.User_ID %>" />
                                    <input type="submit" value="submit" />
                                </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                <% } %>
            </div>
		    </div>*/}
		{/* </div> */}
	    {/* // <% } %></div> */}
        </>
    );
}

export default Play;