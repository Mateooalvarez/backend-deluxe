const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

// Configurar CORS para tu frontend (Netlify)
app.use(cors({
  origin: ['https://deluxe-padel.netlify.app'],
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true
}));

// Importar rutas
const authRoutes = require('./routes/auth');
app.use('/api', authRoutes);

const reservaRoutes = require('./routes/reservas');
app.use('/api/reservas', reservaRoutes);

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB Atlas');
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
    });
  })
  .catch((err) => console.error('❌ Error al conectar a MongoDB:', err));
