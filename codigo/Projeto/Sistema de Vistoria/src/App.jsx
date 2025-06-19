import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import Inicial from "./pages/Inicial/Inicial";
import Login from "./pages/Login/login";
import HomeAdm from "./pages/HomeAdm/Home";
import HomeCliente from "./pages/HomeCliente/Home";
import HomeVistoriador from "./pages/HomeVistoriador/Home"; // <--- Correct import for HomeVistoriador

// Componentes específicos do administrador:
import Funcionarios from "./pages/HomeAdm/Funcionarios/Funcionarios";
import CadastrarFuncionario from "./pages/HomeAdm/Funcionarios/CadastrarFuncionario";
import EditarFuncionario from "./pages/HomeAdm/Funcionarios/EditarFuncionario";

// Componentes específicos do cliente:
import MeusImoveis from "./pages/HomeCliente/MeuImovel";
import ImovelDetalhado from "./pages/HomeCliente/ImovelDetalhado";
import MinhasVistorias from "./pages/HomeCliente/MinhasVistorias";
import AgendarVistoria from "./pages/HomeCliente/AgendarVistoria";

// ⚠️ IMPORTANT: You need to create these components in your project!
// For now, I'm providing simple placeholder components.
const RealizarVistoriaPage = () => (
  <div>
    <h2>Página de Realizar Vistoria</h2>
    <p>Aqui você iniciará uma nova vistoria.</p>
  </div>
);
const CriarRelatorioPage = () => (
  <div>
    <h2>Página de Criar Relatório</h2>
    <p>Aqui você gerará relatórios de vistorias concluídas.</p>
  </div>
);


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null); // 'admin', 'cliente', or 'vistoriador'

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

  const login = (type) => { // 'type' can be 'admin', 'cliente', or 'vistoriador'
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
        {/* Initial Page */}
        <Route path="/" element={<Inicial />} />

        {/* Login Page */}
        <Route path="/login" element={<Login onLogin={login} />} />

        {/* Protected Routes after login */}
        {isAuthenticated ? (
          <>
            {/* Main Home Route: Renders the correct Home based on user type */}
            <Route
              path="/home"
              element={
                userType === "admin" ? (
                  <HomeAdm onLogout={logout} />
                ) : userType === "cliente" ? (
                  <HomeCliente onLogout={logout} />
                ) : userType === "vistoriador" ? ( // <--- Add this condition for vistoriador
                  <HomeVistoriador onLogout={logout} />
                ) : (
                  <Navigate to="/login" /> // Redirects if user type is unknown
                )
              }
            />

            {/* Admin-specific Routes */}
            {userType === "admin" && (
              <>
                <Route path="/funcionarios" element={<Funcionarios />} />
                <Route path="/cadastrar-funcionario" element={<CadastrarFuncionario />} />
                <Route path="/editar-funcionario/:id" element={<EditarFuncionario />} />
              </>
            )}

            {/* Client-specific Routes */}
            {userType === "cliente" && (
              <>
                <Route path="/meus-imoveis" element={<MeusImoveis />} />
                <Route path="/imovel-detalhado/:id" element={<ImovelDetalhado />} />
                <Route path="/minhas-vistorias" element={<MinhasVistorias />} />
                <Route path="/agendar-vistoria" element={<AgendarVistoria />} />
              </>
            )}

            {/* Vistoriador-specific Routes */}
            {userType === "vistoriador" && ( // <--- Add this block for vistoriador routes
              <>
                <Route path="/realizar-vistoria" element={<RealizarVistoriaPage />} />
                <Route path="/criar-relatorio" element={<CriarRelatorioPage />} /> {/* <--- Use the consistent path */}
              </>
            )}

            {/* Default route for authenticated users accessing an invalid path, redirects to /home */}
            <Route path="*" element={<Navigate to="/home" />} />
          </>
        ) : (
          // If not authenticated, any protected or invalid route redirects to login
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;