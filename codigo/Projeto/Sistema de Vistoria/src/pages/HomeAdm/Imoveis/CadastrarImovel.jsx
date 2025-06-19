import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../home.css'; 
import './imoveis.css'; 


//parte de cadastrar imovel
function CadastrarImovel() {
  const navigate = useNavigate();

  //variaveis para guardar os dados do formulario
  const [formData, setFormData] = useState({
    idImovel: '', 
    descricao: '', 
    tipo: '',      
    observacao: '',
    // anexos: '',  //implementar posteriormente, por enquanto so isso
    numeroUnidade: '', 
    idEmpreendimento: '', 
    // idCliente: '', // int (se o imóvel já tiver um cliente associado no cadastro inicial)
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedImoveis = localStorage.getItem('imoveisMock');
    const imoveis = storedImoveis ? JSON.parse(storedImoveis) : [];

    
    const newId = imoveis.length > 0 ? Math.max(...imoveis.map(i => i.id)) + 1 : 1;
    const novoImovel = { ...formData, id: newId, idImovel: parseInt(formData.idImovel) || newId, idEmpreendimento: parseInt(formData.idEmpreendimento) || null };

    const updatedImoveis = [...imoveis, novoImovel];
    localStorage.setItem('imoveisMock', JSON.stringify(updatedImoveis));

    alert('Imóvel cadastrado com sucesso!');
    navigate('/imoveis'); 
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
        <button className="back-arrow" onClick={() => navigate('/imoveis')} style={{ marginBottom: '20px' }}>
          &#8592; Voltar
        </button>
        <h1 style={{ marginBottom: '30px', color: '#004080' }}>Cadastrar Novo Imóvel</h1>

        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label htmlFor="idImovel">ID do Imóvel:</label>
            <input
              type="number"
              id="idImovel"
              name="idImovel"
              value={formData.idImovel}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="descricao">Descrição:</label>
            <input
              type="text"
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="tipo">Tipo:</label>
            <select
              id="tipo"
              name="tipo"
              value={formData.tipo}
              onChange={handleChange}
              required
            >
              <option value="">Selecione o Tipo</option>
              <option value="Apartamento">Apartamento</option>
              <option value="Casa">Casa</option>
              <option value="Comercial">Comercial</option>
              <option value="Terreno">Terreno</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="observacao">Observação:</label>
            <textarea
              id="observacao"
              name="observacao"
              value={formData.observacao}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>
          
          {/* campo de anexo simulado*/}
          <div className="form-group">
            <label htmlFor="anexos">Anexos (URL/Caminho):</label>
            <input
              type="text"
              id="anexos"
              name="anexos"
              value={formData.anexos}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="numeroUnidade">Número da Unidade:</label>
            <input
              type="text"
              id="numeroUnidade"
              name="numeroUnidade"
              value={formData.numeroUnidade}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="idEmpreendimento">ID do Empreendimento:</label>
            <input
              type="number"
              id="idEmpreendimento"
              name="idEmpreendimento"
              value={formData.idEmpreendimento}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancelar" onClick={() => navigate('/imoveis')}>
              Cancelar
            </button>
            <button type="submit" className="btn-salvar">
              Salvar Imóvel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default CadastrarImovel;