const express = require('express');
const { register, login, updateUser, deleteUser } = require('../controllers/user.controller');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/update/:id', authMiddleware, updateUser);
router.delete('/delete/:id', authMiddleware, deleteUser);

module.exports = router;