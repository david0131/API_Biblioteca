const Reservation = require('../models/reservation.model');
const Book = require('../../books/models/book.model');

async function createReservationAction(userId, bookId) {
    const book = await Book.findById(bookId);
    if (!book || !book.available) {
        throw new Error('El libro no está disponible');
    }

    const reservation = new Reservation({
        userId,
        bookId,
        reservedDate: new Date()
    });
    await reservation.save();

    book.available = false;
    book.history.push({ userId, reservedDate: reservation.reservedDate });
    await book.save();

    return reservation;
}

async function getBookReservationHistory(bookId) {
    const book = await Book.findById(bookId).populate('history.userId', 'name email');
    if (!book) throw new Error('Libro no encontrado');

    return book.history;
}

async function getUserReservationHistory(userId) {
    return await Reservation.find({ userId })
        .populate('bookId', 'title')
        .select('reservedDate returnDate');
}

async function returnBookAction(reservationId) {
    const reservation = await Reservation.findById(reservationId).select('-__v');
    if (!reservation) throw new Error('Reserva no encontrada');

    reservation.returnDate = new Date();
    await reservation.save();

    const book = await Book.findById(reservation.bookId);
    if (book) {
        book.available = true;
        await book.save();
    }

    return reservation;
}

module.exports = { createReservationAction, getBookReservationHistory, getUserReservationHistory, returnBookAction };
