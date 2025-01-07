import React from 'react';
// import { useNavigate } from 'react-router-dom';
import styles from './PurchaseButton.module.css';

function PurchaseButton(props) {

    // function handleClick() {
    //     navigate(`/buy/purchase-complete/${props.book.Book_ID}`);
    // }

    return (
        <form onSubmit={props.handleSubmit}>
            <button type="submit" className={styles.purchaseBookButton}>Purchase Book</button>
        </form>
    );  
};

export default PurchaseButton;