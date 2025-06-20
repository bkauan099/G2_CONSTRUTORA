const express = require('express');
const cors = require('cors');
require('dotenv').config();

const funcionariosRoutes = require('./models/Funcionario');
const administradoresRoutes = require('./models/Administrador');
const loginRoutes = require('./routes/login');
const relatorioRoutes = require('./routes/relatorio.routes');

const app = express();
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/funcionarios', funcionariosRoutes);
app.use('/api/administradores', administradoresRoutes);
app.use('/api', loginRoutes);
app.use('/api/relatorio', relatorioRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
