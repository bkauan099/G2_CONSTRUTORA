import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Empreendimentos from './pages/HomeAdm/Empreendimentos/Empreendimentos';
import CadastrarEmpreendimento from './pages/HomeAdm/Empreendimentos/CadastrarEmpreendimento';
import EditarEmpreendimento from './pages/HomeAdm/Empreendimentos/EditarEmpreendimento';
import Imoveis from './pages/HomeAdm/Imoveis/Imoveis';
import CadastrarImovel from './pages/HomeAdm/Imoveis/CadastrarImovel';
// Importe outras páginas que você usar (Home, Login, Funcionarios, etc.)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/empreendimentos" element={<Empreendimentos />} />
        <Route path="/cadastrar-empreendimento" element={<CadastrarEmpreendimento />} />
        <Route path="/editar-empreendimento/:id" element={<EditarEmpreendimento />} />
        <Route path="/imoveis" element={<Imoveis />} />
        <Route path="/cadastrar-imovel" element={<CadastrarImovel />} />
        {/* Adicione aqui outras rotas como /home, /login, etc. */}
      </Routes>
    </Router>
  );
}

export default App;
