require('dotenv').config(); // Carrega variáveis do .env antes de qualquer coisa

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
const empreendimentosRoutes = require('./models/Empreendimento'); // tudo minúsculo se nome do arquivo for minúsculo
const loginRoutes = require('./routes/login'); // rota de login

// Usa as rotas
app.use('/api/empreendimentos', empreendimentosRoutes);
app.use('/api/login', loginRoutes); // <-- adicionada aqui

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
