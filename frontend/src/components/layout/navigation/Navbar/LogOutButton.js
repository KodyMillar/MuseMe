import React from 'react';
import styles from './Navbar.module.css';

function LogOutButton() {
    return (
        <form action="/auth/login" method="GET" id={styles['logOut']}>
            <input type="submit" value="Log Out"/>
        </form>
    );
};

export default LogOutButton;