import Inicial from "./pages/Inicial/Inicial";
import Login from "./pages/Login/login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        {/* Aqui estão todas as rotas que vão ser acessadas a partir do index jsx e depois vão acessar a pasta de pages */}
        <Route path="/" element={<Inicial />} />
        <Route path="/login" element={<Login />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;