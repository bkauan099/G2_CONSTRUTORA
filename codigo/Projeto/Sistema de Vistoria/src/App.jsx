import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Inicial from "./pages/Inicial/Inicial";
import Login from "./pages/Login/login";
import Home from "./pages/HomeAdm/Home";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("usuario");
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Página Inicial */}
        <Route path="/" element={<Inicial />} />

        {/* Login */}
        <Route path="/login" element={<Login onLogin={login} />} />

        {/* Página principal após login */}
        <Route
          path="/home"
          element={
            isAuthenticated ? <Home onLogout={logout} /> : <Navigate to="/login" />
          }
        />

        {/* Rota inválida redireciona para inicial */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

