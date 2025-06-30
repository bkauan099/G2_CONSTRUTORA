import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Funcionarios.css'; // Importa o CSS específico para Funcionarios

function Funcionarios() { // O nome da função é Funcionarios
  const navigate = useNavigate();

  // Dados mock de funcionários (alinhados ao diagrama de classes)
  const [funcionarios, setFuncionarios] = useState(() => {
    const savedFuncionarios = localStorage.getItem('funcionariosMock');
    return savedFuncionarios ? JSON.parse(savedFuncionarios) : [
      // Dados mock com CPF e Senha, e sem Cargo/DataContratacao
      { id: 1, nome: 'Bruno Kauan', cpf: '111.222.333-44', email: 'bruno.k@civis.com', senha: 'senha123', telefone: '11987654321' },
      { id: 2, nome: 'Ellen Cristina', cpf: '222.333.444-55', email: 'ellen.c@civis.com', senha: 'senha123', telefone: '11998765432' },
      { id: 3, nome: 'Paulo Lime', cpf: '333.444.555-66', email: 'paulo.l@civis.com', senha: 'senha123', telefone: '11976543210' },
    ];
  });

  // Estado para controlar a visualização mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Efeito para atualizar o estado isMobile ao redimensionar a janela
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // useEffect para controlar a classe do body com base no checkbox (copiado de outros componentes de admin)
  useEffect(() => {
    const checkbox = document.getElementById('check');
    if (!checkbox) return;

    const handleCheckboxChange = () => {
      if (checkbox.checked) {
        document.body.classList.add('menu-aberto');
      } else {
        document.body.classList.remove('menu-aberto');
      }
    };
    checkbox.addEventListener('change', handleCheckboxChange);
    return () => {
      checkbox.removeEventListener('change', handleCheckboxChange);
    };
  }, []);

  // Salva os funcionários no localStorage sempre que o estado 'funcionarios' muda
  useEffect(() => {
    localStorage.setItem('funcionariosMock', JSON.stringify(funcionarios));
  }, [funcionarios]);

  // Função para lidar com a exclusão de um funcionário
  const handleExcluir = (id, nome) => {
    if (window.confirm(`Tem certeza que deseja excluir o funcionário(a) ${nome}?`)) {
      const novosFuncionarios = funcionarios.filter(func => func.id !== id);
      setFuncionarios(novosFuncionarios);
      alert(`Funcionário(a) ${nome} excluído(a) com sucesso!`);
    }
  };

  // Função de logout para o navbar (copiado de outros componentes de admin)
  const handleLogout = () => {
    alert('Usuário deslogado!'); // Apenas um alerta de exemplo
    navigate('/login');
  };

  return (
    <body> {/* Body é filho direto do root */}
      <header className="header"> {/* Usa a classe global de navbar */}
        <div className="logo">
           <a href="#" onClick={() => navigate("/home")}>
            <img src="src\pages\HomeAdm\logo.png" alt="Logo CIVIS" />
          </a>
        </div>
        <input type="checkbox" id="check" /> {/* input#check sem style para JS controlar */}
        <label htmlFor="check" className="icons">
            <i className='bx bx-menu' id="icone-menu"></i>
            <i className='bx bx-x' id="fechar-menu"></i>
        </label>
        <nav className="navbar"> {/* Usa a classe global de navbar */}
            <a href="#" onClick={() => navigate("/home")}>Início</a>
            <a href="#" onClick={() => navigate("/nova-vistoria")}>Nova Vistoria</a> 
            <a href="#" onClick={() => navigate("/vistorias-agendadas")}>Vistorias Agendadas</a>
            <a href="#" onClick={() => navigate("/clientes")}>Clientes</a> 
            <a href="#" onClick={() => navigate("/empreendimentos")}>Empreendimentos</a> 
            <a href="#" onClick={() => navigate("/funcionarios")}>Funcionários</a>
            <a href="#" className="logout" onClick={handleLogout}>Sair</a>
        </nav>
      </header>

      <div className="container-main"> {/* Usa a classe global de container */}
        <main className="admin-list-content"> {/* Classe de conteúdo de listagem */}
          <div className="admin-header"> {/* Cabeçalho da seção */}
            <h1>Gestão de <span>Funcionários</span></h1> {/* Título consistente com outros admin pages */}
         
          </div>

          {funcionarios.length === 0 ? (
            <p className="no-data-message">Nenhum funcionário cadastrado.</p> 
          ) : (
            <table className="lista-tabela"> {/* Tabela (classe global com responsividade via CSS específico) */}
              <thead>
                <tr>
                  <th>ID Interno</th>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Email</th>
                  <th>Telefone</th>
                  <th>Senha</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {funcionarios.map(func => (
                  <tr key={func.id}>
                    {/* ATRIBUTOS data-label SÃO CRUCIAIS PARA A RESPONSIVIDADE DA TABELA */}
                    <td data-label="ID Interno">{func.id}</td>
                    <td data-label="Nome">{func.nome}</td>
                    <td data-label="CPF">{func.cpf}</td>
                    <td data-label="Email">{func.email}</td>
                    <td data-label="Telefone">{func.telefone}</td>
                    <td data-label="Senha">{func.senha}</td>
                    <td data-label="Ações" className="acoes-botoes"> {/* data-label para Ações */}
                      <button className="btn-editar" onClick={() => navigate(`/editar-funcionario/${func.id}`)}>
                        Editar
                      </button>
                      <button className="btn-excluir" onClick={() => handleExcluir(func.id, func.nome)}>
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
      </div>

      {/* ADICIONADO: Botão "Adicionar Funcionário" fixo na parte inferior */}
      <button className="admin-action-button-fixed" onClick={() => navigate('/cadastrar-funcionario')}>
        + Adicionar Funcionário
      </button>
    </body>
  );
}

export default Funcionarios;