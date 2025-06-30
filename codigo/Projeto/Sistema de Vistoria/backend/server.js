require('dotenv').config();
require('dns').setDefaultResultOrder('ipv4first');

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Servir arquivos estáticos
app.use('/uploads', express.static('uploads'));
app.use('/relatorios', express.static('relatorios'));

// Importar rotas
const loginRoutes = require('./routes/login');
const relatorioRoutes = require('./routes/relatorio.routes');
const vistoriasRoutes = require('./routes/vistorias'); // <-- nova rota real

// Rotas de entidades (aqui você pode mover para routes/ também futuramente)
const funcionariosRoutes = require('./models/Funcionario');
const administradoresRoutes = require('./models/Administrador');
const empreendimentoRoutes = require('./models/Empreendimento');  
const imoveisRoutes = require('./models/Imovel');
const vistoriadoresRoutes = require('./models/Vistoriador');
const clientesRoutes = require('./models/Cliente');

// Aplicar rotas
app.use('/api', loginRoutes);
app.use('/api/relatorio', relatorioRoutes);
app.use('/api/vistorias', vistoriasRoutes); // <-- agora correto
app.use('/api/funcionarios', funcionariosRoutes);
app.use('/api/administradores', administradoresRoutes);
app.use('/api/empreendimentos', empreendimentoRoutes);  
app.use('/api/imoveis', imoveisRoutes);
app.use('/api/vistoriadores', vistoriadoresRoutes);
app.use('/api/clientes', clientesRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
