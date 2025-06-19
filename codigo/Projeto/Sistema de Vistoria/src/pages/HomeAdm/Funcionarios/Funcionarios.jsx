import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './funcionarios.css'; // Ajuste o caminho se seu home.css estiver em outro lugar

function Funcionarios() { // O nome da função é Funcionarios
  const navigate = useNavigate();

  // só uma simulação dos dados:
  const [funcionarios, setFuncionarios] = useState(() => {
    const savedFuncionarios = localStorage.getItem('funcionariosMock');
    return savedFuncionarios ? JSON.parse(savedFuncionarios) : [
      { id: 1, nome: 'Bruno Kauan', cargo: 'Administrador', email: 'bruno.k@civis.com', telefone: '11987654321', dataContratacao: '2020-01-15' },
      { id: 2, nome: 'Ellen Cristina', cargo: 'Engenheira', email: 'ellen.c@civis.com', telefone: '11998765432', dataContratacao: '2021-03-01' },
      { id: 3, nome: 'Pedro Lime', cargo: 'Vistoriador Senior', email: 'paulo.l@civis.com', telefone: '11976543210', dataContratacao: '2022-06-20' },
    ];
  });

  // Salva os funcionários no localStorage sempre que o estado 'funcionarios' muda
  useEffect(() => {
    localStorage.setItem('funcionariosMock', JSON.stringify(funcionarios));
  }, [funcionarios]);

  // Função para lidar com a exclusão de um funcionário
  const handleExcluir = (id, nome) => {
    if (window.confirm(`Tem certeza que deseja excluir o funcionário(a) ${nome}?`)) {
      // Simula a exclusão removendo do array no estado local
      const novosFuncionarios = funcionarios.filter(func => func.id !== id);
      setFuncionarios(novosFuncionarios); // Atualiza o estado, o que por sua vez salva no localStorage
      alert(`Funcionário(a) ${nome} excluído(a) com sucesso!`);
    }
  };

  return (
    <div className="home-container"> {/* Reutiliza o container geral do home.css */}
      <header className="navbar"> {/* Reutiliza a navbar do home.css */}
        <div className="logo">CIVIS Administrador</div>
        <nav className="nav-links">
          <a href="#" onClick={() => navigate("/home")}>Home</a>
          <a href="#" onClick={() => navigate("/funcionarios")}>Funcionários</a> {/* Link para esta própria página */}
          {/* Adicione outros links de navegação do admin aqui, se houver */}
        </nav>
        <button className="logout-button" onClick={() => { /* onLogout() */ navigate("/login"); }}>
          Sair
        </button>
      </header>

      <main className="admin-page-container"> {/* Classe específica para o layout da página de admin */}
        <div className="admin-header">
          <h1>Gestão de Funcionários</h1>
          <button className="admin-action-button" onClick={() => navigate('/cadastrar-funcionario')}>
            + Adicionar Funcionário
          </button>
        </div>

        {funcionarios.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: '50px', color: '#555' }}>Nenhum funcionário cadastrado.</p>
        ) : (
          <table className="lista-tabela"> {/* Classe para a tabela de listagem */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Cargo</th>
                <th>Email</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {funcionarios.map(func => (
                <tr key={func.id}>
                  <td>{func.id}</td>
                  <td>{func.nome}</td>
                  <td>{func.cargo}</td>
                  <td>{func.email}</td>
                  <td className="acoes-botoes">
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
  );
}

export default Funcionarios; // Exporta o componente para ser usado no App.jsx