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



    return book;
}

console.log(addBookToLibrary("data science", "jj", "958", "yes"));