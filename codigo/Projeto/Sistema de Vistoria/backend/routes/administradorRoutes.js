const express = require('express');
const router = express.Router();
const Administrador = require('../models/Administrador2');

// Rota para criar administrador
router.post('/', async (req, res) => {
  try {
    const administrador = new Administrador(req.body);
    const resultado = await administrador.salvar();
    res.status(201).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Rota para buscar administrador por ID
router.get('/:id', async (req, res) => {
  try {
    const administrador = await Administrador.buscarPorId(req.params.id);
    res.json(administrador);
  } catch (error) {
    res.status(404).json({ error: 'Administrador não encontrado' });
  }
});

router.get('/hello', (req, res) => {
  res.send('Hello from Administrador!');
});


module.exports = router;