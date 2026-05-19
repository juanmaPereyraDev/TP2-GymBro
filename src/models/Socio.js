const mongoose = require('mongoose');

const socioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    dni: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    telefono: { type: String },
    fechaNacimiento: { type: Date },
    activo: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Socio', socioSchema);
