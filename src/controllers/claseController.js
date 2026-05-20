const Clase = require('../models/Clase');

const getClases = async (req, res) => {
    try {
        const clases = await Clase.find().populate('socios', 'nombre apellido');
        res.status(200).json(clases);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener clases', error: error.message });
    }
};

const getClaseById = async (req, res) => {
    try {
        const clase = await Clase.findById(req.params.id).populate('socios', 'nombre apellido');
        if (!clase) return res.status(404).json({ mensaje: 'Clase no encontrada' });
        res.status(200).json(clase);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener clase', error: error.message });
    }
};

const createClase = async (req, res) => {
    try {
        const clase = new Clase(req.body);
        await clase.save();
        res.status(201).json(clase);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear clase', error: error.message });
    }
};

const updateClase = async (req, res) => {
    try {
        const clase = await Clase.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!clase) return res.status(404).json({ mensaje: 'Clase no encontrada' });
        res.status(200).json(clase);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar clase', error: error.message });
    }
};

const deleteClase = async (req, res) => {
    try {
        const clase = await Clase.findByIdAndDelete(req.params.id);
        if (!clase) return res.status(404).json({ mensaje: 'Clase no encontrada' });
        res.status(200).json({ mensaje: 'Clase eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar clase', error: error.message });
    }
};

module.exports = { getClases, getClaseById, createClase, updateClase, deleteClase };
