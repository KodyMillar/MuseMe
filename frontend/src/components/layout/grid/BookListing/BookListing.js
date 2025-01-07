import React from 'react';
import BookLabels from '../BookLabel/BookLabels';
import BookImage from '../BookImage/BookImage';

function BookListing({book, musicBookUrl}) {
    return (
        <div>
            <a href={`/buy/purchase/${book.Book_ID}`}>
                <BookImage musicBookUrl={musicBookUrl} book={book} width="200" height="300" />
            </a>
            <BookLabels book={book}>
                <h5 key="instrument">{ book.Instrument }</h5>
                <h5 key="difficulty">{ book.Difficulty }</h5>
            </BookLabels>
        </div>
    );
};

export default BookListing;