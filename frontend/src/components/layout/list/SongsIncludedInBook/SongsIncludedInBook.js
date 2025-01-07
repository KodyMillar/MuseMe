import React, { useState, useEffect, useRef } from 'react';

function SongsIncludedInBook(props) {
    const [allSongsDisplayed, setAllSongsDisplayed] = useState(false);
    const moreSongsRef = useRef(null);

    useEffect(() => {
        if (moreSongsRef.current) {
            moreSongsRef.current.textContent = allSongsDisplayed ? "See less" : "See more";
        }
    }, [allSongsDisplayed]);

    function handleClick() {
        setAllSongsDisplayed(prev => !prev);
    }

    return (
        <ul class="songs-included">
            {props.currentSongs.slice(0, 6).map((song, idx, songs) => {
                if (idx == songs.length - 1) {
                    return (
                        <>
                        <span 
                            class="more-songs" 
                            id={`more-songs-${props.currentBook.Book_ID}`} 
                            key={`span-${props.currentBook.Book_ID}`}
                            style={{ "display": allSongsDisplayed ? "inline" : "none" }}
                        >
                            {props.currentSongs.slice(idx).map((song) => {
                                return <li key={`song-${song.Song_ID}`}>{song.Song_Name}</li>
                            })}
                        </span>
                        <p 
                            id={`see-more-${props.currentBook.Book_ID}`} 
                            class="see-more" 
                            onClick={handleClick}
                            ref={moreSongsRef}
                            >
                                See more
                        </p>
                        </>
                    );
                } else {
                    return <li key="rawr">{song.Song_Name}</li>
                }
            })}
        </ul>
    );
}

export default SongsIncludedInBook;