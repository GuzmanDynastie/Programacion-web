const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Middleware para manejar errores de respuesta de HTTP
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: error.message });
};

// Aplicar los middlewares
app.use(errorHandler);

// Routes
app.use(require('./routes/admin'));
app.use(require('./routes/home'));
app.use(require('./routes/products'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// Levantar el servidor en el puerto 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
})