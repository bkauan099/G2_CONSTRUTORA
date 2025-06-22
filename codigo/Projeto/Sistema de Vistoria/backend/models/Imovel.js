// Imovel.js
const express = require('express');
const router = express.Router();
const db = require('../db');  // Importando o cliente do db.js

// GET /api/imoveis/por-empreendimento/:idEmpreendimento
router.get('/por-empreendimento/:idempreendimento', async (req, res) => {
  const { idempreendimento } = req.params;

  try {
    const { data, error } = await db
      .from('imovel')  // Tabela 'imovel' com nome em minúsculo
      .select('idimovel, bloco, numero, empreendimento(nome, descricao)') // Ajustado para minúsculo
      .eq('idempreendimento', idempreendimento);

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

// POST /api/imoveis - Adiciona novo imóvel ao empreendimento
router.post('/', async (req, res) => {
  const { descricao, status, vistoriasrealizadas, observacao, bloco, numero, idempreendimento } = req.body;

  if (!descricao || !status || !vistoriasrealizadas || !bloco || !numero || !idempreendimento) {
    return res.status(400).json({ error: 'Campos obrigatórios ausentes.' });
  }

  try {
    const { data, error } = await db
      .from('imovel')  // Tabela 'imovel' com nome em minúsculo
      .insert([{ descricao, status, vistoriasrealizadas, observacao, bloco, numero, idempreendimento }])
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

// DELETE /api/imoveis/:idimovel
router.delete('/:idimovel', async (req, res) => {
  const { idimovel } = req.params; // Obtém o ID do imóvel da URL

  try {
    const { data, error } = await db
      .from('imovel')  // A tabela imovel
      .delete()
      .eq('idimovel', idimovel);  // Confirma a exclusão do imóvel com o ID

    if (error) {
      console.error('Erro ao excluir imóvel:', error);
      return res.status(500).json({ error: 'Erro ao excluir imóvel.' });
    }

    if (data.length === 0) {  // Verifica se o imóvel foi encontrado
      return res.status(404).json({ error: 'ID do imóvel não encontrado' });
    }

    res.status(200).json({ message: 'Imóvel excluído com sucesso.' });
  } catch (err) {
    console.error('Erro inesperado ao excluir imóvel:', err);
    res.status(500).json({ error: 'Erro inesperado ao excluir imóvel.' });
  }
});

module.exports = router;
