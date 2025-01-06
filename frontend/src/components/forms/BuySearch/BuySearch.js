import React, { useState } from 'react';
import styles from './BuySearch.module.css';

function BuySearch(props) {
    return (
        <div id={styles["buySearchbarDiv"]}>
            <form onSubmit={props.handleSubmit}>
                <input 
                    placeholder="search book name..." 
                    id={styles["buySearchbar"]} 
                    type="search" 
                    name="searchText"
                    value={props.searchText}
                    onChange={({target}) => props.setSearchText(target.value)}
                />
            </form>
        </div>
    );
}

export default BuySearch;