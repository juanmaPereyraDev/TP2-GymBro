const express = require('express');
const router = express.Router();
const { registrar, login, getUsuarios, updateUsuario, deleteUsuario } = require('../controllers/usuarioController');
const { verificarToken } = require('../middleware/authMiddleware');

router.post('/registro', registrar);
router.post('/login', login);
router.get('/', verificarToken, getUsuarios);
router.put('/:id', verificarToken, updateUsuario);
router.delete('/:id', verificarToken, deleteUsuario);

module.exports = router;
