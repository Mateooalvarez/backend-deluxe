const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // 👈 Importante para leer el .env

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// CORS para permitir solicitudes desde tu frontend en producción
app.use(cors({
  origin: ['http://localhost:3000', 'https://deluxe-padel.netlify.app'],
  methods: ['GET', 'POST'],
  credentials: true
}));

// Rutas
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

// Conexión a MongoDB Atlas usando variable de entorno
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch((err) => console.error('❌ Error al conectar a MongoDB:', err));
