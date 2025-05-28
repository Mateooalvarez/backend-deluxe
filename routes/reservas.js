const express = require('express');
const router = express.Router();

let reservas = []; // Aún usamos array temporal

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

  const nuevaReserva = {
    id: Date.now().toString(),
    nombre,
    fecha,
    hora,
    cancha,
    estado: "Reservado",
  };

  reservas.push(nuevaReserva);
  res.status(201).json({ mensaje: 'Reserva creada con éxito', reserva: nuevaReserva });
});

// Obtener todas las reservas
router.get('/', (req, res) => {
  res.json(reservas);
});

// Eliminar una reserva por ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const cantidadAntes = reservas.length;
  reservas = reservas.filter((r) => r.id !== id);
  const cantidadDespues = reservas.length;

  if (cantidadAntes === cantidadDespues) {
    return res.status(404).json({ mensaje: 'Reserva no encontrada' });
  }

  res.json({ mensaje: 'Reserva eliminada' });
});

module.exports = router;
