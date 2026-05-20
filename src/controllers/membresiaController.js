const Membresia = require('../models/Membresia');

const getMembresias = async (req, res) => {
    try {
        const membresias = await Membresia.find();
        res.status(200).json(membresias);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener membresías', error: error.message });
    }
};

const getMembresiaById = async (req, res) => {
    try {
        const membresia = await Membresia.findById(req.params.id);
        if (!membresia) return res.status(404).json({ mensaje: 'Membresía no encontrada' });
        res.status(200).json(membresia);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener membresía', error: error.message });
    }
};

const createMembresia = async (req, res) => {
    try {
        const membresia = new Membresia(req.body);
        await membresia.save();
        res.status(201).json(membresia);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear membresía', error: error.message });
    }
};

const updateMembresia = async (req, res) => {
    try {
        const membresia = await Membresia.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!membresia) return res.status(404).json({ mensaje: 'Membresía no encontrada' });
        res.status(200).json(membresia);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar membresía', error: error.message });
    }
};

const deleteMembresia = async (req, res) => {
    try {
        const membresia = await Membresia.findByIdAndDelete(req.params.id);
        if (!membresia) return res.status(404).json({ mensaje: 'Membresía no encontrada' });
        res.status(200).json({ mensaje: 'Membresía eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar membresía', error: error.message });
    }
};

module.exports = { getMembresias, getMembresiaById, createMembresia, updateMembresia, deleteMembresia };
