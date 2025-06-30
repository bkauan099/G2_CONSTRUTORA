import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Empreendimentos.css'; // Importa o CSS específico para Empreendimentos

function Empreendimentos() {
  const navigate = useNavigate();
  const [empreendimentos, setEmpreendimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Estado para controlar a visualização mobile

  // Efeito para atualizar o estado isMobile ao redimensionar a janela
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // useEffect para controlar a classe do body com base no checkbox (copiado de Clientes.jsx)
  useEffect(() => {
    const checkbox = document.getElementById('check');
    if (!checkbox) return; // Garante que o checkbox existe

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
  }, []); // [] significa que este useEffect roda apenas uma vez, na montagem do componente


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

  const handleExcluir = async (id, nome) => {
    if (!window.confirm(`Tem certeza que deseja excluir o empreendimento "${nome}"?`)) return;

    try {
      const response = await fetch(`http://localhost:3001/api/empreendimentos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao excluir empreendimento');

      setEmpreendimentos((prev) => prev.filter((e) => e.idempreendimento !== id));
      alert(`Empreendimento "${nome}" excluído com sucesso!`);
    } catch (err) {
      console.error('Erro ao excluir:', err);
      alert('Erro ao excluir empreendimento.');
    }
  };

  const handleLogout = () => { // Função de logout para o navbar
    alert('Usuário deslogado!');
    navigate('/login');
  };

  return (
    <div> {/* Corrigido: Removida a tag <body>, use <div> ou <> */}
      {/*NAVBAR*/}
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
            <a href="#" onClick={() => navigate("/funcionarios")}>Funcionários</a>
            <a href="#" className="logout" onClick={handleLogout}>Sair</a>
        </nav>
      </header>

      <div className="container-main"> {/* Usa a classe global de container */}
        <main className="admin-list-content"> {/* Classe global para o conteúdo da listagem */}
          <div className="admin-header"> {/* Classe global para o cabeçalho da seção */}
            <h1>Gestão de <span>Empreendimentos</span></h1> {/* Adicionado span para consistência de estilo */}
            {/* O botão "Adicionar Empreendimento" não está mais aqui, ele será fixado na parte inferior */}
          </div>

          {loading ? (
            <p className="loading-message">Carregando empreendimentos...</p>
          ) : empreendimentos.length === 0 ? (
            <p className="no-data-message">Nenhum empreendimento cadastrado.</p> 
          ) : (
            <>
              {/* Renderização condicional para a tabela (telas maiores) ou cards (telas menores) */}
              {isMobile ? (
                // Layout de cards para mobile: Exibe apenas Nome e Ações
                <div className="empreendimento-card-list">
                  {empreendimentos.map(emp => (
                    <div className="empreendimento-card" key={emp.idempreendimento}>
                      <h3>{emp.nome}</h3> {/* Exibe o Nome */}
                      <div className="card-actions">
                        <button className="btn-editar" onClick={(e) => { e.stopPropagation(); navigate(`/editar-empreendimento/${emp.idempreendimento}`); }}>Editar</button>
                        <button className="btn-excluir" onClick={(e) => { e.stopPropagation(); handleExcluir(emp.idempreendimento, emp.nome); }}>Excluir</button>
                        {/* Botão Visualizar Imóveis usando a classe btn-visualizar */}
                        <button className="btn-visualizar" onClick={(e) => { e.stopPropagation(); navigate(`/imoveis?empreendimentoid=${emp.idempreendimento}`); }}>Visualizar Imóveis</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Tabela completa para desktop
                <table className="lista-tabela">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Descrição</th>
                      <th>Construtora</th>
                      <th>Observações</th>
                      <th>Rua</th>
                      <th>Cidade</th>
                      <th>Estado</th>
                      <th>CEP</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {empreendimentos.map(emp => (
                      <tr key={emp.idempreendimento}>
                        <td data-label="Nome">{emp.nome}</td>
                        <td data-label="Descrição">{emp.descricao}</td> {/* Manter no desktop */}
                        <td data-label="Construtora">{emp.construtora}</td> {/* Manter no desktop */}
                        <td data-label="Observações">{emp.observacoes}</td> {/* Manter no desktop */}
                        <td data-label="Rua">{emp.rua}</td> {/* Manter no desktop */}
                        <td data-label="Cidade">{emp.cidade}</td> {/* Manter no desktop */}
                        <td data-label="Estado">{emp.estado}</td> {/* Manter no desktop */}
                        <td data-label="CEP">{emp.cep}</td> {/* Manter no desktop */}
                        <td className="acoes-botoes" data-label="Ações">
                          <button className="btn-editar" onClick={(e) => { e.stopPropagation(); navigate(`/editar-empreendimento/${emp.idempreendimento}`); }}>Editar</button>
                          <button className="btn-excluir" onClick={(e) => { e.stopPropagation(); handleExcluir(emp.idempreendimento, emp.nome); }}>Excluir</button>
                          {/* Botão Visualizar Imóveis usando a classe btn-visualizar */}
                          <button className="btn-visualizar" onClick={(e) => { e.stopPropagation(); navigate(`/imoveis?empreendimentoid=${emp.idempreendimento}`); }}>Visualizar Imóveis</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </>
          )}
        </main>
      </div>

      {/* Botão "Adicionar Empreendimento" fixado na parte inferior (global) */}
      <button className="admin-action-button-fixed" onClick={() => navigate('/cadastrar-empreendimento')}>
        + Adicionar Empreendimento
      </button>
    </div>
  );
}

export default Empreendimentos;