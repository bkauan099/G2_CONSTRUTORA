// src/components/Navbar/Navbar.jsx
// menu reaproveitado do bruno

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ onLogout, userType = 'Admin' }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('usuario');
    if (onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="logo">CIVIS ({userType})</div>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <a href="#" onClick={() => { navigate("/home"); setMenuOpen(false); }}>Home</a> 
        <a href="#" onClick={() => { navigate("/nova-vistoria"); setMenuOpen(false); }}>Nova Vistoria</a>
        <a href="#" onClick={() => { navigate("/vistorias-agendadas"); setMenuOpen(false); }}>Vistorias Agendadas</a>
        <a href="#" onClick={() => { navigate("/clientes"); setMenuOpen(false); }}>Clientes</a>
        <a href="#" onClick={() => { navigate("/empreendimentos"); setMenuOpen(false); }}>Empreendimentos</a>
        <a href="#" onClick={() => { navigate("/funcionarios"); setMenuOpen(false); }}>Funcionários</a>
        <a href="#" onClick={() => { navigate("/perfil-adm"); setMenuOpen(false); }}>Perfil</a>
        <button className="logout-button mobile-logout" onClick={handleLogout}>
          Sair
        </button>
      </nav>

      {/* Botão de alternância do menu com ícone dinâmico */}
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? '✘' : '☰'} 
      </button>

      <button className="logout-button desktop-logout" onClick={handleLogout}>
        Sair
      </button>
    </header>
  );
}

export default Navbar;