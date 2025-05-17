const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware para que Express pueda parsear JSON
app.use(express.json());

// CORS para permitir solicitudes desde el frontend
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));

// Rutas
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/padel')
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(5000, () => {
      console.log('Servidor corriendo en http://localhost:5000');
    });
  })
  .catch((err) => console.error('Error al conectar a MongoDB:', err));
