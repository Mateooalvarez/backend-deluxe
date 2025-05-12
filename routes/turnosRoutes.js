const express = require('express');
const { crearTurno, obtenerTurnosPorUsuario, eliminarTurno } = require('../controllers/turnosController');
const router = express.Router();

router.post('/turnos', crearTurno);
router.get('/turnos', obtenerTurnosPorUsuario); // Usa ?nombre=usuario
router.delete('/turnos/:id', eliminarTurno);

module.exports = router;
