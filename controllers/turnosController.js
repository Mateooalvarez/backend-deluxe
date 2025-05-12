const Turno = require('../models/Turno');

const crearTurno = async (req, res) => {
  try {
    const { nombre, fecha, hora, cancha } = req.body;
    const nuevoTurno = new Turno({ nombre, fecha, hora, cancha });

    await nuevoTurno.save();
    res.status(201).json(nuevoTurno);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el turno' });
  }
};

const obtenerTurnosPorUsuario = async (req, res) => {
  try {
    const { nombre } = req.query;

    if (!nombre) {
      return res.status(400).json({ message: 'Falta el nombre del usuario' });
    }

    const turnos = await Turno.find({ nombre: new RegExp(`^${nombre}$`, 'i') }); // insensitive
    res.status(200).json(turnos);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los turnos' });
  }
};

const eliminarTurno = async (req, res) => {
  try {
    const { id } = req.params;
    const turno = await Turno.findById(id);
    if (!turno) {
      return res.status(404).json({ message: 'Turno no encontrado' });
    }
    await turno.remove();
    res.status(200).json({ message: 'Turno eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el turno' });
  }
};

module.exports = { crearTurno, obtenerTurnosPorUsuario, eliminarTurno };
