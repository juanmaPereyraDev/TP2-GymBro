const mongoose = require('mongoose');

const membresiaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    precio: { type: Number, required: true },
    duracionDias: { type: Number, required: true },
    activa: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Membresia', membresiaSchema);
