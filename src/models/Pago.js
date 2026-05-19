const mongoose = require('mongoose');

const pagoSchema = new mongoose.Schema({
    socio: { type: mongoose.Schema.Types.ObjectId, ref: 'Socio', required: true },
    membresia: { type: mongoose.Schema.Types.ObjectId, ref: 'Membresia', required: true },
    monto: { type: Number, required: true },
    fechaPago: { type: Date, default: Date.now },
    metodoPago: { type: String, enum: ['efectivo', 'tarjeta', 'transferencia'], required: true },
    observaciones: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Pago', pagoSchema);
