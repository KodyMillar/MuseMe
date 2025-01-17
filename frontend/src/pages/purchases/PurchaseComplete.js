import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function PurchaseComplete() {
    const location = useLocation();
    const data = location.state;
    const [purchasedBook, setPurchasedBook] = useState(data);
    
    return (
        <div class="purchase-complete-message">
            <h3>Purchase complete</h3>
            <p>You have successfully purchased:</p>
            <h3>{ purchasedBook.Book_Name }</h3>
            <p>Go to your play page to begin playing!</p> 
            <a href="/play">Start Playing</a>
        </div>
    );
}

export default PurchaseComplete;