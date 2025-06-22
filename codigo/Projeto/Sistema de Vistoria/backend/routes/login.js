const express = require('express');
const router = express.Router();
const db = require('../db'); // Aqui estamos importando o cliente do Supabase

// Corrigido: remove o "/login" aqui
router.post("/", async (req, res) => {
  const { email, senha } = req.body;

  try {
    // 1. Verifica se é funcionário
    const funcResult = await db
      .from('funcionario')  // Usando o método correto para interagir com o banco
      .select('*')
      .eq('email', email)
      .eq('senha', senha);

    if (funcResult.data.length > 0) {
      const funcionario = funcResult.data[0];

      // Verifica se é administrador
      const admResult = await db
        .from('administrador')
        .select('*')
        .eq('idadministrador', funcionario.id);

      if (admResult.data.length > 0) {
        return res.json({ tipo: "admin", id: funcionario.id });
      }

      // Verifica se é vistoriador
      const vistResult = await db
        .from('vistoriador')
        .select('*')
        .eq('idvistoriador', funcionario.id);

      if (vistResult.data.length > 0) {
        return res.json({ tipo: "vistoriador", id: funcionario.id });
      }

      return res.status(403).json({ erro: "Funcionário sem cargo identificado." });
    }

    // 2. Verifica se é cliente
    const clienteResult = await db
      .from('cliente')
      .select('*')
      .eq('email', email)
      .eq('cpf', senha);

    if (clienteResult.data.length > 0) {
      const cliente = clienteResult.data[0];
      return res.json({ tipo: "cliente", id: cliente.idcliente });
    }

    return res.status(401).json({ erro: "Email ou senha inválidos." });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ erro: "Erro interno no servidor." });
  }
});

module.exports = router;
