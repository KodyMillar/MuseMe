import React from 'react';
import styles from './BackToAllBooks.module.css';

function BackToAllBooks() {
    return (
        <div id={styles["backButtonPurchase"]}>
            <input type="submit" value="Back to all books" className={styles.backButton}/>
        </div>
    );
};

export default BackToAllBooks;