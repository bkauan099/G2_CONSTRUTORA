import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeCliente.css'; 

function AgendarVistoria() {
  const navigate = useNavigate();
  const [imovelSelecionado, setImovelSelecionado] = useState('');
  const [dataDesejada, setDataDesejada] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const imoveisDisponiveis = [
    { id: 1, nome: 'Apartamento Central' },
    { id: 2, nome: 'Casa no Campo' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      imovelSelecionado,
      dataDesejada,
      observacoes,
    });
    alert('Sua solicitação de vistoria foi enviada com sucesso!');
    navigate('/minhas-vistorias'); 
  };

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">CIVIS</div>
        <nav className="nav-links">
          <a href="#" onClick={() => navigate("/home")}>Home</a>
          <a href="#" onClick={() => navigate("/agendar-vistoria")}>Agendar Vistoria</a>
          <a href="#" onClick={() => navigate("/minhas-vistorias")}>Minhas Vistorias</a>
          <a href="#" onClick={() => navigate("/meus-imoveis")}>Meus Imóveis</a>
        </nav>
        <button className="logout-button" onClick={() => navigate("/login")}>
          Sair
        </button>
      </header>

      <main className="main-content" style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
        <button className="back-arrow" onClick={() => navigate("/home")} style={{ marginBottom: '20px', marginLeft: '20px' }}>
          &#8592; Voltar
        </button>
        <h1 style={{ color: '#001f3f', marginBottom: '30px', marginLeft: '20px' }}>Agendar Nova Vistoria</h1>

        <form onSubmit={handleSubmit} className="login-form" style={{ width: '80%', maxWidth: '500px', marginLeft: '20px', padding: '30px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
          <label htmlFor="imovel">Selecione o Imóvel:</label>
          <select
            id="imovel"
            value={imovelSelecionado}
            onChange={(e) => setImovelSelecionado(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '15px' }}
          >
            <option value="">-- Selecione um imóvel --</option>
            {imoveisDisponiveis.map(imovel => (
              <option key={imovel.id} value={imovel.id}>
                {imovel.nome}
              </option>
            ))}
          </select>

          <label htmlFor="data">Data Desejada:</label>
          <input
            type="date"
            id="data"
            value={dataDesejada}
            onChange={(e) => setDataDesejada(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '15px' }}
          />

          <label htmlFor="observacoes">Observações:</label>
          <textarea
            id="observacoes"
            value={observacoes}
            onChange={(e) => setObservacoes(e.target.value)}
            rows="4"
            placeholder="Descreva quaisquer detalhes importantes para a vistoria."
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '25px', resize: 'vertical' }}
          ></textarea>

          <button type="submit" className="login-button">
            Solicitar Vistoria
          </button>
        </form>
      </main>
    </div>
  );
}

export default AgendarVistoria;