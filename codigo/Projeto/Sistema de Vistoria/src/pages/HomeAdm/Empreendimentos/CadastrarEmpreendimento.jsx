import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../home.css'; // Estilos gerais (navbar, admin-page-container, etc.)
import './empreendimentos.css'; // Estilos específicos de empreendimentos

function CadastrarEmpreendimento() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    construtora: '',
    dataEntrega: '',
    observacoes: '',
    cidade: '',
    estado: '',
    cep: '',
    rua: '',
    condominio: '',
    bloco: '',
    numero: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/empreendimentos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          descricao: formData.descricao,
          construtora: formData.construtora,
          dataEntrega: formData.dataEntrega,
          observacoes: formData.observacoes,
          cidade: formData.cidade,
          estado: formData.estado,
          cep: formData.cep,
          rua: formData.rua,
          condominio: formData.condominio,
          bloco: formData.bloco,
          numero: formData.numero,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Erro desconhecido ao cadastrar." }));
        throw new Error(errorData.message || `Erro ao cadastrar empreendimento: ${response.status}`);
      }

      alert('Empreendimento cadastrado com sucesso!');
      navigate('/empreendimentos');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao cadastrar empreendimento. Verifique o console. ' + error.message);
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
          {/* Adicionando a classe form-grid para o layout de grid */}
          <div className="form-grid">
            <div className="form-group full-width-field"> {/* Nome ocupa a largura total */}
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group full-width-field"> {/* Descrição ocupa a largura total */}
              <label htmlFor="descricao">Descrição:</label>
              <textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                rows="4"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="construtora">Construtora:</label>
              <input
                type="text"
                id="construtora"
                name="construtora"
                value={formData.construtora}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="dataEntrega">Data de Entrega:</label>
              <input
                type="date"
                id="dataEntrega"
                name="dataEntrega"
                value={formData.dataEntrega}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width-field"> {/* Observações ocupa a largura total */}
              <label htmlFor="observacoes">Observações:</label>
              <textarea
                id="observacoes"
                name="observacoes"
                value={formData.observacoes}
                onChange={handleChange}
                rows="3"
              ></textarea>
            </div>

            {/* Subtítulo para a seção de Endereço */}
            <h2 className="form-section-title">Endereço</h2>

            <div className="form-group">
              <label htmlFor="rua">Rua:</label>
              <input
                type="text"
                id="rua"
                name="rua"
                value={formData.rua}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="numero">Número:</label>
              <input
                type="text"
                id="numero"
                name="numero"
                value={formData.numero}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cidade">Cidade:</label>
              <input
                type="text"
                id="cidade"
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="estado">Estado:</label>
              <input
                type="text"
                id="estado"
                name="estado"
                value={formData.estado}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cep">CEP:</label>
              <input
                type="text"
                id="cep"
                name="cep"
                value={formData.cep}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="condominio">Condomínio:</label>
              <input
                type="text"
                id="condominio"
                name="condominio"
                value={formData.condominio}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bloco">Bloco:</label>
              <input
                type="text"
                id="bloco"
                name="bloco"
                value={formData.bloco}
                onChange={handleChange}
              />
            </div>
          </div> {/* Fim do form-grid */}

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