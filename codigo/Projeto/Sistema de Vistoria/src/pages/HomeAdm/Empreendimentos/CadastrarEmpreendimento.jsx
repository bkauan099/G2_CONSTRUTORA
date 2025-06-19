import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../home.css';
import './empreendimentos.css';


//função de cadastro
function CadastrarEmpreendimento() {
  const navigate = useNavigate();

  //variaveis 
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    descricao: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedEmpreendimentos = localStorage.getItem('empreendimentosMock');
    const empreendimentos = storedEmpreendimentos ? JSON.parse(storedEmpreendimentos) : [];

    const newId = empreendimentos.length > 0 ? Math.max(...empreendimentos.map(emp => emp.id)) + 1 : 1;
    const novoEmpreendimento = { ...formData, id: newId };

    const updatedEmpreendimentos = [...empreendimentos, novoEmpreendimento];
    localStorage.setItem('empreendimentosMock', JSON.stringify(updatedEmpreendimentos));

    alert('Empreendimento cadastrado com sucesso!');
    navigate('/empreendimentos');
  };

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">CIVIS (Admin)</div>
        <nav className="nav-links">
          <a href="#" onClick={() => navigate("/home")}>Home</a>
          <a href="#" onClick={() => navigate("/empreendimentos")}>Empreendimentos</a>
        </nav>
        <button className="logout-button" onClick={() => {navigate("/login"); }}>
          Sair
        </button>
      </header>

      <main className="admin-page-container">
        <button className="back-arrow" onClick={() => navigate('/empreendimentos')} style={{ marginBottom: '20px' }}>
          &#8592; Voltar
        </button>
        <h1 style={{ marginBottom: '30px', color: '#004080' }}>Cadastrar Novo Empreendimento</h1>

        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="endereco">Endereço:</label>
            <input type="text" id="endereco" name="endereco" value={formData.endereco} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="descricao">Descrição:</label>
            <textarea id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} rows="4"></textarea>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancelar" onClick={() => navigate('/empreendimentos')}>
              Cancelar
            </button>
            <button type="submit" className="btn-salvar">
              Salvar Empreendimento
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default CadastrarEmpreendimento;