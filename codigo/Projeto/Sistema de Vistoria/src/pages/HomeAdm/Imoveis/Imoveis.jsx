import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Adicionado useLocation para filtrar por Empreendimento ID
import '../home.css'; 
import './imoveis.css'; 

function ListagemImoveis() {
  const navigate = useNavigate();
  const location = useLocation(); // Hook para acessar a URL atual
  const empreendimentoId = new URLSearchParams(location.search).get('empreendimentoId'); // Pega o empreendimentoId da URL

  const [imoveis, setImoveis] = useState(() => {
    const savedImoveis = localStorage.getItem('imoveisMock');
    return savedImoveis ? JSON.parse(savedImoveis) : [
      // Dados mock com idImovel e outros campos do diagrama
      { id: 1, idImovel: 101, descricao: 'Apartamento 3 quartos, vista mar', tipo: 'Apartamento', idEmpreendimento: 1, numeroUnidade: '101A', observacao: 'Boa iluminação', anexos: 'url_anexo1' },
      { id: 2, idImovel: 102, descricao: 'Casa com piscina e 4 suítes', tipo: 'Casa', idEmpreendimento: 2, numeroUnidade: '12', observacao: 'Grande jardim', anexos: 'url_anexo2' },
      { id: 3, idImovel: 103, descricao: 'Loja comercial térrea, ótima localização', tipo: 'Comercial', idEmpreendimento: 3, numeroUnidade: 'Loja 05', observacao: 'Perto do metrô', anexos: 'url_anexo3' },
      { id: 4, idImovel: 104, descricao: 'Apartamento cobertura duplex', tipo: 'Apartamento', idEmpreendimento: 1, numeroUnidade: 'Cobertura', observacao: 'Vista panorâmica', anexos: 'url_anexo4' },
    ];
  });
  // armazenamento inicial dos imoveis
  useEffect(() => {
    localStorage.setItem('imoveisMock', JSON.stringify(imoveis));
  }, [imoveis]);

  // Filtra os imóveis com base no empreendimentoId (se presente na URL)
  const imoveisFiltrados = empreendimentoId
    ? imoveis.filter(imovel => imovel.idEmpreendimento === parseInt(empreendimentoId))
    : imoveis;

  // exclusao de imóvel
  const handleExcluir = (id, descricao) => {
    if (window.confirm(`Tem certeza que deseja excluir o imóvel "${descricao}"?`)) {
      const novosImoveis = imoveis.filter(imovel => imovel.id !== id);
      setImoveis(novosImoveis);
      alert(`Imóvel "${descricao}" excluído(a) com sucesso!`);
    }
  };

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">CIVIS (Admin)</div>
        <nav className="nav-links">
          <a href="#" onClick={() => navigate("/home")}>Home</a>
          <a href="#" onClick={() => navigate("/nova-vistoria")}>Nova Vistoria</a>
          <a href="#" onClick={() => navigate("/vistorias-agendadas")}>Vistorias Agendadas</a>
          <a href="#" onClick={() => navigate("/clientes")}>Clientes</a>
          <a href="#" onClick={() => navigate("/empreendimentos")}>Empreendimentos</a>
          <a href="#" onClick={() => navigate("/funcionarios")}>Funcionários</a>
        </nav>
        <button className="logout-button" onClick={() => { navigate("/login"); }}>
          Sair
        </button>
      </header>

      <main className="admin-page-container">
        <div className="admin-header">
          <h1>Gestão de Imóveis</h1>
          <button className="admin-action-button" onClick={() => navigate('/cadastrar-imovel')}> {/* Corrigido para cadastrar-imovel */}
            Adicionar Imóvel
          </button>
        </div>

        {imoveisFiltrados.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: '50px', color: '#555' }}>
            {empreendimentoId
              ? `Nenhum imóvel cadastrado para o Empreendimento ID ${empreendimentoId}.`
              : 'Nenhum imóvel cadastrado.'}
          </p>
        ) : (
          <table className="lista-tabela">
            <thead>
              <tr>
                <th>ID Imóvel</th> {/* Atualizado para "ID Imóvel" */}
                <th>Descrição</th>
                <th>Tipo</th>
                <th>Empreendimento ID</th>
                <th>Unidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {imoveisFiltrados.map(imovel => (
                <tr key={imovel.id}> {/* 'key' ainda usa o id interno */}
                  <td data-label="ID Imóvel">{imovel.idImovel}</td> {/* Exibindo idImovel, adicionado data-label */}
                  <td data-label="Descrição">{imovel.descricao}</td> {/* Adicionado data-label */}
                  <td data-label="Tipo">{imovel.tipo}</td> {/* Adicionado data-label */}
                  <td data-label="Empreendimento ID">{imovel.idEmpreendimento}</td> {/* Adicionado data-label */}
                  <td data-label="Unidade">{imovel.numeroUnidade}</td> {/* Adicionado data-label */}
                  <td data-label="Ações" className="acoes-botoes"> {/* Adicionado data-label */}
                    <button className="btn-editar" onClick={() => navigate(`/visualizar-imovel/${imovel.id}`)}> {/* Adicionado botão Visualizar */}
                      Visualizar
                    </button>
                    <button className="btn-editar" onClick={() => navigate(`/editar-imovel/${imovel.id}`)}>
                      Editar
                    </button>
                    <button className="btn-excluir" onClick={() => handleExcluir(imovel.id, imovel.descricao)}>
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