import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react"; // carregar o tipo de usuario

import Inicial from "./pages/Inicial/Inicial"; //pagina inicial para todso e opção de login
import Login from "./pages/Login/login";
import HomeAdm from "./pages/HomeAdm/Home"; // pagina de inicio do administrador
import HomeCliente from "./pages/HomeCliente/Home"; // pagina de inicio do cliente

//Componentes específicos do administrador:
import Funcionarios from "./pages/HomeAdm/Funcionarios/Funcionarios";
import CadastrarFuncionario from "./pages/HomeAdm/Funcionarios/CadastrarFuncionario";
import EditarFuncionario from "./pages/HomeAdm/Funcionarios/EditarFuncionario";

//Componentes específicos do cliente:
import MeusImoveis from "./pages/HomeCliente/MeuImovel";
import ImovelDetalhado from "./pages/HomeCliente/ImovelDetalhado";
import MinhasVistorias from "./pages/HomeCliente/MinhasVistorias";
import AgendarVistoria from "./pages/HomeCliente/AgendarVistoria";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null); // 'admin' ou 'cliente'

 
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

  const login = (type) => { // 'type' pode ser 'admin' ou 'cliente'
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
                ) : (
                  <Navigate to="/login" /> // Redireciona se o tipo de usuário for desconhecido
                )
              }
            />

            {/* Rotas específicas do administrador*/}
            {userType === "admin" && (
              <>
                <Route path="/funcionarios" element={<Funcionarios />} />
                <Route path="/cadastrar-funcionario" element={<CadastrarFuncionario />} />
                <Route path="/editar-funcionario/:id" element={<EditarFuncionario />} />
              </>
            )}

            {/* Rotas específicas do cliente (protegidas e só acessíveis se userType for 'cliente') */}
                        {userType === "cliente" && (
                          <>
                            <Route path="/meus-imoveis" element={<MeusImoveis />} />
                            <Route path="/imovel-detalhado/:id" element={<ImovelDetalhado />} />
                            <Route path="/minhas-vistorias" element={<MinhasVistorias />} />
                            <Route path="/agendar-vistoria" element={<AgendarVistoria />} />
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

