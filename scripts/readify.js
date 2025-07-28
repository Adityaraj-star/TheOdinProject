import { library, addBookToLibrary } from "./data/library.js";

const addBookBtn = document.querySelector(".js-add-book-btn");
const formDialog = document.querySelector(".js-form-dialog");
const bookForm = document.querySelector(".js-book-form");
const bookTitle = document.querySelector(".js-book-title");
const bookAuthor = document.querySelector(".js-book-author");
const bookPages = document.querySelector(".js-book-pages");
const bookStatus = document.querySelector(".js-book-status");
const confirmBtn = document.querySelector(".js-confirm-btn");
const markReadBtn = document.querySelector(".js-mark-read");
const removeBtn = document.querySelector(".js-remove");


export function renderBooks() {
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


addBookBtn.addEventListener('click', () => {
    formDialog.showModal();
});

bookForm.addEventListener('submit', (event) => {
    event.preventDefault();
});





confirmBtn.addEventListener('click', () => {
    const title = bookTitle.value;
    const author = bookAuthor.value;
    const pages = bookPages.value;
    const status = bookStatus.checked ? 'read' : 'unread';
    // checked property tells if checkbox is checked or not
    

    addBookToLibrary(title, author, pages, status);

    formDialog.close(); //used to close form dialog when we click confirm btn
});




