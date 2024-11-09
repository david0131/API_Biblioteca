const User = require('../models/user.model');
const userActions = require('../action/user.actions')
const jwtUtils = require('../../utils/jwtUtils'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await userActions.existUser(email);
    if (existingUser) return res.status(400).json({ message: 'Usuario ya existe' });

    const token = await userActions.saveAndRegister(name, email, password);

    res.status(201).json({ token });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await userActions.existUser(email);
    if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

    if (user.isDisabled) return res.status(403).json({ message: 'Tu cuenta ha sido inhabilitada. Contacta al soporte.' });

    const token = await userActions.loged(password, user); 
    if (!token) return res.status(400).json({ message: 'Contraseña incorrecta' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userRole = decoded.role;

    res.status(200).json({ token, userRole });
};


const updateUser = async (req, res) => {
    try {
        const userAuthId = req.user.id;
        const userEditId = req.params.id;
        const userRole = req.user.role;

        if (userAuthId !== userEditId && userRole !== "admin") return res.status(403).json({ message: 'No tienes permiso para modificar este usuario' });
        
        const { name, email, password, role } = req.body;
        const updatedData = { name, email, password, role };

        const updatedUser = await userActions.updateUser(userEditId, updatedData);
        if (!updatedUser) return res.status(400).json({ message: 'Error al actualizar el usuario' });

        const userWithDates = await userActions.getUserById(userEditId);

        const token = jwtUtils.generateToken(userWithDates);

        res.status(200).json({ 
            message: 'Usuario actualizado', 
            user: {
                name: userWithDates.name,
                email: userWithDates.email,
                role: userWithDates.role,
                isDisabled: userWithDates.isDisabled,
                createdAt: userWithDates.createdAt,
                updatedAt: userWithDates.updatedAt
            },
            token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id: userId } = req.params;
        const { id: authUserId, role } = req.user;

        if (authUserId !== userId && role !== 'admin') return res.status(403).json({ message: 'No tienes permiso para inhabilitar este usuario' });

        const softDeletedUser = await userActions.softDeleteUser(userId);
        if (!softDeletedUser) return res.status(400).json({ message: 'Error al inhabilitar el usuario' });

        res.status(200).json({ message: 'Usuario inhabilitado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};

module.exports = { register, login, updateUser, deleteUser };