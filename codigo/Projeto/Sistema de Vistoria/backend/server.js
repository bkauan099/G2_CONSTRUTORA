const express = require('express');
const cors = require('cors');
require('dotenv').config();

const funcionariosRoutes = require('./routes/funcionarios');
const administradoresRoutes = require('./routes/administrador');

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
