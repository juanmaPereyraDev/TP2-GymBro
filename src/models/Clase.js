const mongoose = require('mongoose');

const claseSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    instructor: { type: String, required: true },
    horario: { type: String, required: true },
    capacidadMaxima: { type: Number, required: true },
    socios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Socio' }],
    activa: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Clase', claseSchema);
