import React from 'react';
import '../styles/styles.css';

function Navbar() {
    
    return (
        <div class="header clearfix">
            <nav id="navbar">
                <a href="/" id="homepage"><h2>MuseMe</h2></a>
                <div id="navbar-div">
                    <div id="navbar-items">
                        <a href="/play"><h3>Play</h3></a>
                        <a href="/buy"><h3>Buy</h3></a>
                        <a href="/my-progress"><h3>My Progress</h3></a>
                        <a href="/wishlist"><h3>Wishlist</h3></a>
                    </div>
                </div>
                <form action="/auth/login" method="GET" id="log-out">
                    <input type="submit" value="Log Out"/>
                </form>
            </nav>
        </div>
    )
}

export default Navbar;