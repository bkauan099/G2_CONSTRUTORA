import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../home.css'; 
import './imoveis.css'; 

function ListagemImoveis() {
  const navigate = useNavigate();

  const [imoveis, setImoveis] = useState(() => {
    const savedImoveis = localStorage.getItem('imoveisMock');
    return savedImoveis ? JSON.parse(savedImoveis) : [
      { id: 1, descricao: 'Apartamento 3 quartos, vista mar', tipo: 'Apartamento', idEmpreendimento: 101, numeroUnidade: '101A' },
      { id: 2, descricao: 'Casa com piscina e 4 suítes', tipo: 'Casa', idEmpreendimento: 102, numeroUnidade: '12' },
      { id: 3, descricao: 'Loja comercial térrea, ótima localização', tipo: 'Comercial', idEmpreendimento: 103, numeroUnidade: 'Loja 05' },
    ];
  });
  //armazenamento inicial dos imoveis
  useEffect(() => {
    localStorage.setItem('imoveisMock', JSON.stringify(imoveis));
  }, [imoveis]);

    //exclusao de imóvel
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
          <button className="admin-action-button" onClick={() => navigate('cadastrar-imoveis')}>
            Adicionar Imóvel
          </button>
        </div>

        {imoveis.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: '50px', color: '#555' }}>Nenhum imóvel cadastrado.</p>
        ) : (
          <table className="lista-tabela"> 
            <thead>
              <tr>
                <th>ID</th>
                <th>Descrição</th>
                <th>Tipo</th>
                <th>Empreendimento ID</th>
                <th>Unidade</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {imoveis.map(imovel => (
                <tr key={imovel.id}>
                  <td>{imovel.id}</td>
                  <td>{imovel.descricao}</td>
                  <td>{imovel.tipo}</td>
                  <td>{imovel.idEmpreendimento}</td>
                  <td>{imovel.numeroUnidade}</td>
                  <td className="acoes-botoes">
                    <button className="btn-editar" onClick={() => navigate(`/editar-imoveis/${imovel.id}`)}>
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