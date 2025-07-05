// src/pages/HomeVistoriador/Perfil/PerfilVistoriador.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PerfilVistoriador.module.css';

function PerfilVistoriador() {
  const navigate = useNavigate();
  const [vistoriadorInfo, setVistoriadorInfo] = useState({
    nome: 'Vistoriador Exemplo',
    email: 'vistoriador@example.com',
    cpf: '555.444.333-22',
    telefone: '(99) 91234-5678',
    cargo: 'Vistoriador',
    profileImage: null,
  });

  // NOVO ESTADO PARA ARMAZENAR O ID DO VISTORIADOR
  const [vistoriadorId, setVistoriadorId] = useState(null);

  useEffect(() => {
    console.log("Carregando dados do perfil do vistoriador...");
    // **Aqui você deve carregar o ID real do vistoriador logado.**
    // Por exemplo, se você salvou o ID no localStorage no momento do login:
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        // Assumindo que você salva um 'id' ou 'userId' junto com 'type'
        // Se não tiver um ID real, use um ID mockado TEMPORARIAMENTE para testar
        setVistoriadorId(userData.userId || '1'); // <-- Use um ID real ou mockado aqui
        // Se você busca os dados do usuário de uma API, o ID estaria na resposta
      } catch (e) {
        console.error("Erro ao parsear dados do usuário no localStorage", e);
      }
    }
  }, []);

  const handleEditProfile = () => {
    if (vistoriadorId) {
      // CONSERTO: Passe o ID real para a função navigate
      navigate(`/vistoriador/editar-perfil-vistoriador/${vistoriadorId}`);
    } else {
      // Lidar com o caso onde o ID não está disponível
      alert("ID do vistoriador não encontrado. Não é possível editar o perfil.");
      console.error("Erro: ID do vistoriador não encontrado para navegar para a edição do perfil.");
    }
  };

  const handleLogout = () => {
    alert('Você será desconectado! (Apenas simulação no frontend)');
    localStorage.removeItem('token');
    localStorage.removeItem('userId'); // Certifique-se de remover o userId também
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  const navigateToHomeVistoriador = () => {
    // CORRIGIR: A rota para HomeVistoriador é '/home' na sua App.js,
    // e lá ela renderiza HomeVistoriador se userType for "vistoriador"
    navigate('/home');
  };

  const navigateToVistoriasAgendadas = () => {
    // CORRIGIR: Você tem '/vistoriador/realizar-vistoria' como a página de listagem de vistorias agendadas para o vistoriador.
    // O nome da rota que você usou era '/vistorias-agendadas-vistoriador' mas não existe no App.js
    navigate('/vistoriador/realizar-vistoria');
  };

  return (
    <div className={styles.perfilVistoriadorContainer}>
      <header className={styles.perfilVistoriadorNavbar}>
        <div className={styles.perfilVistoriadorLogo}>CIVIS ({vistoriadorInfo.cargo})</div>
        <nav className={styles.perfilVistoriadorNavLinks}>
          <a href="#" onClick={navigateToHomeVistoriador}>Home</a>
          <a href="#" onClick={navigateToVistoriasAgendadas}>Minhas Vistorias</a>
        </nav>
        <button className={styles.perfilVistoriadorLogoutButton} onClick={handleLogout}>
          Sair
        </button>
      </header>

      <main className={styles.perfilVistoriadorMainContent}>
        <h1 className={styles.perfilVistoriadorTitle}>Meu Perfil de Vistoriador</h1>

        <div className={styles.profileImageContainer}>
          <img
            src={vistoriadorInfo.profileImage || ''}
            alt="Foto de Perfil"
            className={styles.profileImage}
          />
          {!vistoriadorInfo.profileImage && (
            <span className={styles.noPhotoPlaceholder}>
              Sem Foto
            </span>
          )}
        </div>

        <div className={styles.perfilVistoriadorInfoGrid}>
          <div className={styles.perfilVistoriadorInfoItem}>
            <span className={styles.perfilVistoriadorInfoLabel}>Nome Completo:</span>
            <span className={styles.perfilVistoriadorInfoValue}>{vistoriadorInfo.nome}</span>
          </div>
          <div className={styles.perfilVistoriadorInfoItem}>
            <span className={styles.perfilVistoriadorInfoLabel}>Email:</span>
            <span className={styles.perfilVistoriadorInfoValue}>{vistoriadorInfo.email}</span>
          </div>
          <div className={styles.perfilVistoriadorInfoItem}>
            <span className={styles.perfilVistoriadorInfoLabel}>CPF:</span>
            <span className={styles.perfilVistoriadorInfoValue}>{vistoriadorInfo.cpf}</span>
          </div>
          <div className={styles.perfilVistoriadorInfoItem}>
            <span className={styles.perfilVistoriadorInfoLabel}>Telefone:</span>
            <span className={styles.perfilVistoriadorInfoValue}>{vistoriadorInfo.telefone}</span>
          </div>
          <div className={styles.perfilVistoriadorInfoItem}>
            <span className={styles.perfilVistoriadorInfoLabel}>Cargo:</span>
            <span className={styles.perfilVistoriadorInfoValue}>{vistoriadorInfo.cargo}</span>
          </div>
        </div>

        <div className={styles.perfilVistoriadorActions}>
          <button className={styles.perfilVistoriadorButtonPrimary} onClick={handleEditProfile}>
            Editar Perfil
          </button>
        </div>
      </main>
    </div>
  );
}

export default PerfilVistoriador;