import React, { useState } from 'react';
import styles from './SearchBar.module.css';

function SearchBar(props) {
    const {className = ""} = props;
    const {searchId = ""} = props;

    return (
        <form onSubmit={props.handleSubmit} className={styles[className]}>
            <input 
                placeholder={props.placeholder} 
                id={styles[searchId]} 
                type="search" 
                name="searchText"
                value={props.searchText}
                onChange={({target}) => props.setSearchText(target.value)}
            />
            <select id={styles['searchType']}>
                {props.children}
            </select>
        </form> 
    );
}

export default SearchBar;