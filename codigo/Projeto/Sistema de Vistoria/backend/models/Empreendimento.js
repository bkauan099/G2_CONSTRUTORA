const express = require('express');
const router = express.Router();
const db = require('../db');

// POST: Criar novo empreendimento
router.post('/', async (req, res) => {
  const {
    nome,
    descricao,
    construtora,
    dataentrega,
    observacoes,
    estado,
    cidade,
    cep,
    rua
  } = req.body;

  try {
    const [empreendimento] = await db`
      INSERT INTO empreendimento
        (nome, descricao, construtora, dataentrega, observacoes, estado, cidade, cep, rua)
      VALUES
        (${nome}, ${descricao}, ${construtora}, ${dataentrega}, ${observacoes}, ${estado}, ${cidade}, ${cep}, ${rua})
      RETURNING *`;
    res.status(201).json(empreendimento);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Listar empreendimentos
router.get('/', async (req, res) => {
  try {
    const empreendimentos = await db`SELECT * FROM empreendimento`;
    res.status(200).json(empreendimentos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: Excluir por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db`DELETE FROM empreendimento WHERE idempreendimento = ${id}`;
    res.status(200).json({ message: 'Empreendimento excluído com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET: Buscar um empreendimento por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [empreendimento] = await db`
      SELECT * FROM empreendimento WHERE idempreendimento = ${Number(id)}
    `;

    if (!empreendimento) {
      return res.status(404).json({ error: 'Empreendimento não encontrado.' });
    }

    res.status(200).json(empreendimento);
  } catch (error) {
    console.error('Erro ao buscar empreendimento por ID:', error);
    res.status(500).json({ error: 'Erro ao buscar empreendimento.' });
  }
});

module.exports = router;




/* IGNORAR TUDO ABAIXO, ARQUIVOS ANTIGOS

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
*/