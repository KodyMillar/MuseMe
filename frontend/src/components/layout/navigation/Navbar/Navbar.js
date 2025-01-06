import React from 'react';
import NavbarItems from './NavbarItems';
import LogOutButton from './LogOutButton';
import styles from './Navbar.module.css'

function Navbar() {
    
    return (
        <div class="header clearfix">
            <nav id={styles['navbar']} >
                <a href="/" id={styles['homePage']}><h2>MuseMe</h2></a>
                <div id={styles['navbarDiv']}>
                    <NavbarItems />
                </div>
                <LogOutButton />
            </nav>
        </div>
    )
}

export default Navbar;