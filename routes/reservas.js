const express = require('express');
const router = express.Router();
const Reserva = require('../models/Reserva');

// Crear reserva
router.post('/', async (req, res) => {
  const { nombre, fecha, hora, cancha } = req.body;

  if (!nombre || !fecha || !hora || !cancha) {
    return res.status(400).json({ mensaje: 'Faltan datos para la reserva' });
  }

  try {
    const existe = await Reserva.findOne({ fecha, hora, cancha });
    if (existe) {
      return res.status(409).json({ mensaje: 'Ya hay una reserva en ese horario para esa cancha' });
    }

    const nuevaReserva = new Reserva({ nombre, fecha, hora, cancha });
    await nuevaReserva.save();

    res.status(201).json({ mensaje: 'Reserva creada con éxito', reserva: nuevaReserva });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

// Obtener todas las reservas
router.get('/', async (req, res) => {
  try {
    const reservas = await Reserva.find();
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

// Obtener reservas de un usuario específico
router.get('/usuario/:nombre', async (req, res) => {
  try {
    const reservas = await Reserva.find({ nombre: req.params.nombre });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

// 🔔 Obtener reservas por fecha y cancha (para filtrar horas reservadas)
router.get('/disponibles', async (req, res) => {
  const { fecha, cancha } = req.query;

  if (!fecha || !cancha) {
    return res.status(400).json({ mensaje: 'Faltan parámetros de fecha o cancha' });
  }

  try {
    const reservas = await Reserva.find({ fecha, cancha: Number(cancha) });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener reservas del día' });
  }
});

// Eliminar reserva por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const resultado = await Reserva.findByIdAndDelete(id);
    if (!resultado) {
      return res.status(404).json({ mensaje: 'Reserva no encontrada' });
    }
    res.json({ mensaje: 'Reserva eliminada' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
});

module.exports = router;
