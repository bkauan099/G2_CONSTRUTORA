import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../home.css';
import './imoveis.css';

function ListagemImoveis() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const empreendimentoId = queryParams.get('empreendimentoId');

  const [imoveis, setImoveis] = useState([]);
  const [empreendimento, setEmpreendimento] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/imoveis/${empreendimentoId}`);
        if (!response.ok) throw new Error('Erro ao buscar imóveis');

        const data = await response.json();
        setImoveis(data.imoveis);
        setEmpreendimento(data.empreendimento);
      } catch (err) {
        console.error('Erro ao buscar imóveis:', err);
        alert('Erro ao buscar imóveis. Verifique o console.');
      } finally {
        setLoading(false);
      }
    };

    if (empreendimentoId) fetchImoveis();
  }, [empreendimentoId]);

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">CIVIS (Admin)</div>
        <nav className="nav-links">
          <a onClick={() => navigate("/home")}>Home</a>
          <a onClick={() => navigate("/empreendimentos")}>Empreendimentos</a>
        </nav>
        <button className="logout-button" onClick={() => navigate("/login")}>
          Sair
        </button>
      </header>

      <main className="admin-page-container">
        <button className="back-arrow" onClick={() => navigate('/empreendimentos')}>
          &#8592; Voltar
        </button>

        <h1 style={{ marginBottom: '20px', color: '#004080' }}>
          Gestão de Imóveis
        </h1>

        {empreendimento && (
          <div style={{ marginBottom: '30px' }}>
            <h2>{empreendimento.nome}</h2>
            <p>{empreendimento.descricao}</p>
          </div>
        )}

        {loading ? (
          <p>Carregando imóveis...</p>
        ) : imoveis.length === 0 ? (
          <p>Nenhum imóvel encontrado.</p>
        ) : (
          <table className="lista-tabela">
            <thead>
              <tr>
                <th>ID</th>
                <th>Bloco</th>
                <th>Número</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {imoveis.map((endereco) => (
                <tr key={endereco.idendereco}>
                  <td>{endereco.idendereco}</td>
                  <td>{endereco.bloco}</td>
                  <td>{endereco.numero}</td>
                  <td className="acoes-botoes">
                    <button className="btn-editar" onClick={() => navigate(`/editar-imovel/${endereco.idendereco}`)}>
                      Editar
                    </button>
                    <button className="btn-excluir" onClick={() => alert('Excluir ainda não implementado')}>
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

export default ListagemImoveis;
