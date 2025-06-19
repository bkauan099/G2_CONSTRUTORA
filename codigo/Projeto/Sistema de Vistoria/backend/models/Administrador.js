const express = require('express');
const router = express.Router();
const db = require('../Db');

// Aqui eu fiz um GET para criar o administrador em especidico, mas isso é so exemplo pra ter uma noção, pode mudar
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM Administrador');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mesma coisa com o POST
router.post('/', async (req, res) => {
  const { cpf, email, nome, senha, telefone } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO Administrador (cpf, email, nome, senha, telefone) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [cpf, email, nome, senha, telefone]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
