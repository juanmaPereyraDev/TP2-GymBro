const Pago = require('../models/Pago');

const getPagos = async (req, res) => {
    try {
        const pagos = await Pago.find().populate('socio', 'nombre apellido').populate('membresia', 'nombre precio');
        res.status(200).json(pagos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener pagos', error: error.message });
    }
};

const getPagoById = async (req, res) => {
    try {
        const pago = await Pago.findById(req.params.id).populate('socio', 'nombre apellido').populate('membresia', 'nombre precio');
        if (!pago) return res.status(404).json({ mensaje: 'Pago no encontrado' });
        res.status(200).json(pago);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener pago', error: error.message });
    }
};

const createPago = async (req, res) => {
    try {
        const pago = new Pago(req.body);
        await pago.save();
        res.status(201).json(pago);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear pago', error: error.message });
    }
};

const updatePago = async (req, res) => {
    try {
        const pago = await Pago.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pago) return res.status(404).json({ mensaje: 'Pago no encontrado' });
        res.status(200).json(pago);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar pago', error: error.message });
    }
};

const deletePago = async (req, res) => {
    try {
        const pago = await Pago.findByIdAndDelete(req.params.id);
        if (!pago) return res.status(404).json({ mensaje: 'Pago no encontrado' });
        res.status(200).json({ mensaje: 'Pago eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar pago', error: error.message });
    }
};

module.exports = { getPagos, getPagoById, createPago, updatePago, deletePago };
