const mongoose = require('mongoose');

const turnoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fecha: { type: String, required: true },
  hora: { type: String, required: true },
  cancha: { type: Number, required: true },
}, { timestamps: true });

const Turno = mongoose.model('Turno', turnoSchema);

module.exports = Turno;
