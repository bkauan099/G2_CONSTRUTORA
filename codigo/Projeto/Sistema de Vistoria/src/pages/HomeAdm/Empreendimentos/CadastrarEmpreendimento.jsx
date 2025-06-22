import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { estadosECidades } from '../../../utils/estadosECidades';

import '../home.css';
import './empreendimentos.css';

function CadastrarEmpreendimento() {
  const navigate = useNavigate();

  const estados = Object.keys(estadosECidades).sort(); // Ordena os estados por ordem alfabética
  const [cidadesDisponiveis, setCidadesDisponiveis] = useState([]);

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    construtora: '',
    dataentrega: '',
    observacoes: '',
    cidade: '',
    estado: '',
    cep: '',
    rua: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEstadoChange = (e) => {
    const estadoSelecionado = e.target.value;
    setFormData({ ...formData, estado: estadoSelecionado, cidade: '' });
    setCidadesDisponiveis(estadosECidades[estadoSelecionado] || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/empreendimentos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar empreendimento');
      }

      alert('Empreendimento cadastrado com sucesso!');
      navigate('/empreendimentos');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao cadastrar empreendimento. Verifique o console.');
    }
  };

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">CIVIS (Admin)</div>
        <nav className="nav-links">
          <a href="#" onClick={() => navigate("/home")}>Home</a>
          <a href="#" onClick={() => navigate("/empreendimentos")}>Empreendimentos</a>
        </nav>
        <button className="logout-button" onClick={() => navigate("/login")}>
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
            <label htmlFor="descricao">Descrição:</label>
            <textarea id="descricao" name="descricao" rows="3" value={formData.descricao} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="construtora">Construtora:</label>
            <input type="text" id="construtora" name="construtora" value={formData.construtora} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="dataentrega">Data de Entrega:</label>
            <input type="date" id="dataentrega" name="dataentrega" value={formData.dataentrega} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="observacoes">Observações:</label>
            <textarea id="observacoes" name="observacoes" rows="2" value={formData.observacoes} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="estado">Estado:</label>
            <select id="estado" name="estado" value={formData.estado} onChange={handleEstadoChange} required>
              <option value="">Selecione um estado</option>
              {estados.map((estado) => (
                <option key={estado} value={estado}>{estado}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="cidade">Cidade:</label>
            <select id="cidade" name="cidade" value={formData.cidade} onChange={handleChange} required disabled={!formData.estado}>
              <option value="">Selecione uma cidade</option>
              {cidadesDisponiveis.map((cidade) => (
                <option key={cidade} value={cidade}>{cidade}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="cep">CEP:</label>
            <input type="text" id="cep" name="cep" value={formData.cep} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="rua">Rua:</label>
            <input type="text" id="rua" name="rua" value={formData.rua} onChange={handleChange} />
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
