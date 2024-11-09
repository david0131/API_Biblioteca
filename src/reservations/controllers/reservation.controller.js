const reservationActions = require('../action/reservation.action');

const createReservation = async (req, res) => {
    try {
        const userId = req.user.id;
        const { bookId } = req.body;

        const reservation = await reservationActions.createReservationAction(userId, bookId);
        res.status(201).json({ message: 'Reserva creada exitosamente', reservation });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getReservationHistoryByBook = async (req, res) => {
    try {
        const { bookId } = req.params;
        const history = await reservationActions.getBookReservationHistory(bookId);
        res.status(200).json(history);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getReservationHistoryByUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const history = await reservationActions.getUserReservationHistory(userId);
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el historial del usuario' });
    }
};

const returnBook = async (req, res) => {
    try {
        const { reservationId } = req.params;
        const reservation = await reservationActions.returnBookAction(reservationId);
        res.status(200).json({ message: 'Libro devuelto exitosamente', reservation });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = { createReservation, getReservationHistoryByBook, getReservationHistoryByUser, returnBook };