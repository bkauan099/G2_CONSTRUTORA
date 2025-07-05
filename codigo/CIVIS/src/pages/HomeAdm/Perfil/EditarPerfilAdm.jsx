// src/pages/HomeAdm/Perfil/EditarPerfilAdm.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import styles from './EditarPerfilAdm.module.css';

const DEFAULT_PROFILE_IMAGE = '/assets/default-profile.png'; // Mesma URL padrão

function EditarPerfilAdm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: '',
    cargo: '',
    fotoPerfil: DEFAULT_PROFILE_IMAGE, // Adiciona a foto de perfil ao estado
  });
  const [selectedFile, setSelectedFile] = useState(null); // Estado para o arquivo selecionado
  const [imagePreview, setImagePreview] = useState(DEFAULT_PROFILE_IMAGE); // Estado para a prévia da imagem

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAdminData() {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const idToFetch = id;

        // Tenta carregar a imagem existente do localStorage primeiro
        const storedImage = localStorage.getItem('profileImageAdm');
        if (storedImage) {
          setImagePreview(storedImage);
          setFormData(prev => ({ ...prev, fotoPerfil: storedImage }));
        }

        // ============ LÓGICA TEMPORÁRIA PARA AMBIENTE DE DESENVOLVIMENTO/MOCK ============
        if (!token || !userId || !idToFetch || token === 'mock_token_para_dev') {
          console.warn("Modo de desenvolvimento: Carregando dados mockados para EditarPerfilAdm.");

          if (idToFetch !== userId) {
            alert('Acesso negado: ID na URL não corresponde ao usuário logado. Redirecionando...');
            navigate('/perfil-adm');
            return;
          }

          await new Promise(resolve => setTimeout(resolve, 500));

          setFormData(prev => ({
            ...prev, // Mantém a fotoPerfil já carregada do localStorage ou a padrão
            nome: 'Administrador Mockado',
            cpf: '000.000.000-00',
            email: 'admin.mock@civis.com.br',
            senha: '',
            confirmarSenha: '',
            telefone: '(98) 99999-0000',
            cargo: 'Administrador',
          }));
          setLoading(false);
          return;
        }
        // ============ FIM DA LÓGICA TEMPORÁRIA ============


        // *** O CÓDIGO ABAIXO SERÁ EXECUTADO APENAS SE VOCÊ TIVER UM TOKEN E userId REAIS (NÃO MOCKADOS) ***

        if (idToFetch !== userId) {
          alert('Acesso negado: Você não pode editar este perfil.');
          navigate('/perfil-adm');
          return;
        }

        const response = await fetch(`http://localhost:3001/api/funcionarios/${idToFetch}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            alert('Acesso não autorizado ou sessão expirada. Redirecionando para o login.');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('usuario');
            localStorage.removeItem('userType'); // Limpa userType
            localStorage.removeItem('profileImageAdm'); // Limpa foto
            navigate('/login');
            return;
          }
          const errorData = await response.json();
          throw new Error(errorData.error || 'Erro ao carregar dados para edição.');
        }

        const data = await response.json();

        if (!data || data.cargo !== 'Administrador') {
          alert('Perfil não encontrado ou tipo de usuário inválido para edição.');
          navigate('/perfil-adm');
          return;
        }

        const fotoUrl = data.fotoPerfil ? `http://localhost:3001/uploads/perfil/${data.fotoPerfil}` : storedImage || DEFAULT_PROFILE_IMAGE;

        setFormData({
          nome: data.nome || '',
          cpf: data.cpf || '',
          email: data.email || '',
          senha: '',
          confirmarSenha: '',
          telefone: data.telefone || '',
          cargo: data.cargo || '',
          fotoPerfil: fotoUrl,
        });
        setImagePreview(fotoUrl); // Define a prévia da imagem para a imagem carregada
        localStorage.setItem('profileImageAdm', fotoUrl); // Atualiza localStorage com a foto real

      } catch (err) {
        console.error('Erro ao buscar dados do administrador para edição:', err);
        setError('Não foi possível carregar os dados para edição: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchAdminData();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'cpf') {
      const raw = value.replace(/\D/g, '');
      const masked = raw
        .replace(/^(\d{3})(\d)/, '$1.$2')
        .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
        .slice(0, 14);
      setFormData({ ...formData, cpf: masked });
    } else if (name === 'telefone') {
      const raw = value.replace(/\D/g, '');
      const masked = raw
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .slice(0, 15);
      setFormData({ ...formData, telefone: masked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Cria uma URL temporária para pré-visualização
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setImagePreview(formData.fotoPerfil || DEFAULT_PROFILE_IMAGE); // Volta para a foto atual ou padrão
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha && formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const idToUpdate = id;

      // ============ LÓGICA TEMPORÁRIA PARA AMBIENTE DE DESENVOLVIMENTO/MOCK ============
      if (!token || !userId || !idToUpdate || token === 'mock_token_para_dev') {
        console.warn("Modo de desenvolvimento: Simulação de salvamento de dados (não persistente).");
        await new Promise(resolve => setTimeout(resolve, 500));

        // Se uma nova foto foi selecionada em modo mock, simula o salvamento
        if (selectedFile) {
          const mockImageUrl = URL.createObjectURL(selectedFile);
          localStorage.setItem('profileImageAdm', mockImageUrl); // Salva a prévia como "nova foto"
          setFormData(prev => ({ ...prev, fotoPerfil: mockImageUrl })); // Atualiza o estado
        }

        alert('Perfil mockado atualizado com sucesso (não persistente)!');
        setLoading(false);
        navigate('/perfil-adm');
        return;
      }
      // ============ FIM DA LÓGICA TEMPORÁRIA ============


      // Preparar os dados para envio
      const dataToSubmit = new FormData(); // Usar FormData para envio de arquivos
      dataToSubmit.append('nome', formData.nome);
      dataToSubmit.append('cpf', formData.cpf);
      dataToSubmit.append('email', formData.email);
      dataToSubmit.append('telefone', formData.telefone);
      dataToSubmit.append('cargo', formData.cargo);

      if (formData.senha) {
        dataToSubmit.append('senha', formData.senha);
      }
      if (selectedFile) {
        dataToSubmit.append('fotoPerfil', selectedFile); // Anexa o arquivo da imagem
      }

      const response = await fetch(`http://localhost:3001/api/funcionarios/${idToUpdate}`, {
        method: 'PUT',
        headers: {
          // Não defina 'Content-Type': 'application/json' quando usar FormData
          // O navegador fará isso automaticamente com o boundary correto.
          'Authorization': `Bearer ${token}`,
        },
        body: dataToSubmit, // Envia o FormData
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erro ao atualizar perfil.');
      }

      const updatedData = await response.json(); // Se o backend retornar os dados atualizados
      if (updatedData.fotoPerfil) {
        const newFotoUrl = `http://localhost:3001/uploads/perfil/${updatedData.fotoPerfil}`;
        localStorage.setItem('profileImageAdm', newFotoUrl); // Salva a nova URL da foto no localStorage
      } else if (selectedFile) { // Se o backend não retornar, mas um arquivo foi selecionado, use a prévia
         localStorage.setItem('profileImageAdm', imagePreview);
      }


      alert('Perfil atualizado com sucesso!');
      navigate('/perfil-adm');
    } catch (err) {
      console.error('Erro ao atualizar perfil:', err);
      setError('Erro ao atualizar perfil. Tente novamente mais tarde: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('usuario');
    localStorage.removeItem('userType'); // Limpa userType
    localStorage.removeItem('profileImageAdm'); // Limpa foto
    navigate("/login");
  };

  return (
    <div className={styles.editPerfilAdmContainer}>
      <Navbar onLogout={handleLogout} />

      <main className={styles.editPerfilAdmMainContent}>
        <button className={styles.editPerfilAdmBackButton} onClick={() => navigate('/perfil-adm')}>
          &#8592; Voltar
        </button>
        <h1 className={styles.editPerfilAdmTitle}>Editar Perfil do Administrador</h1>

        {/* Seção de Edição de Foto de Perfil */}
        <div className={styles.profileImageUploadSection}>
          <div className={styles.profileImageContainer}>
            <img
              src={imagePreview}
              alt="Prévia da Foto de Perfil"
              className={styles.profileImage}
            />
          </div>
          <label htmlFor="file-upload" className={styles.uploadButton}>
            Anexar/Alterar Foto
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }} // Esconde o input original
            />
          </label>
          {selectedFile && <p className={styles.fileName}>{selectedFile.name}</p>}
        </div>


        <form onSubmit={handleSubmit} className={styles.editPerfilAdmForm}>
          <div className={styles.editPerfilAdmFormGroup}>
            <label htmlFor="nome">Nome Completo:</label>
            <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
          </div>
          <div className={styles.editPerfilAdmFormGroup}>
            <label htmlFor="cpf">CPF:</label>
            <input type="text" id="cpf" name="cpf" value={formData.cpf} onChange={handleChange} required disabled={true} />
          </div>
          <div className={styles.editPerfilAdmFormGroup}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className={styles.editPerfilAdmFormGroup}>
            <label htmlFor="senha">Nova Senha:</label>
            <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} placeholder="Deixe em branco para manter a senha atual" />
          </div>
          <div className={styles.editPerfilAdmFormGroup}>
            <label htmlFor="confirmarSenha">Confirmar Nova Senha:</label>
            <input type="password" id="confirmarSenha" name="confirmarSenha" value={formData.confirmarSenha} onChange={handleChange} />
          </div>
          <div className={styles.editPerfilAdmFormGroup}>
            <label htmlFor="telefone">Telefone:</label>
            <input type="text" id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} />
          </div>
          <div className={styles.editPerfilAdmFormGroup}>
            <label htmlFor="cargo">Cargo:</label>
            <select id="cargo" name="cargo" value={formData.cargo} onChange={handleChange} required disabled={true}>
              <option value="Administrador">Administrador</option>
              <option value="Vistoriador">Vistoriador</option>
            </select>
          </div>

          <div className={styles.editPerfilAdmFormActions}>
            <button type="button" className={styles.editPerfilAdmButtonSecondary} onClick={() => navigate('/perfil-adm')}>
              Cancelar
            </button>
            <button type="submit" className={styles.editPerfilAdmButtonPrimary}>
              Salvar Alterações
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default EditarPerfilAdm;