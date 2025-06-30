import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CadastrarCliente.css'; // IMPORTA O NOVO CSS ESPECÍFICO

function CadastrarCliente() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
  });

  // Copiado de Clientes.jsx para manter o comportamento do botão fixo e do menu
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
  }, []); // O array vazio [] garante que este efeito roda apenas uma vez, na montagem do componente

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedClientes = localStorage.getItem('clientesMock');
    const clientes = storedClientes ? JSON.parse(storedClientes) : [];

    const newId = clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1;
    const newIdCliente = clientes.length > 0 ? Math.max(...clientes.map(c => c.idCliente)) + 1 : 101;

    const novoCliente = {
      ...formData,
      id: newId,
      idCliente: newIdCliente
    };

    const updatedClientes = [...clientes, novoCliente];
    localStorage.setItem('clientesMock', JSON.stringify(updatedClientes));

    alert(`Cliente cadastrado com sucesso! ID do Cliente: ${newIdCliente}`);
    navigate('/clientes');
  };

  const handleLogout = () => { // Função de logout para o navbar
    alert('Usuário deslogado!');
    navigate('/login');
  };

  return (
    <div> 
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
            <a href="#" onClick={() => navigate("/empreendimentos")}>Empreendimentos</a> 
            <a href="#" onClick={() => navigate("/funcionarios")}>Funcionários</a>
            <a href="#" className="logout" onClick={handleLogout}>Sair</a>
        </nav>
      </header>

      <div className="container-main"> {/* Usa a classe global de container */}
        <main className="cadastrar-cliente-content"> {/* Nova classe específica para o conteúdo de cadastro */}
          <div className="cadastrar-cliente-header"> {/* Container para botão voltar e título */}
            <button className="btn-voltar" onClick={() => navigate('/clientes')}>
              &#8592; Voltar
            </button>
            <h1>Cadastrar Novo <span>Cliente</span></h1> {/* Adicionado span para consistência de estilo */}
          </div>

          <form onSubmit={handleSubmit} className="form-container"> {/* Usa classes globais para o formulário */}
            <div className="form-group">
              <label htmlFor="nome">Nome Completo:</label>
              <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="cpf">CPF:</label>
              <input type="text" id="cpf" name="cpf" value={formData.cpf} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="telefone">Telefone:</label>
              <input type="tel" id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-actions"> {/* Usa classes globais para as ações do formulário */}
              <button type="button" className="btn-cancelar" onClick={() => navigate('/clientes')}>
                Cancelar
              </button>
              <button type="submit" className="btn-salvar">
                Salvar Cliente
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default CadastrarCliente;