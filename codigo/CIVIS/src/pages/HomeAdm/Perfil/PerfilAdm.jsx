// src/pages/HomeAdm/Perfil/PerfilAdm.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import styles from './PerfilAdm.module.css';

// URL padrão para a imagem de perfil, caso não haja uma
const DEFAULT_PROFILE_IMAGE = '/assets/default-profile.png'; // Crie esta imagem em public/assets/

function PerfilAdm() {
  const navigate = useNavigate();

  const [adminInfo, setAdminInfo] = useState({
    id: 'admin_id_mock_123',
    nome: 'Administrador Mockado',
    email: 'admin.mock@civis.com.br',
    cpf: '000.000.000-00',
    telefone: '(98) 99999-0000',
    cargo: 'Administrador',
    fotoPerfil: localStorage.getItem('profileImageAdm') || DEFAULT_PROFILE_IMAGE, // Carrega a foto do localStorage ou usa a padrão
  });

  // Este useEffect é para mockar o localStorage para desenvolvimento.
  // Em um ambiente real, você buscaria os dados do usuário do backend.
  useEffect(() => {
    localStorage.setItem('token', 'mock_token_para_dev');
    localStorage.setItem('userId', adminInfo.id);
    localStorage.setItem('usuario', JSON.stringify({ type: 'admin', cargo: 'Admin' })); // Adicione 'cargo' aqui para o Navbar
    localStorage.setItem('userType', 'Admin'); // Garante que o userType está correto para o Navbar
    console.log("LocalStorage mockado para PerfilAdm e EditarPerfilAdm. userId:", adminInfo.id);
  }, [adminInfo.id]);

  // useEffect para carregar a foto de perfil se ela foi atualizada na página de edição
  // E também para buscar os dados reais do admin quando você tiver a API
  useEffect(() => {
    const fetchAdminData = async () => {
      const storedImage = localStorage.getItem('profileImageAdm');
      if (storedImage) {
        setAdminInfo(prev => ({ ...prev, fotoPerfil: storedImage }));
      }

      // ==== LÓGICA REAL DE BUSCA DE DADOS DO ADMIN (Quando você tiver o backend) ====
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      // Se não for modo mock, tente buscar os dados reais
      if (token && userId && token !== 'mock_token_para_dev') {
        try {
          const response = await fetch(`http://localhost:3001/api/funcionarios/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error('Falha ao carregar dados do administrador.');
          }
          const data = await response.json();
          setAdminInfo(prev => ({
            ...prev,
            nome: data.nome || prev.nome,
            email: data.email || prev.email,
            cpf: data.cpf || prev.cpf,
            telefone: data.telefone || prev.telefone,
            cargo: data.cargo || prev.cargo,
            // Supondo que a API também retorna o caminho da foto
            fotoPerfil: data.fotoPerfil ? `http://localhost:3001/uploads/perfil/${data.fotoPerfil}` : storedImage || DEFAULT_PROFILE_IMAGE,
          }));
          // Salva a foto no localStorage para consistência
          if (data.fotoPerfil) {
             localStorage.setItem('profileImageAdm', `http://localhost:3001/uploads/perfil/${data.fotoPerfil}`);
          }
        } catch (err) {
          console.error("Erro ao buscar dados reais do admin:", err);
          // Opcional: Tratar erro, talvez mostrar mensagem ao usuário
        }
      }
      // =================================================================================
    };
    fetchAdminData();
  }, []); // Execute apenas uma vez na montagem

  const handleEditProfile = () => {
    navigate(`/editar-perfil-adm/${adminInfo.id}`);
  };

  const handleLogout = () => {
    console.log("Usuário clicou em Sair. Limpando localStorage.");
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('usuario');
    localStorage.removeItem('userType'); // Muito Importante: Limpar o userType também!
    localStorage.removeItem('profileImageAdm'); // Limpa a foto de perfil ao sair
    alert('Você será desconectado!');
    navigate('/login');
  };

  return (
    <div className={styles.perfilAdmContainer}>
      <Navbar onLogout={handleLogout} /> {/* Não precisa mais de userType aqui, o Navbar pega do localStorage */}

      <main className={styles.perfilAdmMainContent}>
        <h1 className={styles.perfilAdmTitle}>Meu Perfil de Administrador</h1>

        {/* Círculo para a foto de perfil */}
        <div className={styles.profileImageContainer}>
          <img
            src={adminInfo.fotoPerfil}
            alt="Foto de Perfil do Administrador"
            className={styles.profileImage}
          />
        </div>

        <div className={styles.perfilAdmInfoGrid}>
          <div className={styles.perfilAdmInfoItem}>
            <span className={styles.perfilAdmInfoLabel}>Nome Completo:</span>
            <span className={styles.perfilAdmInfoValue}>{adminInfo.nome}</span>
          </div>
          <div className={styles.perfilAdmInfoItem}>
            <span className={styles.perfilAdmInfoLabel}>Email:</span>
            <span className={styles.perfilAdmInfoValue}>{adminInfo.email}</span>
          </div>
          <div className={styles.perfilAdmInfoItem}>
            <span className={styles.perfilAdmInfoLabel}>CPF:</span>
            <span className={styles.perfilAdmInfoValue}>{adminInfo.cpf}</span>
          </div>
          <div className={styles.perfilAdmInfoItem}>
            <span className={styles.perfilAdmInfoLabel}>Telefone:</span>
            <span className={styles.perfilAdmInfoValue}>{adminInfo.telefone}</span>
          </div>
          <div className={styles.perfilAdmInfoItem}>
            <span className={styles.perfilAdmInfoLabel}>Cargo:</span>
            <span className={styles.perfilAdmInfoValue}>{adminInfo.cargo}</span>
          </div>
        </div>

        <div className={styles.perfilAdmActions}>
          <button className={styles.perfilAdmButtonPrimary} onClick={handleEditProfile}>
            Editar Perfil
          </button>
        </div>
      </main>
    </div>
  );
}

export default PerfilAdm;