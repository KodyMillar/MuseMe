import React from 'react';
import styles from './SeeBooksButton.module.css';

function SeeBooksButton() {
    return (
        <div id={styles['seeBooksButtonDiv']}>
            <a href="/buy">
                <button id={styles['seeBooksButton']}>
                    <h4>See Music Books</h4>
                </button>
            </a>
        </div>
    );
}

export default SeeBooksButton;