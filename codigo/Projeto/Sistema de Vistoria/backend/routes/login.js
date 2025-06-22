const express = require('express');
const router = express.Router();
const supabase = require('../db');

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    // 1. Verifica se é funcionário
    const { data: funcionarios, error: funcError } = await supabase
      .from('funcionario')
      .select('*')
      .eq('email', email)
      .eq('senha', senha);

    if (funcError) throw funcError;

    if (funcionarios.length > 0) {
      const funcionario = funcionarios[0];

      // Verifica se é administrador
      const { data: admins, error: admError } = await supabase
        .from('administrador')
        .select('*')
        .eq('idadministrador', funcionario.id);

      if (admError) throw admError;

      if (admins.length > 0) {
        return res.json({ tipo: "admin", id: funcionario.id });
      }

      // Verifica se é vistoriador
      const { data: vists, error: vistError } = await supabase
        .from('vistoriador')
        .select('*')
        .eq('idvistoriador', funcionario.id);

      if (vistError) throw vistError;

      if (vists.length > 0) {
        return res.json({ tipo: "vistoriador", id: funcionario.id });
      }

      return res.status(403).json({ erro: "Funcionário sem cargo identificado." });
    }

    // 2. Verifica se é cliente
    const { data: clientes, error: clienteError } = await supabase
      .from('cliente')
      .select('*')
      .eq('email', email)
      .eq('cpf', senha);

    if (clienteError) throw clienteError;

    if (clientes.length > 0) {
      const cliente = clientes[0];
      return res.json({ tipo: "cliente", id: cliente.idcliente });
    }

    return res.status(401).json({ erro: "Email ou senha inválidos." });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ erro: "Erro interno no servidor." });
  }
});

module.exports = router;
