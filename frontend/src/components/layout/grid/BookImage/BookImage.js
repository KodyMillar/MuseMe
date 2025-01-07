import React from 'react';

function BookImage({musicBookUrl, book, width="", height="", alt="", className="", id=""}) {
    return (
        <img 
            src={`${musicBookUrl}/images/purchase/${book.image_link}`} 
            width={width}
            height={height}
            alt={alt}
            className={className}
            id={id}
        />
    );
};

export default BookImage;