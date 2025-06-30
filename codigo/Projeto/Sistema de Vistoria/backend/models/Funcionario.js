const express = require('express');
const router = express.Router();
const db = require('../db');

// GET: Lista todos os funcionários
router.get('/', async (req, res) => {
  try {
    const funcionarios = await db`SELECT * FROM funcionario`;
    res.json(funcionarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Cadastra um novo funcionário
router.post('/', async (req, res) => {
  const { cpf, email, nome, senha, telefone } = req.body;
  try {
    const [funcionario] = await db`
      INSERT INTO funcionario (cpf, email, nome, senha, telefone)
      VALUES (${cpf}, ${email}, ${nome}, ${senha}, ${telefone})
      RETURNING *`;
    res.status(201).json(funcionario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT: Atualiza um cliente pelo ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { cpf, email, nome, senha, telefone } = req.body;

  try {
    const [cliente] = await db`
      UPDATE cliente
      SET cpf = ${cpf}, email = ${email}, nome = ${nome}, senha = ${senha}, telefone = ${telefone}
      WHERE id = ${id}
      RETURNING *`;

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    res.json(cliente);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: Remove um funcionário pelo ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db`
      DELETE FROM funcionario
      WHERE id = ${id}
      RETURNING *`;

    if (result.length === 0) {
      return res.status(404).json({ error: 'Funcionário não encontrado' });
    }

    res.json({ message: 'Funcionário deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
