import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../home.css'; 

function CadastrarFuncionario() { 
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    cargo: '',
    email: '',
    telefone: '',
    dataContratacao: '',
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedFuncionarios = localStorage.getItem('funcionariosMock');
    const funcionarios = storedFuncionarios ? JSON.parse(storedFuncionarios) : [];

    const newId = funcionarios.length > 0 ? Math.max(...funcionarios.map(f => f.id)) + 1 : 1;
    const novoFuncionario = { ...formData, id: newId };

    const updatedFuncionarios = [...funcionarios, novoFuncionario];
    localStorage.setItem('funcionariosMock', JSON.stringify(updatedFuncionarios));

    alert('Funcionário cadastrado com sucesso!');
    navigate('/funcionarios'); 
  };

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">CIVIS (Admin)</div>
        <nav className="nav-links">
          <a href="#" onClick={() => navigate("/home")}>Home</a>
          <a href="#" onClick={() => navigate("/funcionarios")}>Funcionários</a>
        </nav>
        <button className="logout-button" onClick={() => {navigate("/login"); }}>
          Sair
        </button>
      </header>

      <main className="admin-page-container">
        <button className="back-arrow" onClick={() => navigate('/funcionarios')} style={{ marginBottom: '20px' }}>
          &#8592; Voltar
        </button>
        <h1 style={{ marginBottom: '30px', color: '#004080' }}>Cadastrar Novo Funcionário</h1>

        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label htmlFor="nome">Nome Completo:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cargo">Cargo:</label>
            <input
              type="text"
              id="cargo"
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone:</label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dataContratacao">Data de Contratação:</label>
            <input
              type="date"
              id="dataContratacao"
              name="dataContratacao"
              value={formData.dataContratacao}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancelar" onClick={() => navigate('/funcionarios')}>
              Cancelar
            </button>
            <button type="submit" className="btn-salvar">
              Salvar Funcionário
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default CadastrarFuncionario; 