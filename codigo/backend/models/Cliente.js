const express = require('express');
const router = express.Router();
const db = require('../db');


// POST: Criar novo cliente
router.post('/', async (req, res) => {
  const { nome, cpf, email, senha, telefone } = req.body;

  // Validação básica
  if (!nome || !cpf || !email || !senha) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    // Verifica se o email já está cadastrado
    const [usuarioExistente] = await db`
      SELECT * FROM cliente WHERE email = ${email}
    `;
    if (usuarioExistente) {
      return res.status(409).json({ error: 'Email já cadastrado.' });
    }

    // Garante que o campo telefone não seja undefined (evita erro do postgres.js)
    const telefoneSeguro = telefone || '';

    // Insere novo cliente
    const [novoCliente] = await db`
      INSERT INTO cliente (nome, cpf, email, senha, telefone)
      VALUES (${nome}, ${cpf}, ${email}, ${senha}, ${telefoneSeguro})
      RETURNING *
    `;
    res.status(201).json(novoCliente);
  } catch (err) {
    console.error('Erro ao cadastrar cliente:', err);
    res.status(500).json({ error: 'Erro ao cadastrar cliente.', detalhes: err.message });
  }
});



// GET: Listar todos os clientes (admin usa para ver todos os clientes cadastrados)
router.get('/', async (req, res) => {
  try {
    const clientes = await db`
      SELECT * FROM cliente ORDER BY idcliente DESC
    `;
    res.status(200).json(clientes);
  } catch (err) {
    console.error('Erro ao buscar clientes:', err);
    res.status(500).json({ error: 'Erro ao buscar clientes.', detalhes: err.message });
  }
});


// DELETE: Excluir cliente por ID (usado na função de exclusão do admin)
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { confirmacao } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido.' });
  }

  // Confirmação obrigatória enviada pelo frontend
  if (confirmacao?.trim().toUpperCase() !== 'SIM') {
    return res.status(400).json({ error: 'Confirmação de exclusão ausente ou incorreta. Digite "SIM" para confirmar.' });
  }

  try {
    const [cliente] = await db`
      SELECT * FROM cliente WHERE idcliente = ${id}
    `;
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }

    await db`
      DELETE FROM cliente WHERE idcliente = ${id}
    `;

    res.status(200).json({ message: 'Cliente excluído com sucesso.' });
  } catch (err) {
    console.error('Erro ao excluir cliente:', err);
    res.status(500).json({ error: 'Erro ao excluir cliente.', detalhes: err.message });
  }
});


// GET: Buscar cliente por ID (usado na edição)
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido.' });
  }

  try {
    const [cliente] = await db`
      SELECT * FROM cliente WHERE idcliente = ${id}
    `;
    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }

    res.status(200).json(cliente);
  } catch (err) {
    console.error('Erro ao buscar cliente:', err);
    res.status(500).json({ error: 'Erro ao buscar cliente.', detalhes: err.message });
  }
});


// PUT: Atualizar cliente por ID
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const { nome, cpf, email, telefone } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido.' });
  }

  try {
    const result = await db`
      UPDATE cliente
      SET nome = ${nome}, cpf = ${cpf}, email = ${email}, telefone = ${telefone}
      WHERE idcliente = ${id}
      RETURNING *
    `;

    if (result.length === 0) {
      return res.status(404).json({ error: 'Cliente não encontrado.' });
    }

    res.status(200).json(result[0]);
  } catch (err) {
    console.error('Erro ao atualizar cliente:', err);
    res.status(500).json({ error: 'Erro ao atualizar cliente.', detalhes: err.message });
  }
});




module.exports = router;
