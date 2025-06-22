// Funcionario.js
const express = require('express');
const router = express.Router();
const db = require('../db');  // Importando o cliente do Supabase

// GET: Lista todos os funcionários
router.get('/', async (req, res) => {
  try {
    // Usando o cliente do supabase para buscar os dados da tabela 'Funcionario'
    const { data, error } = await db
      .from('funcionario') // Nome da tabela
      .select('*'); // Seleciona todos os campos

    if (error) {
      console.error('Erro ao buscar funcionários:', error);
      return res.status(500).json({ error: 'Erro ao buscar funcionários.' });
    }

    res.status(200).json(data); // Retorna os dados dos funcionários
  } catch (err) {
    console.error('Erro no servidor:', err);
    res.status(500).json({ error: 'Erro no servidor.' });
  }
});

// POST: Cadastra um novo funcionário
router.post('/', async (req, res) => {
  const { cpf, email, nome, senha, telefone } = req.body;

  try {
    const { data, error } = await db
      .from('funcionario') // Nome da tabela
      .insert([{ cpf, email, nome, senha, telefone }]) // Inserindo o novo funcionário
      .single(); // Retorna um único registro inserido

    if (error) {
      console.error('Erro ao cadastrar funcionário:', error);
      return res.status(500).json({ error: 'Erro ao cadastrar funcionário.' });
    }

    res.status(201).json(data); // Retorna o funcionário cadastrado
  } catch (err) {
    console.error('Erro no servidor:', err);
    res.status(500).json({ error: 'Erro no servidor.' });
  }
});

module.exports = router;
