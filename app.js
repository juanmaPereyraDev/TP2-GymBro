const express = require('express');
const app = express();
const socioRoutes = require('./src/routes/socioRoutes');
const membresiaRoutes = require('./src/routes/membresiaRoutes');
const pagoRoutes = require('./src/routes/pagoRoutes');
const claseRoutes = require('./src/routes/claseRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const { verificarToken } = require('./src/middleware/authMiddleware');

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ mensaje: 'API Gym-Bro funcionando correctamente' });
});

app.use('/api/auth', usuarioRoutes);
app.use('/api/socios', verificarToken, socioRoutes);
app.use('/api/membresias', verificarToken, membresiaRoutes);
app.use('/api/pagos', verificarToken, pagoRoutes);
app.use('/api/clases', verificarToken, claseRoutes);

module.exports = app;
