const Socio = require('../models/Socio');

const getSocios = async (req, res) => {
    try {
        const socios = await Socio.find();
        res.status(200).json(socios);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener socios', error: error.message });
    }
};

const getSocioById = async (req, res) => {
    try {
        const socio = await Socio.findById(req.params.id);
        if (!socio) return res.status(404).json({ mensaje: 'Socio no encontrado' });
        res.status(200).json(socio);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener socio', error: error.message });
    }
};

const createSocio = async (req, res) => {
    try {
        const socio = new Socio(req.body);
        await socio.save();
        res.status(201).json(socio);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear socio', error: error.message });
    }
};

const updateSocio = async (req, res) => {
    try {
        const socio = await Socio.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!socio) return res.status(404).json({ mensaje: 'Socio no encontrado' });
        res.status(200).json(socio);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar socio', error: error.message });
    }
};

const deleteSocio = async (req, res) => {
    try {
        const socio = await Socio.findByIdAndDelete(req.params.id);
        if (!socio) return res.status(404).json({ mensaje: 'Socio no encontrado' });
        res.status(200).json({ mensaje: 'Socio eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar socio', error: error.message });
    }
};

module.exports = { getSocios, getSocioById, createSocio, updateSocio, deleteSocio };
