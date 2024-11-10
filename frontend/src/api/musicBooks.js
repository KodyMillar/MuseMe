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