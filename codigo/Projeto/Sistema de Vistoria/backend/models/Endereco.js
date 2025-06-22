const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// GET: lista todos os endereços (imóveis) de um empreendimento
router.get('/por-empreendimento/:idEmpreendimento', async (req, res) => {
  const { idEmpreendimento } = req.params;

  try {
    const { data, error } = await supabase
      .from('endereco')
      .select('idEndereco, condominio, bloco, numero, empreendimento (nome, descricao)')
      .eq('idEmpreendimento', idEmpreendimento);

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

module.exports = router;
