const express = require('express');
const router = express.Router();
const db = require('../db'); // usando postgres

// GET: Lista todos os administradores
router.get('/', async (req, res) => {
  // try {
  const { data, error } = await db.from('administrador').select('*');
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
  // } catch (err) {
  //   res.status(500).json({ error: err.message });
  // }
});

// router.get('/ad', async (req, res) => {
//   const { data, error } = await db.from('administrador').select('*');
//   if (error) return res.status(500).json({ error: error.message });
//   res.json(data);
// });

// POST: Cadastra um novo administrador
router.post('/', async (req, res) => {
  const { cpf, email, nome, senha, telefone } = req.body;
  try {
    const [administrador] = await db`
      INSERT INTO Administrador (cpf, email, nome, senha, telefone)
      VALUES (${cpf}, ${email}, ${nome}, ${senha}, ${telefone})
      RETURNING *`;

    res.status(201).json(administrador);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/hello', (req, res) => {
  res.send('Hello from Administrador!');
});

module.exports = router;
