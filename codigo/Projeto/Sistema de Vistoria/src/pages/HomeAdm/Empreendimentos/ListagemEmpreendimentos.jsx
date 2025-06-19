import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../home.css'; 
import './empreendimentos.css'; 

function ListagemEmpreendimentos() {
  const navigate = useNavigate();

  const [empreendimentos, setEmpreendimentos] = useState(() => {
    const savedEmpreendimentos = localStorage.getItem('empreendimentosMock');
    return savedEmpreendimentos ? JSON.parse(savedEmpreendimentos) : [
      { id: 101, nome: 'Residencial Atlântico', endereco: 'Av. Beira Mar, 123', descricao: 'Apartamentos de luxo com vista para o mar' },
      { id: 102, nome: 'Condomínio das Flores', endereco: 'Rua das Rosas, 456', descricao: 'Casas em condomínio fechado com área de lazer completa' },
      { id: 103, nome: 'Centro Empresarial Norte', endereco: 'Av. Norte, 789', descricao: 'Salas comerciais modernas e bem localizadas' },
    ];
  });

  //salvar empreendimentos se tiver alteração
  useEffect(() => {
    localStorage.setItem('empreendimentosMock', JSON.stringify(empreendimentos));
  }, [empreendimentos]);

  //função para excluir 
  const handleExcluir = (id, nome) => {
    if (window.confirm(`Tem certeza que deseja excluir o empreendimento "${nome}"?  Todos os imóveis associados também serão afetados.`)) {
      const novosEmpreendimentos = empreendimentos.filter(emp => emp.id !== id);
      setEmpreendimentos(novosEmpreendimentos);
      alert(`Empreendimento "${nome}" excluído com sucesso!`);
      
    }
  };

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">CIVIS (Admin)</div>
        <nav className="nav-links">
          <a href="#" onClick={() => navigate("/home")}>Home</a>
          <a href="#" onClick={() => navigate("/funcionarios")}>Funcionários</a>
          <a href="#" onClick={() => navigate("/empreendimentos")}>Empreendimentos</a> 
        </nav>
        <button className="logout-button" onClick={() => {navigate("/login"); }}>
          Sair
        </button>
      </header>

      <main className="admin-page-container">
        <div className="admin-header">
          <h1>Gestão de Empreendimentos</h1>
          <button className="admin-action-button" onClick={() => navigate('/empreendimentos/cadastrar')}>
            + Adicionar Empreendimento
          </button>
        </div>

        {empreendimentos.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: '50px', color: '#555' }}>Nenhum empreendimento cadastrado.</p>
        ) : (
          <table className="lista-tabela">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Endereço</th>
                <th>Descrição</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {empreendimentos.map(emp => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td>{emp.nome}</td>
                  <td>{emp.endereco}</td>
                  <td>{emp.descricao}</td>
                  <td className="acoes-botoes">
                    <button className="btn-editar" onClick={() => navigate(`/editar-empreendimento${emp.id}`)}>
                      Editar
                    </button>
                    <button className="btn-excluir" onClick={() => handleExcluir(emp.id, emp.nome)}>
                      Excluir
                    </button>
                    <button className="btn-editar" onClick={() => navigate(`/imoveis?empreendimentoId=${emp.id}`)}>
                      Exibir Imóveis
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

export default ListagemEmpreendimentos;