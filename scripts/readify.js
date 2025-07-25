import { library } from "./data/library.js";

function Book(title, author, pages, status) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary(title, author, pages, status) {
    const book = new Book(title, author, pages, status);
    
    library.push(book);
    renderBooks();
}

addBookToLibrary("Data Science", "JK", 500, "read");

function renderBooks() {
    let booksHTML = '';
    library.forEach((book) => {
        const html = 
        `
            <article class="books-info">
                <h3><q>${book.title}</q></h3>
                <p><strong>Author: </strong>${book.author}</p>
                <p><strong>Length: </strong>${book.pages} pages</p>
                <p><strong>Status: </strong>${book.status}</p>
                <div class="action-buttons">
                    <button class="action">Mark as Read</button>
                    <button class="action">Remove</button>
                </div>
            </article>
        `;
    booksHTML += html;
    });

    document.querySelector('.content').innerHTML = booksHTML;
}

renderBooks();

console.log(library);

