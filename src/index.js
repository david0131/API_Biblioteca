const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./user/routes/user.routes');
const bookRoutes = require('./books/routes/book.routes');
const reservationRoutes = require('./reservations/routes/reservation.routes');
const config = require('./config');

const app = express();
app.use(bodyParser.json());

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error conectando a MongoDB:', err));

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/reservations', reservationRoutes);

app.listen(config.port, () => {
    console.log(`Servidor corriendo en el puerto ${config.port}`);
    console.log("http://localhost:5000"); 
});