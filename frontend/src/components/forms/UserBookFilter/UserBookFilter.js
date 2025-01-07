import React from 'react';
import styles from './UserBookFilter.module.css';

function UserBookFilter(props) {

    return (
        <form action={`/play/search/song-progress/<%= ${props.userId} %>`}
            method="get" 
            className={styles.userBookFilterButton}
            id={styles[`#${props.formId}`]} 
        >
            <span class={styles.buttonEdge} id={styles["`#${props.spanId}`"]}></span>
            <input type="submit" 
                value={props.value}
                name="user-book-filter" 
                className={styles.innerButton}
                id={styles[`${props.inputId}`]}
            />
        </form>
    );
}

export default UserBookFilter;