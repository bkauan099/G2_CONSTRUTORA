import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../home.css'; 
import './clientes.css'; 

function CadastrarCliente() {
  const navigate = useNavigate();


    //variaveis, agora que lembrei se ta certo ou nao os tipos de dados
  const [formData, setFormData] = useState({
    idCliente: '', // int
    nome: '',     // string
    cpf: '',      // string
    telefone: '', // string
    email: '',    // string
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedClientes = localStorage.getItem('clientesMock');
    const clientes = storedClientes ? JSON.parse(storedClientes) : [];

    //id maximo + 1 para novo cliente
    const newId = clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1;

    //novo cliente com id e idCliente
    const novoCliente = { 
      ...formData, 
      id: newId, 
      idCliente: parseInt(formData.idCliente) || newId 
    };

    const updatedClientes = [...clientes, novoCliente];
    localStorage.setItem('clientesMock', JSON.stringify(updatedClientes));

    alert('Cliente cadastrado com sucesso!');
    navigate('/clientes'); // volta para a listagem
  };

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">CIVIS (Admin)</div>
        <nav className="nav-links">
          <a href="#" onClick={() => navigate("/home")}>Home</a>
          <a href="#" onClick={() => navigate("/clientes")}>Clientes</a>
        </nav>
        <button className="logout-button" onClick={() => {navigate("/login"); }}> {/*logout */ }
          Sair
        </button>
      </header>

      <main className="admin-page-container">
        <button className="back-arrow" onClick={() => navigate('/clientes')} style={{ marginBottom: '20px' }}>
          &#8592; Voltar
        </button>
        <h1 style={{ marginBottom: '30px', color: '#004080' }}>Cadastrar Novo Cliente</h1>

        {/* formulário de cadastro, entrada dos dados*/}
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label htmlFor="idCliente">ID Cliente:</label>
            <input type="number" id="idCliente" name="idCliente" value={formData.idCliente} onChange={handleChange} required />
          </div>
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

            {/* botões de ação do formulário */}
          <div className="form-actions">
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
  );
}

export default CadastrarCliente;