const db = require("../db");
const { enviarEmailAgendamento } = require("../enviarEmail");

// Criação da vistoria pelo administrador
async function criarVistoria(req, res) {
  const { idcliente, idvistoriador, idimovel, observacoes, datainicio } = req.body;

  // ✅ Verifica se todos os campos obrigatórios foram enviados
  if (!idcliente || !idvistoriador || !idimovel || !datainicio) {
    return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos.' });
  }

  try {
    // ✅ Converte a data para formato Date do JS (timestamptz no PostgreSQL)
    const dataInicioTimestamp = new Date(datainicio);

    if (isNaN(dataInicioTimestamp.getTime())) {
      return res.status(400).json({ error: 'Data de início inválida.' });
    }

    // ✅ Cria a vistoria com status e datainicio corretos
    const [novaVistoria] = await db`
      INSERT INTO vistoria (
        idcliente, idvistoriador, idimovel, observacoes, datainicio, status
      ) VALUES (
        ${Number(idcliente)},
        ${Number(idvistoriador)},
        ${Number(idimovel)},
        ${observacoes},
        ${dataInicioTimestamp},
        'Aguardando Agendamento da Vistoria'
      )
      RETURNING *
    `;

    // ✅ Busca dados para envio de e-mail
    const [cliente] = await db`
      SELECT nome, email FROM cliente WHERE idcliente = ${idcliente}
    `;

    const [imovel] = await db`
      SELECT descricao FROM imovel WHERE idimovel = ${idimovel}
    `;

    const [vistoriador] = await db`
      SELECT nome, email FROM funcionario WHERE id = ${idvistoriador}
    `;

    // ✅ E-mail para vistoriador
    await enviarEmailAgendamento({
      para: process.env.EMAIL_USER,
      nomeCliente: cliente.nome,
      endereco: imovel.descricao,
      nomeVistoriador: vistoriador.nome,
    });

    // ✅ E-mail para cliente (mensagem diferenciada se quiser)
    await enviarEmailAgendamento({
      para: process.env.EMAIL_DESTINO,
      nomeCliente: cliente.nome,
      endereco: imovel.descricao,
      nomeVistoriador: vistoriador.nome,
      tipo: "cliente", // usado no enviarEmail.js para personalizar
    });

    res.status(201).json(novaVistoria);
  } catch (err) {
    console.error("Erro ao agendar vistoria:", err);
    res.status(500).json({ erro: "Erro ao agendar vistoria" });
  }
}

// Agendamento pelo cliente
async function agendarVistoriaPorCliente(req, res) {
  const { idimovel } = req.params;
  const { dataagendada } = req.body;

  try {
    // ✅ Atualiza o status e observações do imóvel
    await db`
      UPDATE imovel SET status = 'Agendamento Pendente', observacoes = 'Solicitado pelo cliente'
      WHERE idimovel = ${idimovel}
    `;

    const [imovel] = await db`
      SELECT descricao FROM imovel WHERE idimovel = ${idimovel}
    `;

    const [cliente] = await db`
      SELECT nome, email FROM cliente
      WHERE idcliente = (
        SELECT idcliente FROM vistoria WHERE idimovel = ${idimovel} LIMIT 1
      )
    `;

    const [vistoriador] = await db`
      SELECT nome, email FROM funcionario LIMIT 1
    `;

    // ✅ Notifica o vistoriador da solicitação
    await enviarEmailAgendamento({
      para: vistoriador.email,
      nomeCliente: cliente.nome,
      endereco: imovel.descricao,
      nomeVistoriador: vistoriador.nome,
    });

    res.status(200).json({ mensagem: "Solicitação enviada e e-mail notificado." });

  } catch (err) {
    console.error("Erro ao processar agendamento do cliente:", err);
    res.status(500).json({ erro: "Erro ao processar solicitação de vistoria." });
  }
}

module.exports = {
  criarVistoria,
  agendarVistoriaPorCliente
};
