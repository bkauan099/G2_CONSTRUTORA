const express = require('express');
const router = express.Router();
const Funcionario = require('../models/Funcionario2');

// Rota para criar funcionário
// router.post('/', async (req, res) => {
//   try {
//     const funcionario = new Funcionario(req.body);
//     const resultado = await funcionario.salvar();
//     res.status(201).json(resultado);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// Rota para buscar funcionário por ID
// router.get('/:id', async (req, res) => {
//   try {
//     const funcionario = await Funcionario.buscarPorId(req.params.id);
//     res.json(funcionario);
//   } catch (error) {
//     res.status(404).json({ error: 'Funcionário não encontrado' });
//   }
// });

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