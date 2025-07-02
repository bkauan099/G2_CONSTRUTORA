const express = require('express');
const router = express.Router();
const db = require('../db');

// GET: Lista todos os funcionários com o cargo (Vistoriador / Administrador / Desconhecido)
router.get('/', async (req, res) => {
  try {
    const funcionarios = await db`
      SELECT 
        f.*, 
        CASE 
          WHEN v.idvistoriador IS NOT NULL THEN 'Vistoriador'
          WHEN a.idadministrador IS NOT NULL THEN 'Administrador'
          ELSE 'Desconhecido'
        END AS cargo
      FROM funcionario f
      LEFT JOIN vistoriador v ON f.id = v.idvistoriador
      LEFT JOIN administrador a ON f.id = a.idadministrador
      ORDER BY f.id DESC
    `;

    res.status(200).json(funcionarios);
  } catch (err) {
    console.error('Erro ao buscar funcionários:', err);
    res.status(500).json({ error: 'Erro ao buscar funcionários.', detalhes: err.message });
  }
});

// POST: Cadastra um novo funcionário
router.post('/', async (req, res) => {
  const { cpf, email, nome, senha, telefone, cargo } = req.body;

  if (!cpf || !email || !nome || !senha || !cargo) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  try {
    // 1. Cadastra o funcionário principal
    const [funcionario] = await db`
      INSERT INTO funcionario (cpf, email, nome, senha, telefone)
      VALUES (${cpf}, ${email}, ${nome}, ${senha}, ${telefone})
      RETURNING *
    `;

    // 2. Insere na tabela de cargo apropriada
    if (cargo === 'Administrador') {
      await db`INSERT INTO administrador (idadministrador) VALUES (${funcionario.id})`;
    } else if (cargo === 'Vistoriador') {
      await db`INSERT INTO vistoriador (idvistoriador) VALUES (${funcionario.id})`;
    }

    res.status(201).json({ ...funcionario, cargo });
  } catch (err) {
    console.error('Erro ao cadastrar funcionário:', err);
    res.status(500).json({ error: 'Erro ao cadastrar funcionário.', detalhes: err.message });
  }
});


// PUT: Atualiza um funcionário pelo ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { cpf, email, nome, senha, telefone } = req.body;

  try {
    const [funcionario] = await db`
      UPDATE funcionario
      SET cpf = ${cpf}, email = ${email}, nome = ${nome}, senha = ${senha}, telefone = ${telefone}
      WHERE id = ${id}
      RETURNING *
    `;

    if (!funcionario) {
      return res.status(404).json({ error: 'Funcionário não encontrado.' });
    }

    res.json(funcionario);
  } catch (err) {
    console.error('Erro ao atualizar funcionário:', err);
    res.status(500).json({ error: 'Erro ao atualizar funcionário.', detalhes: err.message });
  }
});

// DELETE: Remove um funcionário pelo ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { confirmacao } = req.body;

  if (confirmacao?.trim().toUpperCase() !== 'SIM') {
    return res.status(400).json({ error: 'Confirmação incorreta. Digite "SIM" para confirmar a exclusão.' });
  }

  try {
    const result = await db`
      DELETE FROM funcionario
      WHERE id = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      return res.status(404).json({ error: 'Funcionário não encontrado.' });
    }

    res.json({ message: 'Funcionário deletado com sucesso.' });
  } catch (err) {
    console.error('Erro ao excluir funcionário:', err);
    res.status(500).json({ error: 'Erro ao excluir funcionário.', detalhes: err.message });
  }
});

// GET: Buscar funcionário por ID (usado para edição)
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido.' });
  }

  try {
    const [funcionario] = await db`
      SELECT 
        f.*, 
        CASE 
          WHEN v.idvistoriador IS NOT NULL THEN 'Vistoriador'
          WHEN a.idadministrador IS NOT NULL THEN 'Administrador'
          ELSE 'Desconhecido'
        END AS cargo
      FROM funcionario f
      LEFT JOIN vistoriador v ON f.id = v.idvistoriador
      LEFT JOIN administrador a ON f.id = a.idadministrador
      WHERE f.id = ${id}
    `;

    if (!funcionario) {
      return res.status(404).json({ error: 'Funcionário não encontrado.' });
    }

    res.status(200).json(funcionario);
  } catch (err) {
    console.error('Erro ao buscar funcionário por ID:', err);
    res.status(500).json({ error: 'Erro ao buscar funcionário.', detalhes: err.message });
  }
});

module.exports = router;
