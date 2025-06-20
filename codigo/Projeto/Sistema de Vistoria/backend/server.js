const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importa rotas
const funcionariosRoutes = require('./models/Funcionario');
const administradoresRoutes = require('./models/Administrador');

const app = express();
app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/api/funcionarios', funcionariosRoutes);
app.use('/api/administradores', administradoresRoutes);

// Teste de ambiente
console.log(typeof process.env.DATABASE_URL); // Deve ser string

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
