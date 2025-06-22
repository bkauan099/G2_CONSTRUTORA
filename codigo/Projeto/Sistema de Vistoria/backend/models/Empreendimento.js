// Empreendimento.js
const express = require('express');
const router = express.Router();
const db = require('../db');  // Importando o cliente do db.js

// POST: Cria um novo empreendimento
router.post('/', async (req, res) => {
  const {
    nome = '',
    descricao = '',
    construtora = '',
    dataentrega = null,
    observacoes = '',
    estado = '',
    cidade = '',
    cep = '',
    rua = ''
  } = req.body;

  try {
    const { data: empreendimentoData, error: empreendimentoError } = await db
      .from('empreendimento')
      .insert([{
        nome,
        descricao,
        construtora,
        dataentrega,
        observacoes,
        estado,
        cidade,
        cep,
        rua
      }])
      .single();

    if (empreendimentoError) {
      console.error('Erro ao inserir empreendimento:', empreendimentoError);
      return res.status(500).json({ error: 'Erro ao inserir empreendimento.' });
    }

    res.status(201).json(empreendimentoData);
  } catch (err) {
    console.error('Erro inesperado ao criar empreendimento:', err);
    res.status(500).json({ error: 'Erro inesperado ao criar empreendimento.' });
  }
});

// GET: Lista todos os empreendimentos
router.get('/', async (req, res) => {
  try {
    const { data, error } = await db
      .from('empreendimento')
      .select('*');

    if (error) {
      console.error('Erro ao buscar empreendimentos:', error);
      return res.status(500).json({ error: 'Erro ao buscar empreendimentos.' });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('Erro inesperado ao listar empreendimentos:', err);
    res.status(500).json({ error: 'Erro inesperado.' });
  }
});

// DELETE: Exclui um empreendimento por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await db
      .from('empreendimento')
      .delete()
      .eq('idempreendimento', id);

    if (error) {
      console.error('Erro ao excluir empreendimento:', error);
      return res.status(500).json({ error: 'Erro ao excluir empreendimento.' });
    }

    res.status(200).json({ message: 'Empreendimento excluído com sucesso.' });
  } catch (err) {
    console.error('Erro inesperado ao excluir empreendimento:', err);
    res.status(500).json({ error: 'Erro inesperado ao excluir empreendimento.' });
  }
});

module.exports = router;
