const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Importa rotas
const funcionariosRoutes = require('./models/Funcionario');
const administradoresRoutes = require('./models/Administrador');
const loginRoutes = require('./routes/login'); // <-- nova rota de login

// Usa rotas da API
app.use('/api/funcionarios', funcionariosRoutes);
app.use('/api/administradores', administradoresRoutes);
app.use('/api', loginRoutes); // <-- adiciona rota de login em /api/login

// Teste de ambiente
console.log(typeof process.env.DATABASE_URL); // Deve ser string

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
