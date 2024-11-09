const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    publicationDate: Date,
    editorialHouse: String,
    available: { type: Boolean, default: true },
    isDisabled: { type: Boolean, default: false },
    history: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            reservedDate: Date,
            returnDate: Date,
        }
    ],
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);