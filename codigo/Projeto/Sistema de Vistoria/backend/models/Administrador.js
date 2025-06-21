const express = require('express');
const router = express.Router();
const db = require('../db'); // usando postgres

// GET: Lista todos os administradores
router.get('/', async (req, res) => {
  try {
    const administradores = await db`SELECT * FROM Administrador`;
    res.json(administradores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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

module.exports = router;
