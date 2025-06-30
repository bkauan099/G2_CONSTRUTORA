import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Clientes.css'; // Importa o CSS específico para Clientes

function Clientes() {
  const navigate = useNavigate();

  const [clientes, setClientes] = useState(() => {
    const savedClientes = localStorage.getItem('clientesMock');
    return savedClientes ? JSON.parse(savedClientes) : [
      { id: 1, idCliente: 101, nome: 'Paule Eduarde Lime Rabele', cpf: '111.222.333-44', telefone: '11987654321', email: 'ana.silva@email.com' },
      { id: 2, idCliente: 102, nome: 'Carlos Roberto Costa', cpf: '555.666.777-88', telefone: '21998765432', email: 'carlos.costa@email.com' },
      { id: 3, idCliente: 103, nome: 'Mariana Lima Santos', cpf: '999.000.111-22', telefone: '31976543210', email: 'mariana.santos@email.com' },
    ];
  });

  // Estado para controlar a visualização mobile, como em Empreendimentos
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); 

  // Efeito para atualizar o estado isMobile ao redimensionar a janela
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    localStorage.setItem('clientesMock', JSON.stringify(clientes));
  }, [clientes]);

  // useEffect para controlar a classe 'menu-aberto' no body
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

  const handleExcluir = (id, nome) => {
    if (window.confirm(`Tem certeza que deseja excluir o cliente(a) ${nome}?`)) {
      const novosClientes = clientes.filter(cliente => cliente.id !== id);
      setClientes(novosClientes);
      alert(`Cliente(a) ${nome} excluído(a) com sucesso!`);
    }
  };

  const handleLogout = () => {
    alert('Usuário deslogado!');
    navigate('/login');
  };

  return (
    <div> {/* CORRIGIDO: Removida a tag <body>, use <div> como root */}
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
            <a href="#" onClick={() => navigate("/empreendimentos")}>Empreendimentos</a>
            <a href="#" onClick={() => navigate("/funcionarios")}>Funcionários</a>
            <a href="#" className="logout" onClick={handleLogout}>Sair</a>
        </nav>
      </header>

      <div className="container-main">
        <main className="admin-list-content"> {/* Mantendo esta classe global de listagem */}
          <div className="admin-header"> {/* Mantendo esta classe global de cabeçalho */}
            <h1>Gestão de <span>Clientes</span></h1>
            {/* Botão "Adicionar Cliente" fixo na parte inferior, como em Empreendimentos */}
          </div>

          {clientes.length === 0 ? (
            <p className="no-data-message">Nenhum cliente cadastrado.</p>
          ) : (
            <>
              {/* Renderização condicional para cards (mobile) ou tabela (desktop) */}
              {isMobile ? (
                // Layout de cards para mobile: Reutilizando as classes de Empreendimentos
                <div className="empreendimento-card-list">
                  {clientes.map(cliente => (
                    <div className="empreendimento-card" key={cliente.id}>
                      <h3>{cliente.nome}</h3> {/* Nome como título do card */}
                      <p>CPF: {cliente.cpf}</p> {/* CPF como parágrafo no card */}
                      <div className="card-actions"> {/* Ações no card */}
                        <button className="btn-editar" onClick={(e) => { e.stopPropagation(); navigate(`/editar-cliente/${cliente.id}`); }}>Editar</button>
                        <button className="btn-excluir" onClick={(e) => { e.stopPropagation(); handleExcluir(cliente.id, cliente.nome); }}>Excluir</button>
                        {/* Se houvesse um "visualizar" para cliente, usaria btn-visualizar aqui */}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Tabela completa para desktop
                <table className="lista-tabela">
                  <thead>
                    <tr>
                      <th>ID Cliente</th>
                      <th>Nome</th>
                      <th>CPF</th>
                      <th>Telefone</th>
                      <th>Email</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clientes.map(cliente => (
                      <tr key={cliente.id}>
                        {/* ATRIBUTOS data-label SÃO CRUCIAIS PARA A RESPONSIVIDADE DA TABELA */}
                        <td data-label="ID Cliente">{cliente.idCliente}</td>
                        <td data-label="Nome">{cliente.nome}</td>
                        <td data-label="CPF">{cliente.cpf}</td>
                        <td data-label="Telefone">{cliente.telefone}</td>
                        <td data-label="Email">{cliente.email}</td>
                        <td data-label="Ações" className="acoes-botoes">
                          <button className="btn-editar" onClick={(e) => { e.stopPropagation(); navigate(`/editar-cliente/${cliente.id}`); }}>
                            Editar
                          </button>
                          <button className="btn-excluir" onClick={(e) => { e.stopPropagation(); handleExcluir(cliente.id, cliente.nome); }}>
                            Excluir
                          </button>
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

      {/* Botão "Adicionar Cliente" fixo na parte inferior, como em Empreendimentos */}
      <button className="admin-action-button-fixed" onClick={() => navigate('/cadastrar-cliente')}>
        + Adicionar Cliente
      </button>
    </div>
  );
}

export default Clientes;