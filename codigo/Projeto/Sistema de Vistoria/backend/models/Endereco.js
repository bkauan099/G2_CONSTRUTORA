// Endereco.js
const express = require('express');
const router = express.Router();
const db = require('../db');  // Importando o cliente do db.js

// GET /api/imoveis/por-empreendimento/:idEmpreendimento
router.get('/por-empreendimento/:idEmpreendimento', async (req, res) => {
  const { idEmpreendimento } = req.params;

  try {
    const { data, error } = await db
      .from('endereco')
      .select('idendereco, bloco, numero, empreendimento(nome, descricao)')
      .eq('idempreendimento', idEmpreendimento);

    if (error) {
      console.error('Erro ao buscar imóveis:', error);
      return res.status(500).json({ error: 'Erro ao buscar imóveis.' });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error('Erro inesperado ao buscar imóveis:', err);
    res.status(500).json({ error: 'Erro inesperado.' });
  }
});

// POST /api/imoveis - Adiciona novo imóvel (endereço) ao empreendimento
router.post('/', async (req, res) => {
  const { bloco, numero, idempreendimento } = req.body;

  if (!bloco || !numero || !idempreendimento) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  try {
    const { data, error } = await db
      .from('endereco')
      .insert([{ bloco, numero, idempreendimento }])
      .single();

    if (error) {
      console.error('Erro ao criar imóvel:', error);
      return res.status(500).json({ error: 'Erro ao criar imóvel.' });
    }

    res.status(201).json(data);
  } catch (err) {
    console.error('Erro inesperado ao criar imóvel:', err);
    res.status(500).json({ error: 'Erro inesperado.' });
  }
});

// DELETE /api/imoveis/:idEndereco
router.delete('/:idEndereco', async (req, res) => {
  const { idEndereco } = req.params;

  try {
    const { error } = await db
      .from('endereco')
      .delete()
      .eq('idendereco', idEndereco); // Excluir o imóvel com o idEndereco correspondente

    if (error) {
      console.error('Erro ao excluir imóvel:', error);
      return res.status(500).json({ error: 'Erro ao excluir imóvel.' });
    }

    res.status(200).json({ message: 'Imóvel excluído com sucesso.' });
  } catch (err) {
    console.error('Erro inesperado ao excluir imóvel:', err);
    res.status(500).json({ error: 'Erro inesperado ao excluir imóvel.' });
  }
});

module.exports = router;
