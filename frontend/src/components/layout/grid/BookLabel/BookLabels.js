import React from 'react';
import styles from './BookLabels.module.css';

function BookLabels({book}) {
    return (
        <div class={styles.bookLabels}>
            <div class={styles.bookInfo}>
                <h5>{ book.Instrument }</h5>
                <h5>{ book.Difficulty }</h5>
            </div>
            <h4 class={styles.bookName}>{ book.Book_Name }</h4>
        </div>
    );
};

export default BookLabels;