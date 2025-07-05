// src/pages/HomeCliente/Perfil/EditarPerfilCliente.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// REMOVIDO: import Navbar from '../../../components/Navbar/Navbar'; // Removido o import do Navbar genérico
import styles from './EditarPerfilCliente.module.css'; // Importa o CSS Module para este componente

function EditarPerfilCliente() {
  const navigate = useNavigate();
  const { id } = useParams(); // Hook para pegar parâmetros da URL, se houver (e.g., ID do cliente)
  const fileInputRef = useRef(null); // Ref para o input de arquivo (para poder "clicá-lo" via botão customizado)

  // Estado para armazenar os dados do formulário de edição
  const [formData, setFormData] = useState({
    nome: 'Cliente Exemplo',
    cpf: '111.222.333-44',
    telefone: '(99) 98765-4321',
    email: 'cliente@example.com',
    senha: '', // Campo para nova senha
    confirmarSenha: '', // Campo para confirmar a nova senha
  });

  // Estado para armazenar a URL da imagem de perfil (para exibição)
  const [profileImage, setProfileImage] = useState(null); // Inicializado como null
  // Estado para armazenar o arquivo de imagem selecionado (para envio ao backend)
  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(false); // Estado para indicar se a operação está carregando
  const [error, setError] = useState(null); // Estado para armazenar mensagens de erro

  // Efeito para simular o carregamento dos dados atuais do cliente (mockados)
  useEffect(() => {
    console.log("Editando perfil do cliente com ID:", id);
    // Se houvesse uma imagem de perfil já salva, você a carregaria aqui:
    // setProfileImage(dadosDoBackend.profileImage || null);
  }, [id]); // O efeito roda quando o ID muda

  // Handler genérico para atualizar o estado do formulário conforme o usuário digita
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Lógica para mascarar o CPF
    if (name === 'cpf') {
      const raw = value.replace(/\D/g, ''); // Remove tudo que não é dígito
      const masked = raw
        .replace(/^(\d{3})(\d)/, '$1.$2')
        .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4')
        .slice(0, 14); // Limita ao tamanho do CPF formatado
      setFormData({ ...formData, cpf: masked });
    }
    // Lógica para mascarar o telefone
    else if (name === 'telefone') {
      const raw = value.replace(/\D/g, ''); // Remove tudo que não é dígito
      const masked = raw
        .replace(/^(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .slice(0, 15); // Limita ao tamanho do telefone formatado
      setFormData({ ...formData, telefone: masked });
    }
    // Para outros campos, atualiza diretamente o estado
    else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handler para lidar com a seleção de uma nova imagem de perfil
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Pega o primeiro arquivo selecionado
    if (file) {
      setSelectedFile(file); // Armazena o arquivo para ser enviado depois
      const reader = new FileReader(); // Cria um leitor de arquivos
      reader.onloadend = () => {
        setProfileImage(reader.result); // Define a imagem de preview com a URL base64 do arquivo
      };
      reader.readAsDataURL(file); // Lê o arquivo como uma URL de dados
    } else {
      setSelectedFile(null); // Limpa o arquivo selecionado
      setProfileImage(null); // Volta para null se nenhum arquivo for selecionado
    }
  };

  // Handler para simular o clique no input de arquivo escondido
  const handleImageUploadClick = () => {
    fileInputRef.current.click(); // Dispara o clique no input real
  };

  // Handler para submeter o formulário
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página

    // Validação de senhas
    if (formData.senha && formData.senha !== formData.confirmarSenha) {
      alert('As senhas não coincidem!');
      return;
    }

    // Lógica para submeter o formulário (requisição PUT para o backend)
    setLoading(true); // Ativa o estado de carregamento
    setError(null); // Limpa qualquer erro anterior
    try {
      // Simula um atraso de rede de 1 segundo
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log("Dados a serem enviados:", formData);
      if (selectedFile) {
        console.log("Arquivo de imagem a ser enviado:", selectedFile.name);
        // Em um cenário real, você criaria um FormData para enviar o arquivo:
        // const data = new FormData();
        // data.append('profileImage', selectedFile);
        // data.append('nome', formData.nome);
        // ... e enviaria via fetch/axios para o backend.
      }

      alert('Perfil atualizado com sucesso!');
      navigate('/perfil-cliente'); // Redireciona de volta para a página de perfil
    } catch (err) {
      setError('Erro ao atualizar perfil: ' + err.message); // Define a mensagem de erro
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  // Função para lidar com o logout
  const handleLogout = () => {
    // Limpar tokens ou informações de usuário do localStorage ao sair
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('usuario');
    navigate("/login"); // Redireciona para a tela de login
  };

  // Renderização condicional: se estiver carregando, mostra uma mensagem
  if (loading) {
    return (
      <div className={styles.editPerfilClienteContainer}>
        {/* Navbar do Cliente - Reimplementado diretamente aqui */}
        <header className={styles.editPerfilClienteNavbar}>
          <div className={styles.editPerfilClienteLogo}>CIVIS (Cliente)</div>
          <nav className={styles.editPerfilClienteNavLinks}>
            <a href="#" onClick={() => navigate('/home-cliente')}>Home</a>
            <a href="#" onClick={() => navigate('/perfil-cliente')}>Perfil</a>
          </nav>
          <button className={styles.editPerfilClienteLogoutButton} onClick={handleLogout}>
            Sair
          </button>
        </header>
        {/* Fim do Navbar do Cliente */}
        <main className={styles.editPerfilClienteMainContent}>
          <h1 className={styles.editPerfilClienteTitle}>Carregando dados para edição...</h1>
          <p className={styles.editPerfilClienteLoadingText}>Por favor, aguarde.</p>
        </main>
      </div>
    );
  }

  // Renderização condicional: se houver erro, mostra a mensagem de erro
  if (error) {
    return (
      <div className={styles.editPerfilClienteContainer}>
        {/* Navbar do Cliente - Reimplementado diretamente aqui */}
        <header className={styles.editPerfilClienteNavbar}>
          <div className={styles.editPerfilClienteLogo}>CIVIS (Cliente)</div>
          <nav className={styles.editPerfilClienteNavLinks}>
            <a href="#" onClick={() => navigate('/home-cliente')}>Home</a>
            <a href="#" onClick={() => navigate('/perfil-cliente')}>Perfil</a>
          </nav>
          <button className={styles.editPerfilClienteLogoutButton} onClick={handleLogout}>
            Sair
          </button>
        </header>
        {/* Fim do Navbar do Cliente */}
        <main className={styles.editPerfilClienteMainContent}>
          <h1 className={styles.editPerfilClienteTitle} style={{color: 'var(--edit-perfil-cliente-error-color)'}}>Erro na Edição</h1>
          <p className={styles.editPerfilClienteErrorText}>{error}</p>
          <button className={styles.editPerfilClienteButtonPrimary} onClick={() => navigate('/perfil-cliente')}>
            Voltar para Perfil
          </button>
          <button className={styles.editPerfilClienteButtonSecondary} onClick={() => navigate('/login')} style={{marginTop: 'var(--edit-perfil-cliente-spacing-sm)'}}>
            Voltar ao Login
          </button>
        </main>
      </div>
    );
  }

  // Renderização principal do formulário de edição
  return (
    <div className={styles.editPerfilClienteContainer}>
      {/* Navbar do Cliente - Reimplementado diretamente aqui */}
      <header className={styles.editPerfilClienteNavbar}>
        <div className={styles.editPerfilClienteLogo}>CIVIS (Cliente)</div>
        <nav className={styles.editPerfilClienteNavLinks}>
          <a href="#" onClick={() => navigate('/home-cliente')}>Home</a>
          <a href="#" onClick={() => navigate('/perfil-cliente')}>Perfil</a>
        </nav>
        <button className={styles.editPerfilClienteLogoutButton} onClick={handleLogout}>
          Sair
        </button>
      </header>
      {/* Fim do Navbar do Cliente */}

      <main className={styles.editPerfilClienteMainContent}>
        {/* Botão de voltar */}
        <button className={styles.editPerfilClienteBackButton} onClick={() => navigate('/perfil-cliente')}>
          &#8592; Voltar
        </button>
        <h1 className={styles.editPerfilClienteTitle}>Editar Meu Perfil</h1>

        {/* Seção de Upload de Foto de Perfil */}
        <div className={styles.profileImageUploadSection}>
          <div className={styles.profileImageContainer}>
            <img
              src={profileImage || ''} // src será vazio se profileImage for null
              alt="Foto de Perfil"
              className={styles.profileImage}
            />
            {/* Adicione um placeholder visual se não houver imagem */}
            {!profileImage && (
              <span className={styles.noPhotoPlaceholder}>
                Adicionar Foto
              </span>
            )}
          </div>
          {/* Input de arquivo real, mas escondido */}
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }} // Esconde o input de arquivo original
            onChange={handleImageChange}
            accept="image/*" // Aceita apenas arquivos de imagem
          />
          {/* Botão customizado para disparar o input de arquivo */}
          <button
            type="button"
            className={styles.uploadButton}
            onClick={handleImageUploadClick}
          >
            {selectedFile ? 'Trocar Imagem' : 'Anexar/Alterar Foto'} {/* Texto dinâmico do botão */}
          </button>
          {/* Exibe o nome do arquivo selecionado, se houver */}
          {selectedFile && <span className={styles.fileName}>{selectedFile.name}</span>}
        </div>
        {/* Fim da Seção de Upload de Foto de Perfil */}

        {/* Formulário de edição de dados */}
        <form onSubmit={handleSubmit} className={styles.editPerfilClienteForm}>
          <div className={styles.editPerfilClienteFormGroup}>
            <label htmlFor="nome">Nome Completo:</label>
            <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
          </div>
          <div className={styles.editPerfilClienteFormGroup}>
            <label htmlFor="cpf">CPF:</label>
            {/* CPF desabilitado, pois geralmente não é editável */}
            <input type="text" id="cpf" name="cpf" value={formData.cpf} onChange={handleChange} required disabled={true} />
          </div>
          <div className={styles.editPerfilClienteFormGroup}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className={styles.editPerfilClienteFormGroup}>
            <label htmlFor="senha">Nova Senha:</label>
            <input type="password" id="senha" name="senha" value={formData.senha} onChange={handleChange} placeholder="Deixe em branco para manter a senha atual" />
          </div>
          <div className={styles.editPerfilClienteFormGroup}>
            <label htmlFor="confirmarSenha">Confirmar Nova Senha:</label>
            <input type="password" id="confirmarSenha" name="confirmarSenha" value={formData.confirmarSenha} onChange={handleChange} />
          </div>
          <div className={styles.editPerfilClienteFormGroup}>
            <label htmlFor="telefone">Telefone:</label>
            <input type="text" id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} />
          </div>

          {/* Botões de ação do formulário */}
          <div className={styles.editPerfilClienteFormActions}>
            <button type="button" className={styles.editPerfilClienteButtonSecondary} onClick={() => navigate('/perfil-cliente')}>
              Cancelar
            </button>
            <button type="submit" className={styles.editPerfilClienteButtonPrimary}>
              Salvar Alterações
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default EditarPerfilCliente;