import { renderBooks } from "../readify.js";

export let library;

loadFromStorage();

function loadFromStorage() {
    library = JSON.parse(localStorage.getItem('library'));

    if (!library) {
        library = [
            {
                id: crypto.randomUUID(),
                title: 'The Alchemist',
                author: 'Paulo Coelho',
                pages: 208,
                status: 'unread'
            },
            {
                id: crypto.randomUUID(),
                title: '1984',
                author: 'George Orwell',
                pages: 328,
                status: 'unread'
            },
        ];
        saveToStorage(); //To store default books on first load
    }
}


function saveToStorage() {
    localStorage.setItem('library', JSON.stringify(library));
}

function Book(id, title, author, pages, status) {
    this.id = id
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

export function addBookToLibrary(bookTitle, bookAuthor, bookPages, bookStatus) {
    const  bookId = crypto.randomUUID();
    const book = new Book(bookId, bookTitle, bookAuthor, bookPages, bookStatus);
    
    library.push(book);
    renderBooks();

    saveToStorage();
}
