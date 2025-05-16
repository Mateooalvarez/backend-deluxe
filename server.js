const express = require('express');
const router = express.Router();
const User = require('./models/User'); // Ajustá el path si es diferente

// Ruta de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Datos recibidos en login:', req.body);

  try {
    const user = await User.findOne({ email });
    console.log('Usuario encontrado:', user);

    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
    }

    // 🔐 Simulamos un token, ya que no estás usando JWT aún
    const fakeToken = '123abc456fake';

    // Respondemos con lo que espera el frontend
    res.status(200).json({
      name: user.name,
      email: user.email,
      _id: user._id,
      token: fakeToken
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;
