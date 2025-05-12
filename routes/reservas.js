const express = require('express');
const router = express.Router();

let reservas = []; // Esto es temporal, después podés usar una base de datos

// Crear una nueva reserva
router.post('/', (req, res) => {
  const { nombre, fecha, hora, cancha } = req.body;

  if (!nombre || !fecha || !hora || !cancha) {
    return res.status(400).json({ mensaje: 'Faltan datos para la reserva' });
  }

  // Validar si ya existe una reserva en esa fecha/hora/cancha
  const existe = reservas.find(
    (r) => r.fecha === fecha && r.hora === hora && r.cancha === cancha
  );

  if (existe) {
    return res.status(409).json({ mensaje: 'Ya hay una reserva en ese horario para esa cancha' });
  }

  const nuevaReserva = { nombre, fecha, hora, cancha };
  reservas.push(nuevaReserva);
  res.status(201).json({ mensaje: 'Reserva creada con éxito', reserva: nuevaReserva });
});

// Obtener todas las reservas
router.get('/', (req, res) => {
  res.json(reservas);
});

// Eliminar una reserva por ID (esto es temporal porque no usás una base de datos real)
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  reservas = reservas.filter((_, index) => index.toString() !== id);
  res.json({ mensaje: 'Reserva eliminada' });
});

module.exports = router;
