import { library } from "./data/library.js";

const addBookBtn = document.querySelector(".js-add-book-btn");
const formDialog = document.querySelector(".js-form-dialog");
const bookForm = document.querySelector(".js-book-form");
const bookTitle = document.querySelector(".js-book-title");
const bookAuthor = document.querySelector(".js-book-author");
const bookPages = document.querySelector(".js-book-pages");
const bookStatus = document.querySelector(".js-book-status");
const confirmBtn = document.querySelector(".js-confirm-btn");


function Book(id, title, author, pages, status) {
    this.id = id
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary(bookId, bookTitle, bookAuthor, bookPages, bookStatus) {
    const book = new Book(bookId, bookTitle, bookAuthor, bookPages, bookStatus);
    
    library.push(book);
    renderBooks();
}

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


addBookBtn.addEventListener('click', () => {
    formDialog.showModal();
});

bookForm.addEventListener('submit', (event) => {
    event.preventDefault();
});

confirmBtn.addEventListener('click', () => {
    formDialog.close();
})


function retrieveBookData() {
    let title, author, pages, status;
    confirmBtn.addEventListener('click', () => {
        title = bookTitle.value;
        author = bookAuthor.value;
        pages = bookPages.value;

        // checked property tells if checkbox is checked or not
        if (bookStatus.checked) {
            status = "read";
        } else {
            status = "unread";
        }

        addBookToLibrary(crypto.randomUUID(), title, author, pages, status);
    });


}

retrieveBookData();



