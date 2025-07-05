// src/pages/HomeCliente/Perfil/PerfilCliente.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PerfilCliente.module.css'; // Importa o CSS Module para este componente

function PerfilCliente() {
  const navigate = useNavigate();
  // Estado para armazenar as informações do cliente - INFORMAÇÕES MOCKADAS (FIXAS)
  // Substitua estas informações pelos dados reais do backend quando integrar.
  const [clienteInfo, setClienteInfo] = useState({
    nome: 'Cliente Exemplo',
    email: 'cliente@example.com',
    cpf: '111.222.333-44',
    telefone: '(99) 98765-4321',
    cargo: 'Cliente', // Sempre 'Cliente' para este perfil
    profileImage: null, // ALTERADO: Inicializado como null. Em um cenário real, isso viria do backend.
  });

  // Função para lidar com o clique no botão "Editar Perfil"
  const handleEditProfile = () => {
    // Navega para a rota de edição de perfil do cliente.
    navigate('/editar-perfil-cliente');
  };

  // Função para lidar com o logout do usuário
  const handleLogout = () => {
    alert('Você será desconectado!'); // Alerta simples para simular a desconexão
    navigate('/login'); // Redireciona para a tela de login
  };

  // Função de navegação para a Home do Cliente
  const navigateToHomeCliente = () => {
    navigate('/home-cliente'); // Assuma uma rota de home para clientes na sua aplicação
  };

  return (
    <div className={styles.perfilClienteContainer}>
      <header className={styles.perfilClienteNavbar}>
        <div className={styles.perfilClienteLogo}>CIVIS ({clienteInfo.cargo})</div>
        <nav className={styles.perfilClienteNavLinks}>
          <a href="#" onClick={navigateToHomeCliente}>Home</a>
        </nav>
        <button className={styles.perfilClienteLogoutButton} onClick={handleLogout}>
          Sair
        </button>
      </header>

      <main className={styles.perfilClienteMainContent}>
        <h1 className={styles.perfilClienteTitle}>Meu Perfil</h1>

        {/* Contêiner para a imagem de perfil */}
        <div className={styles.profileImageContainer}>
          <img
            src={clienteInfo.profileImage || ''} // ALTERADO: src será vazio se profileImage for null
            alt="Foto de Perfil"
            className={styles.profileImage}
          />
        </div>

        {/* Grid para exibir as informações do cliente */}
        <div className={styles.perfilClienteInfoGrid}>
          <div className={styles.perfilClienteInfoItem}>
            <span className={styles.perfilClienteInfoLabel}>Nome Completo:</span>
            <span className={styles.perfilClienteInfoValue}>{clienteInfo.nome}</span>
          </div>
          <div className={styles.perfilClienteInfoItem}>
            <span className={styles.perfilClienteInfoLabel}>Email:</span>
            <span className={styles.perfilClienteInfoValue}>{clienteInfo.email}</span>
          </div>
          <div className={styles.perfilClienteInfoItem}>
            <span className={styles.perfilClienteInfoLabel}>CPF:</span>
            <span className={styles.perfilClienteInfoValue}>{clienteInfo.cpf}</span>
          </div>
          <div className={styles.perfilClienteInfoItem}>
            <span className={styles.perfilClienteInfoLabel}>Telefone:</span>
            <span className={styles.perfilClienteInfoValue}>{clienteInfo.telefone}</span>
          </div>
          <div className={styles.perfilClienteInfoItem}>
            <span className={styles.perfilClienteInfoLabel}>Tipo de Usuário:</span>
            <span className={styles.perfilClienteInfoValue}>{clienteInfo.cargo}</span>
          </div>
        </div>

        {/* Seção de ações do perfil */}
        <div className={styles.perfilClienteActions}>
          <button className={styles.perfilClienteButtonPrimary} onClick={handleEditProfile}>
            Editar Perfil
          </button>
        </div>
      </main>
    </div>
  );
}

export default PerfilCliente;