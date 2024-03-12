import { DataService } from "./data.service.js";
import { Book } from "./book.model.js";
import { createPath } from "./utils.js";
import { loggerEmitter } from "./logger.js";

const BOOKS_PATH = createPath(["data", "books.json"]);

const getAllBooks = async () => {
    const books = await DataService.readJSONFile(BOOKS_PATH);

    return books;
}; 

const saveBooks = async books => {
    await DataService.saveJSONFile(BOOKS_PATH, books);
}

const createBook = async (title, author, publicationYear, quantity) => {
    const books = await getAllBooks();

    const newBook = new Book(title, author, publicationYear, quantity);

    const updatedBooks = [...books, newBook];

    await saveBooks(updatedBooks);

    loggerEmitter.emit("create-book", newBook.id);
};

const getBookById = async bookId => {
    const books = await getAllBooks();

    const foundBook = books.find(book => book.id === bookId);

    if (!foundBook) throw new Error("BOOK NOT FOUND!");

    return foundBook;
};

const updateBook = async (bookId, newTitle, newAuthor, newPublicationYear, newQuantity) => {
    const books = await getAllBooks();

    const idExists = books.some(books => books.id === bookId);

    if (!idExists) throw new Error("Can't update book! Book not found!");

    const updatedBooks = books.map(book => {
        if (book.id === bookId) {
            return { ...book, title: newTitle, author: newAuthor, publicationYear: newPublicationYear, quantity: newQuantity };
        } else {
            return book;
        }
    });

    await saveBooks(updatedBooks);

    loggerEmitter.emit("edit-book", bookId);
};

export { getAllBooks, createBook, getBookById, updateBook };