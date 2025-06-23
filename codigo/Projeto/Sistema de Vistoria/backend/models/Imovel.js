const express = require('express');
const router = express.Router();
const db = require('../db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Garante que a pasta de uploads exista
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configuração do Multer para upload de imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// GET - Buscar imóveis por empreendimento
router.get('/', async (req, res) => {
  const { empreendimentoid } = req.query;

  console.log('empreendimentoid recebido:', empreendimentoid);

  if (!empreendimentoid) {
    return res.status(400).json({ error: 'Parâmetro empreendimentoid é obrigatório.' });
  }

  try {
    const imoveis = await db`
      SELECT * FROM imovel WHERE idempreendimento = ${Number(empreendimentoid)}
    `;
    res.status(200).json(imoveis);
  } catch (error) {
    console.error('Erro ao buscar imóveis:', error);
    res.status(500).json({ error: 'Erro ao buscar imóveis.' });
  }
});

// POST - Cadastrar imóvel com valores automáticos
router.post('/', upload.single('anexos'), async (req, res) => {
  const { descricao, bloco, numero, idempreendimento } = req.body;
  const arquivoAnexo = req.file ? req.file.filename : null;

  if (!idempreendimento) {
    return res.status(400).json({ error: 'idempreendimento é obrigatório.' });
  }

  try {
    const [novoImovel] = await db`
      INSERT INTO imovel (descricao, bloco, numero, anexos, idempreendimento, status, vistoriasrealizadas)
      VALUES (${descricao}, ${bloco}, ${numero}, ${arquivoAnexo}, ${Number(idempreendimento)}, 'Aguardando Vistoria', 0)
      RETURNING *
    `;
    res.status(201).json(novoImovel);
  } catch (error) {
    console.error('Erro ao cadastrar imóvel:', error);
    res.status(500).json({ error: 'Erro ao cadastrar imóvel.' });
  }
});

// DELETE - Excluir imóvel
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db`
      DELETE FROM imovel WHERE idimovel = ${Number(id)}
    `;
    res.status(200).json({ message: 'Imóvel excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir imóvel:', error);
    res.status(500).json({ error: 'Erro ao excluir imóvel.' });
  }
});

module.exports = router;
