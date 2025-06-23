const express = require('express');
const router = express.Router();
const db = require('../db');

// GET: Listar todas as vistorias
router.get('/', async (req, res) => {
  try {
    const vistorias = await db`
      SELECT * FROM vistoria
    `;
    res.status(200).json(vistorias);
  } catch (err) {
    console.error('Erro ao listar vistorias:', err);
    res.status(500).json({ error: 'Erro ao listar vistorias.' });
  }
});

// ✅ GET: Buscar uma vistoria por ID (com validação de número e join com imóvel)
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const idParsed = Number(id);

  if (isNaN(idParsed)) {
    return res.status(400).json({ error: 'ID inválido.' });
  }

  try {
    const [vistoria] = await db`
      SELECT v.*, i.observacoes, i.status
      FROM vistoria v
      JOIN imovel i ON v.idimovel = i.idimovel
      WHERE v.idvistoria = ${idParsed}
    `;

    if (!vistoria) {
      return res.status(404).json({ error: 'Vistoria não encontrada.' });
    }

    res.status(200).json(vistoria);
  } catch (err) {
    console.error('Erro ao buscar vistoria:', err);
    res.status(500).json({ error: 'Erro ao buscar vistoria.' });
  }
});

// POST: Criar uma nova vistoria e atualizar o imóvel
router.post('/', async (req, res) => {
  const { idimovel, idcliente, idvistoriador, observacoes, datainicio } = req.body;

  if (!idimovel || !idcliente || !idvistoriador || !datainicio) {
    return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
  }

  try {
    const [novaVistoria] = await db`
      INSERT INTO vistoria (idimovel, idcliente, idvistoriador, datainicio)
      VALUES (${Number(idimovel)}, ${Number(idcliente)}, ${Number(idvistoriador)}, ${datainicio})
      RETURNING *
    `;

    await db`
      UPDATE imovel
      SET status = 'Vistoria Criada', observacoes = ${observacoes}
      WHERE idimovel = ${Number(idimovel)}
    `;

    res.status(201).json(novaVistoria);
  } catch (err) {
    console.error('Erro ao agendar vistoria:', err);
    res.status(500).json({ error: 'Erro ao agendar vistoria.' });
  }
});

// DELETE: Excluir uma vistoria
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const idParsed = Number(id);

  if (isNaN(idParsed)) {
    return res.status(400).json({ error: 'ID inválido.' });
  }

  try {
    await db`
      DELETE FROM vistoria WHERE idvistoria = ${idParsed}
    `;
    res.status(200).json({ message: 'Vistoria excluída com sucesso.' });
  } catch (err) {
    console.error('Erro ao excluir vistoria:', err);
    res.status(500).json({ error: 'Erro ao excluir vistoria.' });
  }
});

module.exports = router;
