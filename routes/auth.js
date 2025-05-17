const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Ruta de registro
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    const newUser = new User({ name, email, password }); // ❌ No hasheamos acá

    await newUser.save(); // 🔒 Se hashea automáticamente en el middleware del modelo

    res.status(201).json({
      message: 'Usuario registrado correctamente',
      name: newUser.name,
      email: newUser.email,
      _id: newUser._id,
      token: 'mock-token'
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Ruta de login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  console.log('Datos recibidos en login:', req.body);

  try {
    const user = await User.findOne({ email });
    console.log('Usuario encontrado:', user);

    if (!user) {
      return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Contraseña incorrecta');
      return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
    }

    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      name: user.name,
      email: user.email,
      _id: user._id,
      token: 'mock-token'
    });

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;
