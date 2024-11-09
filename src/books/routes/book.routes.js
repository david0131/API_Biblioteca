const express = require('express');
const { createBook, readBooks, updateBook, deleteBook } = require('../controllers/book.controller');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createBook);
router.get('/', authMiddleware, readBooks);
router.put('/:bookId', authMiddleware, updateBook);
router.delete('/:bookId', authMiddleware, deleteBook);

module.exports = router;