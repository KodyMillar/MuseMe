import React from 'react';
import styles from './BuySideBar.module.css';

function BuySideBar() {
    return (
        <div id={styles["buySidebar"]}>
            <div id={styles["buySidebarList"]}>
                <div>Instrument</div>
                <div>Difficulty Level</div>
                <div>Composer</div>
                <div>Course Bundle</div>
            </div>
        </div>
    );
};

export default BuySideBar;