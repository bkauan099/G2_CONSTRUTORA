import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Imoveis.css'; // Importa o CSS específico para Imoveis

function ListagemImoveis() {
  const navigate = useNavigate();
  const location = useLocation();
  const empreendimentoid = new URLSearchParams(location.search).get('empreendimentoid');

  const [imoveis, setImoveis] = useState([]);
  const [empreendimentoNome, setEmpreendimentoNome] = useState('');
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const handleLogout = () => {
    alert('Usuário deslogado!');
    navigate('/login');
  };

  useEffect(() => {
    const fetchEmpreendimento = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/empreendimentos/${empreendimentoid}`);
        if (!response.ok) throw new Error('Erro ao buscar empreendimento');

        const data = await response.json();
        setEmpreendimentoNome(data.nome);
      } catch (error) {
        console.error('Erro ao buscar nome do empreendimento:', error);
        setEmpreendimentoNome('Desconhecido');
      }
    };

    if (empreendimentoid) {
      fetchEmpreendimento();
    }
  }, [empreendimentoid]);

  useEffect(() => {
    const fetchImoveis = async () => {
      try {
        const url = `http://localhost:3001/api/imoveis?empreendimentoid=${empreendimentoid}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Erro ao buscar imóveis');

        const data = await response.json();
        setImoveis(data);
      } catch (error) {
        console.error('Erro ao buscar imóveis:', error);
        alert('Erro ao buscar imóveis. Verifique o console.');
      } finally {
        setLoading(false);
      }
    };

    if (empreendimentoid) {
      fetchImoveis();
    }
  }, [empreendimentoid]);

  const handleExcluir = async (id, descricao) => {
    if (!window.confirm(`Tem certeza que deseja excluir o imóvel "${descricao}"?`)) return;

    try {
      const response = await fetch(`http://localhost:3001/api/imoveis/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Erro ao excluir imóvel.');

      setImoveis((prev) => prev.filter((imovel) => imovel.idimovel !== id));
      alert(`Imóvel "${descricao}" excluído com sucesso.`);
    } catch (error) {
      console.error('Erro ao excluir imóvel:', error);
      alert('Erro ao excluir imóvel.');
    }
  };

  return (
    <div>
      <header className="header">
        <div className="logo">
          <a href="#" onClick={() => navigate("/home")}>
            <img src="src\pages\HomeAdm\logo.png" alt="Logo CIVIS" />
          </a>
        </div>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="icons">
          <i className='bx bx-menu' id="icone-menu"></i>
          <i className='bx bx-x' id="fechar-menu"></i>
        </label>
        <nav className="navbar">
          <a href="#" onClick={() => navigate("/home")}>Início</a>
          <a href="#" onClick={() => navigate("/nova-vistoria")}>Nova Vistoria</a>
          <a href="#" onClick={() => navigate("/vistorias-agendadas")}>Vistorias Agendadas</a>
          <a href="#" onClick={() => navigate("/clientes")}>Clientes</a>
          <a href="#" onClick={() => navigate("/empreendimentos")}>Empreendimentos</a>
          <a href="#" onClick={() => navigate("/funcionarios")}>Funcionários</a>
          <a href="#" className="logout" onClick={handleLogout}>Sair</a>
        </nav>
      </header>

      <div className="container-main">
        <main className="admin-list-content">
          <div className="admin-header">
            <button className="btn-voltar" onClick={() => navigate('/empreendimentos')}>
              &#8592; Voltar
            </button>
            <h1>Imóveis do <span>{empreendimentoNome}</span></h1>
          </div>

        {loading ? (
          <p>Carregando imóveis...</p>
        ) : imoveis.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: '50px', color: '#555' }}>
            Nenhum imóvel encontrado para o empreendimento {empreendimentoNome}.
          </p>
        ) : (
          <table className="lista-tabela">
            <thead>
              <tr>
                <th>Descrição</th>
                <th>Vistorias Realizadas</th>
                <th>Bloco</th>
                <th>Número</th>
                <th>Observações</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {imoveis.map((imovel) => (
                <tr key={imovel.idimovel}>
                  {/* TODOS OS <td> PRECISAM DO data-label */}
                  <td data-label="Descrição">{imovel.descricao}</td>
                  <td data-label="Vistorias Realizadas">{imovel.vistoriasrealizadas}</td>
                  <td data-label="Bloco">{imovel.bloco}</td>
                  <td data-label="Número">{imovel.numero}</td>
                  <td data-label="Observações">{imovel.observacao}</td>
                  <td className="acoes-botoes" data-label="Ações">
                    <button className="btn-visualizar" onClick={() => navigate(`/visualizar-imovel/${imovel.idimovel}`)}>Visualizar</button>
                    <button className="btn-editar" onClick={() => navigate(`/editar-imovel/${imovel.idimovel}`)}>Editar</button>
                    <button className="btn-excluir" onClick={() => handleExcluir(imovel.idimovel, imovel.descricao)}>Excluir</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        </main>
      </div>

      <button className="admin-action-button-fixed" onClick={() => navigate(`/cadastrar-imovel?empreendimentoid=${empreendimentoid}`)}>
        + Adicionar Imóvel
      </button>
    </div>
  );
}

export default ListagemImoveis;