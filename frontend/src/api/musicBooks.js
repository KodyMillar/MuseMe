import { baseUrl } from './index';

export async function getMusicBooks() {
    try {
        const response = await fetch(`${baseUrl}/buy`, {
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json'
            }
        });

        const books = await response.json();
        console.log(books);

        return books;

    } catch (err) {
        console.log("Error fetching all music books from backend")
        console.log(err.message);
    }
};


export async function getMusicBooksAndSongs(bookId) {
    console.log("sending request for book to backend")
    const response = await fetch(`${baseUrl}/buy/purchase/${bookId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });

    const booksAndSongs = await response.json();

    return JSON.parse(booksAndSongs);
}


export const addBookToPurchased = async (bookId) => {
    try {
        console.log(baseUrl);
        const response = await fetch (`${baseUrl}/buy/purchase-complete/${bookId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.status == 409) {
            throw new Error("You have already purchased this item.");
        }
        else if (response.status == 500) {
            throw new Error("Unable to complete purchase. Please try again in a few minutes.");
        }
        else if (response.status == 401) {
            throw new Error("Session has expired, please log in again.")
        }

        console.log(response);

        const purchasedBook = await response.json();

        return JSON.parse(purchasedBook);
    
    } catch (err) {
        console.log(err.name);
        console.log(err.message);
        throw err;
    }
}