const express = require('express');
const authMiddleware = require('../../middleware/authMiddleware');
const { createReservation, getReservationHistoryByBook,
        getReservationHistoryByUser, returnBook } = require('../controllers/reservation.controller');

const router = express.Router();

router.post('/', authMiddleware, createReservation);
router.get('/book/:bookId', authMiddleware, getReservationHistoryByBook);
router.get('/user/history', authMiddleware, getReservationHistoryByUser);
router.put('/return/:reservationId', authMiddleware, returnBook);

module.exports = router;
