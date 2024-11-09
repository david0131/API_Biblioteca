const Book = require('../models/book.model');

async function createBook(bookData) {
    const newBook = new Book(bookData);
    return await newBook.save();
}

async function getBooks(filters) {
    let query = Book.find({ isDisabled: false });

    if (filters.title) query = query.where('title').equals(filters.title);

    if (filters.author) query = query.where('author').equals(filters.author);

    if (filters.genre) query = query.where('genre').equals(filters.genre);

    if (filters.publicationDate) query = query.where('publicationDate').equals(new Date(filters.publicationDate));

    if (filters.editorialHouse) query = query.where('editorialHouse').equals(filters.editorialHouse);

    if (filters.available) {
        const available = filters.available === 'true' ? false : true;
        query = query.where('isDisabled').equals(available);
    }

    return await query;
}

async function updateBook(bookId, updateData) {
    return await Book.findByIdAndUpdate(bookId, updateData, { new: true });
}

async function softDeleteBook(bookId) {
    return await Book.findByIdAndUpdate(bookId, { isDisabled: true }, { new: true });
}

module.exports = { createBook, getBooks, updateBook, softDeleteBook };