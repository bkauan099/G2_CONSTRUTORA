import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../home.css';
import './empreendimentos.css';

function Empreendimentos() {
  const navigate = useNavigate();
  const [empreendimentos, setEmpreendimentos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Buscar empreendimentos no backend
  useEffect(() => {
    const fetchEmpreendimentos = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/empreendimentos');
        if (!response.ok) {
          throw new Error('Erro ao buscar empreendimentos');
        }
        const data = await response.json();
        setEmpreendimentos(data);
      } catch (err) {
        console.error('Erro ao buscar empreendimentos:', err);
        alert('Erro ao buscar empreendimentos. Verifique o console.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmpreendimentos();
  }, []);

  // Exclusão
  const handleExcluir = async (id, nome) => {
    if (!window.confirm(`Tem certeza que deseja excluir o empreendimento "${nome}"?`)) return;

    try {
      const response = await fetch(`http://localhost:3001/api/empreendimentos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao excluir empreendimento');

      // Remover do estado local após exclusão bem-sucedida
      setEmpreendimentos((prev) => prev.filter((e) => e.idEmpreendimento !== id));
      alert(`Empreendimento "${nome}" excluído com sucesso!`);
    } /* eslint-disable-next-line no-dupe-else-if */
    catch (err) {
      console.error('Erro ao excluir:', err);
      alert('Erro ao excluir empreendimento.');
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
        <button className="logout-button" onClick={() => navigate("/login")}>Sair</button>
      </header>

      <main className="admin-page-container">
        <div className="admin-header">
          <h1>Gestão de Empreendimentos</h1>
          <button className="admin-action-button" onClick={() => navigate('/cadastrar-empreendimento')}>
            Adicionar Empreendimento
          </button>
        </div>

        {loading ? (
          <p>Carregando empreendimentos...</p>
        ) : empreendimentos.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: '50px', color: '#555' }}>Nenhum empreendimento cadastrado.</p>
        ) : (
          <table className="lista-tabela">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Construtora</th> {/* Adicionado */}
                <th>Data de Entrega</th> {/* Adicionado */}
                <th>Observações</th> {/* Adicionado */}
                <th>Rua</th> {/* Adicionado */}
                <th>Número</th> {/* Adicionado */}
                <th>Condomínio</th> {/* Adicionado */}
                <th>Bloco</th> {/* Adicionado */}
                <th>Cidade</th> {/* Adicionado */}
                <th>Estado</th> {/* Adicionado */}
                <th>CEP</th> {/* Adicionado */}
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {empreendimentos.map(emp => (
                <tr key={emp.idEmpreendimento}>
                  <td data-label="ID">{emp.idEmpreendimento}</td>
                  <td data-label="Nome">{emp.nome}</td>
                  <td data-label="Descrição">{emp.descricao}</td>
                  <td data-label="Construtora">{emp.construtora}</td> {/* Adicionado */}
                  <td data-label="Data de Entrega">{emp.dataEntrega}</td> {/* Adicionado */}
                  <td data-label="Observações">{emp.observacoes}</td> {/* Adicionado */}
                  <td data-label="Rua">{emp.rua}</td> {/* Adicionado */}
                  <td data-label="Número">{emp.numero}</td> {/* Adicionado */}
                  <td data-label="Condomínio">{emp.condominio}</td> {/* Adicionado */}
                  <td data-label="Bloco">{emp.bloco}</td> {/* Adicionado */}
                  <td data-label="Cidade">{emp.cidade}</td> {/* Adicionado */}
                  <td data-label="Estado">{emp.estado}</td> {/* Adicionado */}
                  <td data-label="CEP">{emp.cep}</td> {/* Adicionado */}
                  <td className="acoes-botoes">
                    <button className="btn-editar" onClick={() => navigate(`/editar-empreendimento/${emp.idEmpreendimento}`)}>Editar</button>
                    <button className="btn-excluir" onClick={() => handleExcluir(emp.idEmpreendimento, emp.nome)}>Excluir</button>
                    <button className="btn-editar" onClick={() => navigate(`/imoveis?empreendimentoId=${emp.idEmpreendimento}`)}>Exibir Imóveis</button>
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

export default Empreendimentos;