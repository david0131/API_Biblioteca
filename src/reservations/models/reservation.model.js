const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
    reservedDate: { type: Date, default: Date.now },
    returnDate: Date,
});

module.exports = mongoose.model('Reservation', reservationSchema);