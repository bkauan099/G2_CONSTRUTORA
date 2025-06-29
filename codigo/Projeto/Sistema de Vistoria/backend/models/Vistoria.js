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

// GET: Buscar uma vistoria por ID (com JOIN no imóvel e no empreendimento, incluindo imagem)
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const idParsed = Number(id);

  if (isNaN(idParsed)) {
    return res.status(400).json({ error: 'ID inválido.' });
  }

  try {
    const [vistoria] = await db`
      SELECT 
        v.*,
        i.observacoes,
        v.status,
        i.descricao,
        i.bloco,
        i.numero,
        i.vistoriasrealizadas,
        e.anexos,
        e.nome AS nomeempreendimento,
        e.cidade,
        e.estado,
        e.cep,
        e.rua
      FROM vistoria v
      JOIN imovel i ON v.idimovel = i.idimovel
      JOIN empreendimento e ON i.idempreendimento = e.idempreendimento
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

// POST: Criar uma nova vistoria
router.post('/', async (req, res) => {
  const { idimovel, idcliente, idvistoriador, datainicio } = req.body;

  if (!idimovel || !idcliente || !idvistoriador || !datainicio) {
    return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
  }

  try {
    const dataInicioTimestamp = new Date(datainicio);

    if (isNaN(dataInicioTimestamp.getTime())) {
      return res.status(400).json({ error: 'Data de início inválida.' });
    }

    const [novaVistoria] = await db`
      INSERT INTO vistoria (idimovel, idcliente, idvistoriador, datainicio, status)
      VALUES (
        ${Number(idimovel)},
        ${Number(idcliente)},
        ${Number(idvistoriador)},
        ${dataInicioTimestamp},
        'Aguardando Agendamento da Vistoria'
      )
      RETURNING *
    `;

    res.status(201).json(novaVistoria);
  } catch (err) {
    console.error('Erro ao agendar vistoria:', err);
    res.status(500).json({ error: 'Erro ao agendar vistoria.' });
  }
});


// PUT: Agendar vistoria (cliente define data e hora)
router.put('/:idvistoria', async (req, res) => {
  const { idvistoria } = req.params;
  const { dataagendada, horaagendada } = req.body;

  const idParsed = Number(idvistoria);
  if (isNaN(idParsed)) {
    return res.status(400).json({ error: 'ID de vistoria inválido.' });
  }

  if (!dataagendada || !horaagendada) {
    return res.status(400).json({ error: 'Data e hora são obrigatórias.' });
  }

  try {
    // Exemplo: '2025-07-01T12:55:00-03:00'
    const isoDatetimeStr = `${dataagendada}T${horaagendada}:00-03:00`;
    const dataFinal = new Date(isoDatetimeStr);

    if (isNaN(dataFinal.getTime())) {
      return res.status(400).json({ error: 'Data e hora inválidas.' });
    }

    const [vistoriaAtualizada] = await db`
      UPDATE vistoria
      SET dataagendada = ${dataFinal.toISOString()}, status = 'Vistoria Agendada'
      WHERE idvistoria = ${idParsed} AND status = 'Aguardando Agendamento da Vistoria'
      RETURNING *
    `;

    if (!vistoriaAtualizada) {
      return res.status(404).json({ error: 'Vistoria não encontrada ou já agendada.' });
    }

    res.status(200).json({ message: 'Vistoria agendada com sucesso.' });
  } catch (error) {
    console.error('Erro ao agendar vistoria:', error);
    res.status(500).json({ error: 'Erro ao agendar vistoria.' });
  }
});



// PUT: Atualizar vistoria
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const idParsed = Number(id);
  const {
    dataagendada,
    datahorainicio,
    datahorafim,
    condicoesclimaticas,
    imprevistos,
    observacoesgerais,
    status,
    relatorio_url
  } = req.body;

  if (isNaN(idParsed)) {
    return res.status(400).json({ error: 'ID inválido.' });
  }

  try {
    const [vistoriaExistente] = await db`
      SELECT * FROM vistoria WHERE idvistoria = ${idParsed}
    `;

    if (!vistoriaExistente) {
      return res.status(404).json({ error: 'Vistoria não encontrada.' });
    }

    await db`
      UPDATE vistoria SET
        dataagendada = ${dataagendada ?? vistoriaExistente.dataagendada},
        datahorainicio = ${datahorainicio ?? vistoriaExistente.datahorainicio},
        datahorafim = ${datahorafim ?? vistoriaExistente.datahorafim},
        condicoesclimaticas = ${condicoesclimaticas ?? vistoriaExistente.condicoesclimaticas},
        imprevistos = ${imprevistos ?? vistoriaExistente.imprevistos},
        observacoesgerais = ${observacoesgerais ?? vistoriaExistente.observacoesgerais},
        status = ${status ?? vistoriaExistente.status},
        relatorio_url = ${relatorio_url ?? vistoriaExistente.relatorio_url}
      WHERE idvistoria = ${idParsed}
    `;

    res.status(200).json({ message: 'Vistoria atualizada com sucesso.' });
  } catch (err) {
    console.error('Erro ao atualizar vistoria:', err);
    res.status(500).json({ error: 'Erro ao atualizar vistoria.' });
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

// PUT: Iniciar a vistoria
router.put('/iniciar/:id', async (req, res) => {
  const { id } = req.params;
  const idParsed = Number(id);

  if (isNaN(idParsed)) {
    return res.status(400).json({ error: 'ID inválido.' });
  }

  const dataHoraInicio = new Date().toISOString();

  try {
    await db`
      UPDATE vistoria
      SET datahorainicio = ${dataHoraInicio}
      WHERE idvistoria = ${idParsed}
    `;

    const [vistoria] = await db`
      SELECT idimovel FROM vistoria WHERE idvistoria = ${idParsed}
    `;

    if (!vistoria) {
      return res.status(404).json({ error: 'Vistoria não encontrada.' });
    }

    await db`
      UPDATE imovel
      SET status = 'Vistoria em Andamento'
      WHERE idimovel = ${vistoria.idimovel}
    `;

    res.status(200).json({ message: 'Vistoria iniciada com sucesso.' });
  } catch (err) {
    console.error('Erro ao iniciar vistoria:', err);
    res.status(500).json({ error: 'Erro ao iniciar a vistoria.' });
  }
});

// GET: Vistorias pendentes para um cliente
router.get('/pendentes/cliente/:idcliente', async (req, res) => {
  const idCliente = Number(req.params.idcliente);
  if (isNaN(idCliente)) {
    return res.status(400).json({ error: "ID inválido." });
  }

  try {
    const vistorias = await db`
      SELECT v.*, i.descricao, e.nome AS nomeempreendimento
      FROM vistoria v
      JOIN imovel i ON v.idimovel = i.idimovel
      JOIN empreendimento e ON i.idempreendimento = e.idempreendimento
      WHERE v.idcliente = ${idCliente}
        AND v.status = 'Aguardando Agendamento da Vistoria'

    `;
    res.status(200).json(vistorias);
  } catch (err) {
    console.error('Erro ao buscar vistorias pendentes:', err);
    res.status(500).json({ error: "Erro ao buscar vistorias pendentes." });
  }
});

// GET - Imóveis do cliente pendentes de validação

router.get('/cliente/:idcliente/pendentes-validacao', async (req, res) => {
  const { idcliente } = req.params;

  try {
    const vistorias = await db`
      SELECT v.idvistoria, v.relatorio_url, v.status,
        i.idimovel, i.descricao, i.bloco, i.numero,
        e.nome AS nomeempreendimento, e.anexos AS imagemempreendimento
      FROM vistoria v
      JOIN imovel i ON v.idimovel = i.idimovel
      JOIN empreendimento e ON i.idempreendimento = e.idempreendimento
      WHERE i.idcliente = ${Number(idcliente)}
        AND v.status = 'Aguardando Validação'
    `;

    res.status(200).json(vistorias);
  } catch (error) {
    console.error('Erro ao buscar vistorias pendentes de validação:', error);
    res.status(500).json({ error: 'Erro ao buscar vistorias pendentes.' });
  }
});


// PUT - Validar uma vistoria (altera status para "Finalizada" e salva data de término)
router.put('/validar/:idvistoria', async (req, res) => {
  const { idvistoria } = req.params;
  const idParsed = Number(idvistoria);

  if (isNaN(idParsed)) {
    return res.status(400).json({ error: 'ID de vistoria inválido.' });
  }

  try {
    // Verifica se a vistoria existe e pega o idimovel
    const [vistoria] = await db`
      SELECT idimovel FROM vistoria WHERE idvistoria = ${idParsed}
    `;

    if (!vistoria) {
      return res.status(404).json({ error: 'Vistoria não encontrada.' });
    }

    const now = new Date().toISOString();

    // Atualiza status e datahorafim
    await db`
      UPDATE vistoria
      SET status = 'Finalizada',
          datahorafim = ${now}
      WHERE idvistoria = ${idParsed}
    `;

    res.status(200).json({ mensagem: 'Vistoria validada com sucesso.' });
  } catch (error) {
    console.error('Erro ao validar vistoria:', error);
    res.status(500).json({ error: 'Erro ao validar vistoria.' });
  }
});



module.exports = router;
