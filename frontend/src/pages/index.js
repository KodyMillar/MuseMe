import React, { useState, useEffect } from 'react';
import { composers } from '../assets/composers';
import '../styles/styles.css';

function Home() {
    const [composerImages, setComposerImages] = useState([]);

    useEffect(() => {
        setComposerImages(composers);
    }, []);

    return (
        <>
        <section id="homepage-top">
            <h1 id="app-name">MuseMe</h1>
            <div id="shop-div"><a href="/buy"><button id="shop-button"><h4>See Music Books</h4></button></a></div>
        </section>
        <section class="homepage-section">
            <h3 class="home-section-heading">Music Sheets From the Greats</h3>
            <div id="composers">
                {composerImages.map((imageName, idx) => (
                    <img 
                        key={idx}
                        src={`/images/composers/${imageName}`}
                        alt={imageName}
                    />
                ))}
                {/* <% for (let composer of composers) { %> */}
                {/* <img src="images/composers/<%= composer %>"> */}
                {/* <% } %> */}
            </div>
        </section>
        </>
    );
}

export default Home;