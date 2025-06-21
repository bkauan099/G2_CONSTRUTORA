const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

// Cria o cliente Supabase — espera que as variáveis estejam no .env carregadas antes
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// POST: cria um novo empreendimento com endereço
router.post('/', async (req, res) => {
  const {
    nome = '',
    descricao = '',
    construtora = '',
    dataentrega = null,
    observacoes = '',
    cidade = '',
    estado = '',
    cep = '',
    rua = ''
  } = req.body;

  try {
    // 1. Insere o endereço (tabela e colunas em minúsculo)
    const { data: enderecoData, error: enderecoError } = await supabase
      .from('endereco')
      .insert([{ condominio: null, bloco: null, numero: null }]) // campos mínimos exigidos
      .select('idendereco')
      .single();

    if (enderecoError) {
      console.error('Erro ao inserir endereço:', enderecoError);
      return res.status(500).json({ error: 'Erro ao inserir endereço.' });
    }

    const idendereco = enderecoData.idendereco;

    // 2. Insere o empreendimento com o idEndereco obtido
    const { data: empreendimentoData, error: empreendimentoError } = await supabase
      .from('empreendimento')
      .insert([{
        idendereco,
        nome,
        descricao,
        construtora,
        dataentrega,
        observacoes,
        cidade,
        estado,
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

// GET: Lista todos os empreendimentos com o endereço
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('empreendimento')
      .select('*, endereco(*)');

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

module.exports = router;
