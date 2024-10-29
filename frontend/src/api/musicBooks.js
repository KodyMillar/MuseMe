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
}