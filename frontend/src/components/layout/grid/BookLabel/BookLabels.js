import React from 'react';
import styles from './BookLabels.module.css';

function BookLabels({book, children}) {
    return (
        <div className={styles.bookLabels}>
            <div className={styles.bookInfo}>
                {React.Children.toArray(children)}
            </div>
            <h4 className={styles.bookName}>{ book.Book_Name }</h4>
        </div>
    );
};

export default BookLabels;