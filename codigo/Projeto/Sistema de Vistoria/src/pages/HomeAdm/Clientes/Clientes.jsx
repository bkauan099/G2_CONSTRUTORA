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

  useEffect(() => {
    localStorage.setItem('clientesMock', JSON.stringify(clientes));
  }, [clientes]);

  // NOVO/ATUALIZADO useEffect para controlar a classe 'menu-aberto' no body
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

    // Função de limpeza: remove o event listener quando o componente é desmontado
    return () => {
      checkbox.removeEventListener('change', handleCheckboxChange);
    };
  }, []); // O array vazio [] garante que este efeito roda apenas uma vez, na montagem do componente

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
    // REMOVIDO: className='menu-aberto' daqui. Será adicionado/removido via JS.
    <body> 
      <header className="header">
        <div className="logo">
           <a href="#" onClick={() => navigate("/home")}>
            <img src="src\pages\HomeAdm\logo.png" alt="Logo CIVIS" />
          </a>
        </div>
        {/* REMOVIDO: style={{ display: 'none' }} daqui. O CSS global vai ocultá-lo. */}
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
        <main className="clientes-listagem-content">
          <div className="admin-header">
            <h1>Gestão de <span>Clientes</span></h1>
          </div>

          {clientes.length === 0 ? (
            <p className="no-data-message">Nenhum cliente cadastrado.</p>
          ) : (
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
                    <td>{cliente.idCliente}</td>
                    <td>{cliente.nome}</td>
                    <td>{cliente.cpf}</td>
                    <td>{cliente.telefone}</td>
                    <td>{cliente.email}</td>
                    <td className="acoes-botoes">
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
        </main>
      </div>

      <button className="admin-action-button-fixed" onClick={() => navigate('/cadastrar-cliente')}>
        + Adicionar Cliente
      </button>
    </body>
  );
}

export default Clientes;