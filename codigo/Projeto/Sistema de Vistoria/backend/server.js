const express = require('express');
const cors = require('cors');
require('dotenv').config();
console.log(typeof(process.env.PG_PASSWORD)); // Teste do tipo de senha, por que estava vindo com uma variavel diferente de string as vezes,,,,,,

const funcionariosRoutes = require('./models/Funcionario');
const administradoresRoutes = require('./models/Administrador');

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/funcionarios', funcionariosRoutes);
app.use('/api/administradores', administradoresRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
