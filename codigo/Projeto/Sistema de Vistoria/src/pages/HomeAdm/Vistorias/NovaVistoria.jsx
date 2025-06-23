import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../home.css';

function NovaVistoria() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    // Campos conforme o diagrama para agendamento inicial
    idCliente: '',      // int - NOVO CAMPO
    idImovel: '',       // int - Renomeado de imovelId
    idVistoriador: '',  // int - Renomeado de vistoriadorId
    dataInicio: '',     // date - Renomeado de dataAgendamento
    // idVistoria será gerado
    // idRelatorio, dataFim, status serão definidos automaticamente ou posteriormente
    observacoes: '',    // string - Campo adicional para contexto
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedVistorias = localStorage.getItem('vistoriasAgendadasMock');
    const vistorias = storedVistorias ? JSON.parse(storedVistorias) : [];

    // Geração de ID interno e idVistoria automaticamente
    const newId = vistorias.length > 0 ? Math.max(...vistorias.map(v => v.id)) + 1 : 1;
    const newIdVistoria = vistorias.length > 0 ? Math.max(...vistorias.map(v => v.idVistoria || 0)) + 1 : 1001; // Gera idVistoria sequencial

    const novaVistoria = {
      id: newId,          // ID interno para o localStorage
      idVistoria: newIdVistoria, // idVistoria gerado automaticamente
      idCliente: parseInt(formData.idCliente),
      idImovel: parseInt(formData.idImovel),
      idVistoriador: parseInt(formData.idVistoriador),
      dataInicio: formData.dataInicio,
      dataFim: null,        // Data de fim é nula no agendamento inicial
      status: 'Agendada',   // Status inicial
      idRelatorio: null,    // Relatório é nulo no agendamento inicial
      observacoes: formData.observacoes,
    };

    const updatedVistorias = [...vistorias, novaVistoria];
    localStorage.setItem('vistoriasAgendadasMock', JSON.stringify(updatedVistorias));

    alert(`Nova vistoria agendada com sucesso! ID da Vistoria: ${newIdVistoria}`);
    navigate('/vistorias-agendadas');
  };

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">CIVIS (Admin)</div>
        <nav className="nav-links">
          <a href="#" onClick={() => navigate("/home")}>Home</a>
          <a href="#" onClick={() => navigate("/vistorias-agendadas")}>Vistorias Agendadas</a>
          <a href="#" onClick={() => navigate("/nova-vistoria")}>Nova Vistoria</a>
        </nav>
        <button className="logout-button" onClick={() => {navigate("/login"); }}>
          Sair
        </button>
      </header>

      <main className="admin-page-container">
        <button className="back-arrow" onClick={() => navigate('/vistorias-agendadas')} style={{ marginBottom: '20px' }}>
          &#8592; Voltar
        </button>
        <h1 style={{ marginBottom: '30px', color: '#004080' }}>Agendar Nova Vistoria</h1>

        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <label htmlFor="idCliente">ID do Cliente:</label> {/* NOVO CAMPO */}
            <input
              type="number"
              id="idCliente"
              name="idCliente"
              value={formData.idCliente}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="idImovel">ID do Imóvel:</label> {/* Nome do campo ajustado */}
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
            <label htmlFor="idVistoriador">ID do Vistoriador:</label> {/* Nome do campo ajustado */}
            <input
              type="number"
              id="idVistoriador"
              name="idVistoriador"
              value={formData.idVistoriador}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dataInicio">Data da Vistoria:</label> {/* Nome do campo ajustado */}
            <input
              type="date"
              id="dataInicio"
              name="dataInicio"
              value={formData.dataInicio}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="observacoes">Observações:</label>
            <textarea
              id="observacoes"
              name="observacoes"
              value={formData.observacoes}
              onChange={handleChange}
              rows="3"
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancelar" onClick={() => navigate('/home')}>
              Cancelar
            </button>
            <button type="submit" className="btn-salvar">
              Agendar Vistoria
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default NovaVistoria;