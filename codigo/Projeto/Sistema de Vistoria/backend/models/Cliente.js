







const express = require('express');
const router = express.Router();
const db = require('../db');

// GET: Listar todos os clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await db`
      SELECT * FROM cliente
    `;
    res.status(200).json(clientes);
  } catch (err) {
    console.error('Erro ao listar clientes:', err);
    res.status(500).json({ error: 'Erro ao listar clientes.' });
  }
});

// POST: Cadastrar novo cliente
router.post('/', async (req, res) => {
  const { nome, email, telefone, cpf } = req.body;

  if (!nome || !email || !telefone || !cpf) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
  }

  try {
    const [novoCliente] = await db`
      INSERT INTO cliente (nome, email, telefone, cpf)
      VALUES (${nome}, ${email}, ${telefone}, ${cpf})
      RETURNING *
    `;
    res.status(201).json(novoCliente);
  } catch (err) {
    console.error('Erro ao cadastrar cliente:', err);
    res.status(500).json({ error: 'Erro ao cadastrar cliente.' });
  }
});

// DELETE: Excluir cliente por ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db`
      DELETE FROM cliente WHERE idcliente = ${Number(id)}
    `;
    res.status(200).json({ message: 'Cliente excluído com sucesso.' });
  } catch (err) {
    console.error('Erro ao excluir cliente:', err);
    res.status(500).json({ error: 'Erro ao excluir cliente.' });
  }
});

module.exports = router;






















/*const User = require('./user');

class Cliente extends User {
  constructor(props) {
    super(props);
  }

  agendarVistoria(vistoria) {
    this.vistorias.push(vistoria);
  }

  validarVistoria(vistoriaId) {
    const vistoria = this.vistorias.find(v => v.id === vistoriaId);
    if (vistoria) {
      vistoria.status = 'VALIDADA';
    }
  }
}

module.exports = Cliente;*/