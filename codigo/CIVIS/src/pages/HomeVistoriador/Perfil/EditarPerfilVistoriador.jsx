// src/pages/HomeVistoriador/Perfil/EditarPerfilVistoriador.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// Se você tiver um componente Navbar genérico para Vistoriador, importe-o aqui
// import NavbarVistoriador from '../../../components/Navbar/NavbarVistoriador';
import styles from './EditarPerfilVistoriador.module.css'; // Importa o CSS Module para este componente

const DEFAULT_PROFILE_IMAGE = '/assets/default-profile.png'; // Caminho para uma imagem de perfil padrão

function EditarPerfilVistoriador() {
  const navigate = useNavigate();
  const { id } = useParams(); // Pega o ID da URL se a rota for tipo /vistoriador/editar-perfil-vistoriador/:id
  const fileInputRef = useRef(null); // Ref para o input de arquivo (para poder "clicá-lo" via botão customizado)

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    confirmarSenha: '',
    telefone: '',
    cargo: 'Vistoriador', // Cargo fixo para vistoriador
    fotoPerfil: DEFAULT_PROFILE_IMAGE, // Adiciona a foto de perfil ao estado
  });

  const [selectedFile, setSelectedFile] = useState(null); // Estado para o arquivo selecionado
  const [imagePreview, setImagePreview] = useState(DEFAULT_PROFILE_IMAGE); // Estado para a prévia da imagem

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchVistoriadorData() {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('token');
        // userId é o ID do usuário logado, id é o ID da URL (que deve ser o mesmo do userId para edição do próprio perfil)
        const userData = JSON.parse(localStorage.getItem('usuario'));
        const userId = userData ? userData.userId : null;
        const idToFetch = id; // ID vindo da URL

        // Tenta carregar a imagem existente do localStorage primeiro
        const storedImage = localStorage.getItem('profileImageVistoriador'); // Chave específica para vistoriador
        if (storedImage) {
          setImagePreview(storedImage);
          setFormData(prev => ({ ...prev, fotoPerfil: storedImage }));
        }

        // ============ LÓGICA TEMPORÁRIA PARA AMBIENTE DE DESENVOLVIMENTO/MOCK ============
        if (!token || !userId || !idToFetch || token === 'mock_token_para_dev') {
          console.warn("Modo de desenvolvimento: Carregando dados mockados para EditarPerfilVistoriador.");

          // Se o ID da URL não corresponde ao ID do usuário logado (mockado), redireciona
          if (idToFetch !== userId && idToFetch !== '1') { // Assume '1' como um ID mockado válido
            alert('Acesso negado: ID na URL não corresponde ao usuário logado. Redirecionando...');
            navigate('/perfil-vistoriador'); // Redireciona para o perfil do vistoriador
            return;
          }

          await new Promise(resolve => setTimeout(resolve, 500)); // Simula atraso da rede

          setFormData(prev => ({
            ...prev, // Mantém a fotoPerfil já carregada do localStorage ou a padrão
            nome: 'Vistoriador Mockado',
            cpf: '555.444.333-22',
            email: 'vistoriador.mock@civis.com.br',
            senha: '',
            confirmarSenha: '',
            telefone: '(99) 91234-5678',
            cargo: 'Vistoriador',
          }));
          setLoading(false);
          return;
        }
        // ============ FIM DA LÓGICA TEMPORÁRIA ============


        // *** O CÓDIGO ABAIXO SERÁ EXECUTADO APENAS SE VOCÊ TIVER UM TOKEN E userId REAIS (NÃO MOCKADOS) ***

        if (idToFetch !== userId) { // Garante que apenas o próprio usuário pode editar seu perfil
          alert('Acesso negado: Você não pode editar este perfil.');
          navigate('/perfil-vistoriador');
          return;
        }

        // Mude a URL da API para o endpoint de Vistoriadores
        const response = await fetch(`http://localhost:3001/api/vistoriadores/${idToFetch}`, {
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
            localStorage.removeItem('profileImageVistoriador'); // Limpa foto específica
            navigate('/login');
            return;
          }
          const errorData = await response.json();
          throw new Error(errorData.error || 'Erro ao carregar dados para edição.');
        }

        const data = await response.json();

        if (!data || data.cargo !== 'Vistoriador') { // Verifica se o cargo é Vistoriador
          alert('Perfil não encontrado ou tipo de usuário inválido para edição.');
          navigate('/perfil-vistoriador');
          return;
        }

        // Constrói a URL completa da foto de perfil se existir
        const fotoUrl = data.fotoPerfil ? `http://localhost:3001/uploads/perfil/${data.fotoPerfil}` : storedImage || DEFAULT_PROFILE_IMAGE;

        setFormData({
          nome: data.nome || '',
          cpf: data.cpf || '',
          email: data.email || '',
          senha: '',
          confirmarSenha: '',
          telefone: data.telefone || '',
          cargo: data.cargo || 'Vistoriador', // Garante que o cargo seja 'Vistoriador'
          fotoPerfil: fotoUrl,
        });
        setImagePreview(fotoUrl); // Define a prévia da imagem para a imagem carregada
        localStorage.setItem('profileImageVistoriador', fotoUrl); // Atualiza localStorage com a foto real

      } catch (err) {
        console.error('Erro ao buscar dados do vistoriador para edição:', err);
        setError('Não foi possível carregar os dados para edição: ' + err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchVistoriadorData();
  }, [id, navigate]); // Adiciona 'navigate' às dependências do useEffect

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

  // Handler para lidar com a seleção de uma nova imagem de perfil
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
      // Se nenhum arquivo for selecionado, volta para a foto atual no formData ou a padrão
      setImagePreview(formData.fotoPerfil || DEFAULT_PROFILE_IMAGE);
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
      const userData = JSON.parse(localStorage.getItem('usuario'));
      const userId = userData ? userData.userId : null;
      const idToUpdate = id;

      // ============ LÓGICA TEMPORÁRIA PARA AMBIENTE DE DESENVOLVIMENTO/MOCK ============
      if (!token || !userId || !idToUpdate || token === 'mock_token_para_dev') {
        console.warn("Modo de desenvolvimento: Simulação de salvamento de dados (não persistente).");
        await new Promise(resolve => setTimeout(resolve, 500));

        if (selectedFile) {
          const mockImageUrl = URL.createObjectURL(selectedFile);
          localStorage.setItem('profileImageVistoriador', mockImageUrl); // Salva a prévia como "nova foto"
        }
        alert('Perfil mockado atualizado com sucesso (não persistente)!');
        setLoading(false);
        navigate('/perfil-vistoriador');
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

        // Mude a URL da API para o endpoint de Vistoriadores
      const response = await fetch(`http://localhost:3001/api/vistoriadores/${idToUpdate}`, {
        method: 'PUT',
        headers: {
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
        localStorage.setItem('profileImageVistoriador', newFotoUrl); // Salva a nova URL da foto
      } else if (selectedFile) { // Se o backend não retornar uma nova URL, mas um arquivo foi selecionado, usa a prévia
        localStorage.setItem('profileImageVistoriador', imagePreview);
      }

      alert('Perfil atualizado com sucesso!');
      navigate('/perfil-vistoriador'); // Volta para a página de perfil do vistoriador
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
    localStorage.removeItem('profileImageVistoriador'); // Limpa foto específica
    navigate("/login");
  };

  // Links de navegação do Navbar para o EditarPerfilVistoriador
  // Se você tiver um componente Navbar genérico para Vistoriador, use-o como no EditarPerfilAdm
  // Caso contrário, mantenha esta seção de links dentro do componente.
  const vistoriadorNavLinks = (
    <nav className={styles.editPerfilVistoriadorNavLinks}>
      <a href="#" onClick={() => navigate("/home")}>Home</a> {/* Ajustado para rota geral /home */}
      <a href="#" onClick={() => navigate("/vistoriador/realizar-vistoria")}>Minhas Vistorias</a> {/* Rota correta */}
      <a href="#" onClick={() => navigate("/perfil-vistoriador")}>Perfil</a> {/* Rota para o perfil */}
    </nav>
  );

  // Renderização condicional para estados de carregamento/erro
  if (loading) {
    return (
      <div className={styles.editPerfilVistoriadorContainer}>
        <header className={styles.editPerfilVistoriadorNavbar}>
          <div className={styles.editPerfilVistoriadorLogo}>CIVIS (Vistoriador)</div>
          {vistoriadorNavLinks}
          <button className={styles.editPerfilVistoriadorLogoutButton} onClick={handleLogout}>Sair</button>
        </header>
        <main className={styles.editPerfilVistoriadorMainContent}>
          <h1 className={styles.editPerfilVistoriadorTitle}>Carregando dados para edição...</h1>
          <p className={styles.editPerfilVistoriadorLoadingText}>Por favor, aguarde.</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.editPerfilVistoriadorContainer}>
        <header className={styles.editPerfilVistoriadorNavbar}>
          <div className={styles.editPerfilVistoriadorLogo}>CIVIS (Vistoriador)</div>
          {vistoriadorNavLinks}
          <button className={styles.editPerfilVistoriadorLogoutButton} onClick={handleLogout}>Sair</button>
        </header>
        <main className={styles.editPerfilVistoriadorMainContent}>
          <h1 className={styles.editPerfilVistoriadorTitle} style={{color: 'var(--edit-perfil-vistoriador-error-color)'}}>Erro na Edição</h1>
          <p className={styles.editPerfilVistoriadorErrorText}>{error}</p>
          <button className={styles.editPerfilVistoriadorButtonPrimary} onClick={() => navigate('/perfil-vistoriador')}>
            Voltar para Perfil
          </button>
          <button className={styles.editPerfilVistoriadorButtonSecondary} onClick={() => navigate('/login')} style={{marginTop: 'var(--edit-perfil-vistoriador-spacing-sm)'}}>
            Voltar ao Login
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.editPerfilVistoriadorContainer}>
      {/* Se você usar um Navbar genérico, descomente a linha abaixo e remova o <header> manual */}
      {/* <NavbarVistoriador onLogout={handleLogout} /> */}
      <header className={styles.editPerfilVistoriadorNavbar}>
        <div className={styles.editPerfilVistoriadorLogo}>CIVIS (Vistoriador)</div>
        {vistoriadorNavLinks}
        <button className={styles.editPerfilVistoriadorLogoutButton} onClick={handleLogout}>
          Sair
        </button>
      </header>

      <main className={styles.editPerfilVistoriadorMainContent}>
        <button className={styles.editPerfilVistoriadorBackButton} onClick={() => navigate('/perfil-vistoriador')}>
          &#8592; Voltar
        </button>
        <h1 className={styles.editPerfilVistoriadorTitle}>Editar Meu Perfil</h1>

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

        <form onSubmit={handleSubmit} className={styles.editPerfilVistoriadorForm}>
          <div className={styles.editPerfilVistoriadorFormGroup}>
            <label htmlFor="nome">Nome Completo:</label>
            <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
          </div>
          <div className={styles.editPerfilVistoriadorFormGroup}>
            <label htmlFor="cpf">CPF:</label>
            <input type="text" id="cpf" name="cpf" value={formData.cpf} onChange={handleChange} required disabled={true} /> {/* CPF geralmente não é editável */}
          </div>
          <div className={styles.editPerfilVistoriadorFormGroup}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className={styles.editPerfilVistoriadorFormGroup}>
            <label htmlFor="senha">Nova Senha:</label>
            <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} placeholder="Deixe em branco para manter a senha atual" />
          </div>
          <div className={styles.editPerfilVistoriadorFormGroup}>
            <label htmlFor="confirmarSenha">Confirmar Nova Senha:</label>
            <input type="password" id="confirmarSenha" name="confirmarSenha" value={formData.confirmarSenha} onChange={handleChange} />
          </div>
          <div className={styles.editPerfilVistoriadorFormGroup}>
            <label htmlFor="telefone">Telefone:</label>
            <input type="text" id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} />
          </div>
          <div className={styles.editPerfilVistoriadorFormGroup}>
            <label htmlFor="cargo">Cargo:</label>
            <input type="text" id="cargo" name="cargo" value={formData.cargo} disabled={true} /> {/* Cargo fixo, não editável */}
          </div>

          <div className={styles.editPerfilVistoriadorFormActions}>
            <button type="button" className={styles.editPerfilVistoriadorButtonSecondary} onClick={() => navigate('/perfil-vistoriador')}>
              Cancelar
            </button>
            <button type="submit" className={styles.editPerfilVistoriadorButtonPrimary}>
              Salvar Alterações
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default EditarPerfilVistoriador;