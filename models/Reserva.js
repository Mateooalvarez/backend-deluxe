const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fecha: { type: String, required: true },
  hora: { type: String, required: true },
  cancha: { type: String, required: true },
  estado: { type: String, default: 'Reservado' }
});

module.exports = mongoose.model('Reserva', reservaSchema);
