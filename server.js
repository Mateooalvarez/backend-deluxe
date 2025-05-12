const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors()); // Permite solicitudes desde el frontend
app.use(express.json()); // Permite manejar datos JSON

let reservas = [
  { _id: 1, nombre: "Juan", fecha: "10/06/2025", hora: "10:00", cancha: 1 },
  { _id: 2, nombre: "Maria", fecha: "10/06/2025", hora: "12:00", cancha: 2 }
];

// Ruta para obtener todas las reservas
app.get('/api/reservas', (req, res) => {
  res.json(reservas);
});

// Ruta para crear una nueva reserva
app.post('/api/reservas', (req, res) => {
  const { nombre, fecha, hora, cancha } = req.body;
  const nuevaReserva = {
    _id: reservas.length + 1,
    nombre,
    fecha,
    hora,
    cancha
  };
  reservas.push(nuevaReserva);
  res.status(201).json(nuevaReserva);
});

// Ruta para cancelar una reserva
app.delete('/api/reservas/:id', (req, res) => {
  const { id } = req.params;
  reservas = reservas.filter(reserva => reserva._id !== parseInt(id));
  res.status(200).json({ message: 'Reserva cancelada con éxito' });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
