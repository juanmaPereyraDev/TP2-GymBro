const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registrar = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;

        const existente = await Usuario.findOne({ email });
        if (existente) return res.status(400).json({ mensaje: 'El email ya está registrado.' });

        const passwordHash = await bcrypt.hash(password, 10);
        const usuario = new Usuario({ nombre, email, password: passwordHash, rol });
        await usuario.save();

        res.status(201).json({ mensaje: 'Usuario registrado correctamente.', usuario: { id: usuario._id, nombre, email, rol } });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al registrar usuario', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const usuario = await Usuario.findOne({ email });
        if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado.' });

        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) return res.status(401).json({ mensaje: 'Contraseña incorrecta.' });

        const token = jwt.sign(
            { id: usuario._id, nombre: usuario.nombre, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ mensaje: 'Login exitoso.', token, usuario: { id: usuario._id, nombre: usuario.nombre, rol: usuario.rol } });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
    }
};

const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find().select('-password');
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener usuarios', error: error.message });
    }
};

const updateUsuario = async (req, res) => {
    try {
        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
        if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        res.status(200).json(usuario);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar usuario', error: error.message });
    }
};

const deleteUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
        res.status(200).json({ mensaje: 'Usuario eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar usuario', error: error.message });
    }
};

module.exports = { registrar, login, getUsuarios, updateUsuario, deleteUsuario };
