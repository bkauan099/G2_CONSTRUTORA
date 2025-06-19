import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Inicial from "./pages/Inicial/Inicial";
import Login from "./pages/Login/login";
import HomeAdm from "./pages/HomeAdm/Home";
import HomeCliente from "./pages/HomeCliente/Home";
import HomeVistoriador from "./pages/HomeVistoriador/Home"; // Your Vistoriador Home page

// Admin-specific Components
import Funcionarios from "./pages/HomeAdm/Funcionarios/Funcionarios";
import CadastrarFuncionario from "./pages/HomeAdm/Funcionarios/CadastrarFuncionario";
import EditarFuncionario from "./pages/HomeAdm/Funcionarios/EditarFuncionario";

// Client-specific Components
import MeusImoveis from "./pages/HomeCliente/MeuImovel";
import ImovelDetalhado from "./pages/HomeCliente/ImovelDetalhado";
import MinhasVistorias from "./pages/HomeCliente/MinhasVistorias";
import AgendarVistoria from "./pages/HomeCliente/AgendarVistoria";

// Vistoriador-specific Components (New/Updated)
import RealizarVistoriaListPage from "./pages/HomeVistoriador/RealizarVistoriaListPage"; // New component for the list
import VistoriaDataEntryPage from "./pages/HomeVistoriador/VistoriaDataEntryPage";   // New component for data entry

// Placeholder components for general pages (you'll create real ones)
const CriarRelatorioPage = () => <div><h1>Página de Gerenciamento de Relatórios</h1><p>Lista de relatórios para visualização/impressão.</p></div>;
const NotificarClientePage = () => <div><h1>Página de Notificação de Clientes</h1><p>Envie mensagens ou alertas para clientes.</p></div>;
const ReagendarVistoriaPage = () => <div><h1>Página de Reagendamento de Vistoria</h1><p>Formulário para alterar a data de uma vistoria.</p></div>;


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null); // 'admin', 'cliente' ou 'vistoriador'

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setIsAuthenticated(true);
        setUserType(userData.type);
      } catch (e) {
        console.error("Erro ao parsear dados do usuário no localStorage", e);
        localStorage.removeItem("usuario");
        setIsAuthenticated(false);
        setUserType(null);
      }
    }
  }, []);

  const login = (type) => { // 'type' pode ser 'admin', 'cliente' ou 'vistoriador'
    setIsAuthenticated(true);
    setUserType(type);
    localStorage.setItem("usuario", JSON.stringify({ type: type }));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    localStorage.removeItem("usuario");
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Página Inicial */}
        <Route path="/" element={<Inicial />} />

        {/* Login */}
        <Route path="/login" element={<Login onLogin={login} />} />

        {/* Rotas protegidas após login */}
        {isAuthenticated ? (
          <>
            {/* Rota Home principal, renderiza a Home correta com base no tipo de usuário */}
            <Route
              path="/home"
              element={
                userType === "admin" ? (
                  <HomeAdm onLogout={logout} />
                ) : userType === "cliente" ? (
                  <HomeCliente onLogout={logout} />
                ) : userType === "vistoriador" ? (
                  <HomeVistoriador onLogout={logout} />
                ) : (
                  <Navigate to="/login" /> // Redireciona se o tipo de usuário for desconhecido
                )
              }
            />

            {/* Rotas específicas do administrador */}
            {userType === "admin" && (
              <>
                <Route path="/funcionarios" element={<Funcionarios />} />
                <Route path="/cadastrar-funcionario" element={<CadastrarFuncionario />} />
                <Route path="/editar-funcionario/:id" element={<EditarFuncionario />} />
              </>
            )}

            {/* Rotas específicas do cliente */}
            {userType === "cliente" && (
              <>
                <Route path="/meus-imoveis" element={<MeusImoveis />} />
                <Route path="/imovel-detalhado/:id" element={<ImovelDetalhado />} />
                <Route path="/minhas-vistorias" element={<MinhasVistorias />} />
                <Route path="/agendar-vistoria" element={<AgendarVistoria />} />
              </>
            )}

            {/* Rotas específicas do Vistoriador */}
            {userType === "vistoriador" && (
              <>
                {/* Entry point for survey process: shows list of properties */}
                <Route path="/vistoriador/realizar-vistoria" element={<RealizarVistoriaListPage />} />
                {/* Detailed page for data entry for a specific survey */}
                <Route path="/vistoriador/vistoria/:id" element={<VistoriaDataEntryPage />} />
                {/* Pages for general actions / specific flows */}
                <Route path="/vistoriador/criar-relatorio" element={<CriarRelatorioPage />} />
                <Route path="/vistoriador/notificar-cliente" element={<NotificarClientePage />} />
                <Route path="/vistoriador/reagendar-vistoria/:id" element={<ReagendarVistoriaPage />} /> {/* Route for specific rescheduling */}
              </>
            )}

            {/* Rota padrão para usuários autenticados que acessam um caminho inválido, redireciona para /home */}
            <Route path="*" element={<Navigate to="/home" />} />
          </>
        ) : (
          // Se não estiver autenticado, qualquer rota protegida ou inválida redireciona para o login
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;