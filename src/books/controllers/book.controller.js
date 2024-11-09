const bookActions = require('../action/book.action');

const createBook = async (req, res) => {
    if (req.user.role !== 'librarian') {
        return res.status(403).json({ message: 'No tienes permiso para crear libros' });
    }

    try {
        const { title, author, genre, publicationDate, editorialHouse } = req.body;
        const newBook = await bookActions.createBook({ title, author, genre, publicationDate, editorialHouse });
        res.status(201).json({ message: 'Libro creado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el libro' });
    }
};

const readBooks = async (req, res) => {
    try {
        const filters = req.query;
        const books = await bookActions.getBooks(filters);
        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los libros' });
    }
};

const updateBook = async (req, res) => {
    if (req.user.role !== 'librarian') {
        return res.status(403).json({ message: 'No tienes permiso para actualizar libros' });
    }

    try {
        const { bookId } = req.params;
        const updateData = req.body;
        const updatedBook = await bookActions.updateBook(bookId, updateData);
        res.status(200).json(updatedBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar el libro' });
    }
};

const deleteBook = async (req, res) => {
    if (req.user.role !== 'librarian') {
        return res.status(403).json({ message: 'No tienes permiso para eliminar libros' });
    }

    try {
        const { bookId } = req.params;
        await bookActions.softDeleteBook(bookId);
        res.status(200).json({ message: 'Libro inhabilitado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al inhabilitar el libro' });
    }
};

module.exports = { createBook, readBooks, updateBook, deleteBook };