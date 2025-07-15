const express = require('express');
const router = express.Router();
const Friend = require('../models/Friend');
const User = require('../models/User');

// Enviar solicitud de amistad
router.post('/request', async (req, res) => {
  const { requesterId, recipientId } = req.body;

  try {
    const existing = await Friend.findOne({
      $or: [
        { requester: requesterId, recipient: recipientId },
        { requester: recipientId, recipient: requesterId }
      ]
    });

    if (existing) return res.status(400).json({ message: 'Ya hay una solicitud o amistad existente' });

    const newRequest = new Friend({ requester: requesterId, recipient: recipientId });
    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error al enviar la solicitud' });
  }
});

// Aceptar/rechazar solicitud
router.post('/respond', async (req, res) => {
  const { requestId, action } = req.body;

  try {
    const request = await Friend.findById(requestId);
    if (!request) return res.status(404).json({ message: 'Solicitud no encontrada' });

    request.status = action;
    await request.save();
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: 'Error al responder la solicitud' });
  }
});

// Obtener amigos de un usuario
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const friends = await Friend.find({
      $or: [{ requester: userId }, { recipient: userId }],
      status: 'accepted'
    }).populate('requester recipient');

    const lista = friends.map(f => {
      const amigo = f.requester._id.toString() === userId ? f.recipient : f.requester;
      return {
        id: amigo._id,
        name: amigo.name,
        email: amigo.email
      };
    });

    res.status(200).json(lista);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener amigos' });
  }
});

// Obtener solicitudes pendientes
router.get('/pendientes/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const pendientes = await Friend.find({
      recipient: userId,
      status: 'pending'
    }).populate('requester');
    res.json(pendientes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener solicitudes' });
  }
});

module.exports = router;
