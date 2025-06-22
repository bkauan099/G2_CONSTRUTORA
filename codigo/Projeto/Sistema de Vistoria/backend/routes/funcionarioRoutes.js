const express = require('express');
const router = express.Router();
const Funcionario = require('../models/Funcionario2');


router.post('/adicionar-vistoria', async (req, res) => {
  console.log("Rota /adicionar-vistoria chamada");
  console.log("Dados recebidos:", req.body);
  try {
    const { idImovel, idVistoriador, dataInicio, observacoes } = req.body;
    const funcionario = new Funcionario({});
    const resultado = await funcionario.adicionarVistoria({
      id_imovel: idImovel,
      id_vistoriador: idVistoriador,
      data_inicio: dataInicio,
      observacoes
    });
    res.status(201).json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;