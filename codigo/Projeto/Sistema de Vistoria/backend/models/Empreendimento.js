const express = require('express');
const router = express.Router();
const db = require('../db');

// POST: Cria um novo Empreendimento (com endereço)
router.post('/', async (req, res) => {
  const {
    nome = '',
    descricao = '',
    construtora = '',
    dataEntrega = null,
    observacoes = '',
    cidade = '',
    estado = '',
    cep = '',
    rua = ''
  } = req.body;

  try {
    // 1. Insere o endereço (mesmo que vazio)
    const [endereco] = await db`
      INSERT INTO Endereco (cidade, estado, cep, rua)
      VALUES (${cidade}, ${estado}, ${cep}, ${rua})
      RETURNING idEndereco
    `;

    const idEndereco = endereco.idendereco || endereco.idEndereco;

    // 2. Insere o empreendimento
    const [empreendimento] = await db`
      INSERT INTO Empreendimento (
        idEndereco, nome, descricao, construtora, dataEntrega, observacoes
      )
      VALUES (
        ${idEndereco}, ${nome}, ${descricao}, ${construtora}, ${dataEntrega}, ${observacoes}
      )
      RETURNING *
    `;

    res.status(201).json(empreendimento);
  } catch (err) {
    console.error('Erro ao criar empreendimento:', err);
    res.status(500).json({ error: 'Erro ao criar empreendimento.' });
  }
});

module.exports = router;
