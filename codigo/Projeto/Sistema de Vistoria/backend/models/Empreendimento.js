const express = require('express');
const router = express.Router();
const db = require('../db');

/* ========== CRUD BÁSICO ========== */

// POST: Criar novo empreendimento
router.post('/', async (req, res) => {
  const {
    nome,
    descricao,
    construtora,
    observacoes,
    estado,
    cidade,
    cep,
    rua,
    dataentrega,
  } = req.body;

  try {
    const [empreendimento] = await db`
      INSERT INTO empreendimento
        (nome, descricao, construtora, observacoes, estado, cidade, cep, rua, dataentrega)
      VALUES
        (${nome}, ${descricao}, ${construtora}, ${observacoes}, ${estado}, ${cidade}, ${cep}, ${rua}, ${dataentrega || null})
      RETURNING *
    `;
    res.status(201).json(empreendimento);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar empreendimento.', detalhes: err.message });
  }
});

// GET: Listar todos os empreendimentos
router.get('/', async (req, res) => {
  try {
    const empreendimentos = await db`
      SELECT * FROM empreendimento ORDER BY idempreendimento DESC
    `;
    res.status(200).json(empreendimentos);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar empreendimentos.', detalhes: err.message });
  }
});

// GET: Buscar um empreendimento por ID
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

  try {
    const [empreendimento] = await db`
      SELECT * FROM empreendimento WHERE idempreendimento = ${id}
    `;
    if (!empreendimento) {
      return res.status(404).json({ error: 'Empreendimento não encontrado.' });
    }

    res.status(200).json(empreendimento);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar empreendimento.', detalhes: error.message });
  }
});

// GET: Imóveis de um empreendimento específico
router.get('/:id/imoveis', async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

  try {
    const imoveis = await db`
      SELECT * FROM imovel WHERE idempreendimento = ${id}
    `;
    res.status(200).json(imoveis);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar imóveis do empreendimento.', detalhes: error.message });
  }
});

// PUT: Atualizar empreendimento
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const {
    nome,
    descricao,
    construtora,
    observacoes,
    estado,
    cidade,
    cep,
    rua,
    dataentrega
  } = req.body;

  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

  try {
    const [empreendimentoExistente] = await db`
      SELECT * FROM empreendimento WHERE idempreendimento = ${id}
    `;
    if (!empreendimentoExistente) {
      return res.status(404).json({ error: 'Empreendimento não encontrado.' });
    }

    await db`
      UPDATE empreendimento SET
        nome = ${nome ?? empreendimentoExistente.nome},
        descricao = ${descricao ?? empreendimentoExistente.descricao},
        construtora = ${construtora ?? empreendimentoExistente.construtora},
        observacoes = ${observacoes ?? empreendimentoExistente.observacoes},
        estado = ${estado ?? empreendimentoExistente.estado},
        cidade = ${cidade ?? empreendimentoExistente.cidade},
        cep = ${cep ?? empreendimentoExistente.cep},
        rua = ${rua ?? empreendimentoExistente.rua},
        dataentrega = ${dataentrega ?? empreendimentoExistente.dataentrega}
      WHERE idempreendimento = ${id}
    `;

    res.status(200).json({ message: 'Empreendimento atualizado com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar empreendimento.', detalhes: err.message });
  }
});

// DELETE: Excluir empreendimento
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: 'ID inválido.' });

  try {
    const result = await db`
      DELETE FROM empreendimento WHERE idempreendimento = ${id}
    `;
    if (result.count === 0) {
      return res.status(404).json({ error: 'Empreendimento não encontrado para exclusão.' });
    }

    res.status(200).json({ message: 'Empreendimento excluído com sucesso.' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir empreendimento.', detalhes: err.message });
  }
});

module.exports = router;
