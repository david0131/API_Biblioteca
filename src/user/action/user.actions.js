const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function existUser(email) {
    return await User.findOne({ email });
}

async function saveAndRegister(name, email, password, role) {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();

    return jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

async function loged(password, user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null

    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
}

async function updateUser(userId, updateData) {
    if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
}

async function softDeleteUser(userId) {
    return await User.findByIdAndUpdate(userId, { isDisabled: true }, { new: true });
}

async function getUserById(id) {
    return await User.findById(id);
}

module.exports = { existUser, saveAndRegister, loged, updateUser, softDeleteUser, getUserById };