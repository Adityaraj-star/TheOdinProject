import { library, addBookToLibrary, removeBookFromLibrary, changeStatus} from "./data/library.js";

const addBookBtn = document.querySelector(".js-add-book-btn");
const formDialog = document.querySelector(".js-form-dialog");
const bookForm = document.querySelector(".js-book-form");
const bookTitle = document.querySelector(".js-book-title");
const bookAuthor = document.querySelector(".js-book-author");
const bookPages = document.querySelector(".js-book-pages");
const bookStatus = document.querySelector(".js-book-status");
const confirmBtn = document.querySelector(".js-confirm-btn");


function renderBooks() {
    let booksHTML = '';
    library.forEach((book) => {
        const html = 
        `
            <article class="books-info">
                <h3><q>${book.title}</q></h3>
                <p><strong>Author: </strong>${book.author}</p>
                <p><strong>Pages: </strong>${book.pages} pages</p>
                <p ><strong>Status: </strong>${book.status}</p>
                <div class="action-buttons">
                    <button class="action js-mark-read" data-book-id = "${book.id}">${book.status === 'read' ? 'Mark as Unread' : 'Mark as Read'}</button>
                    <button class="action js-remove" data-book-id = "${book.id}">Remove</button>
                </div>
            </article>
        `;
    booksHTML += html;
    });

    document.querySelector('.content').innerHTML = booksHTML;

    attachRemoveButtonListeners();//Re-attaches the event listeners again because all HTML was re-rendeered.
    setupMarkReadButtons();
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
    renderBooks();
    
    formDialog.close(); //used to close form dialog when we click confirm btn
});

function attachRemoveButtonListeners() {
    const removeBtns = document.querySelectorAll(".js-remove");
    removeBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const bookId = btn.dataset.bookId;

            removeBookFromLibrary(bookId);
            renderBooks();
        });
    });
}

console.log(library);

function setupMarkReadButtons() {
    const markReadBtns = document.querySelectorAll(".js-mark-read");

    markReadBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const bookId = btn.dataset.bookId;

            changeStatus(bookId);
            renderBooks();
        });
    });

}