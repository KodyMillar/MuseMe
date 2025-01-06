import React from 'react';
import styles from './Navbar.module.css'

function NavbarItems() {
    
    return (
        <div id={styles['navbarItems']}>
            <a href="/play"><h3>Play</h3></a>
            <a href="/buy"><h3>Buy</h3></a>
            <a href="/my-progress"><h3>My Progress</h3></a>
            <a href="/wishlist"><h3>Wishlist</h3></a>
        </div>
    );
}

export default NavbarItems;