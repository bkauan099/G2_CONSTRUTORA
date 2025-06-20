import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../home.css'; 


//variaveis pra voces
function NovaVistoria() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    imovelId: '',
    vistoriadorId: '',
    dataAgendamento: '',
    observacoes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // simulação do armazenamento
    const storedVistorias = localStorage.getItem('vistoriasAgendadasMock');
    const vistorias = storedVistorias ? JSON.parse(storedVistorias) : [];

    //geração de id 
    const newId = vistorias.length > 0 ? Math.max(...vistorias.map(v => v.id)) + 1 : 1;

    const novaVistoria = {
      id: newId,
      imovel: `Imóvel ID: ${formData.imovelId}`, 
      vistoriador: `Vistoriador ID: ${formData.vistoriadorId}`, 
      data: formData.dataAgendamento,
      status: 'Agendada',
      ...formData // inclui os outros dados do formulario
    };

    const updatedVistorias = [...vistorias, novaVistoria];
    localStorage.setItem('vistoriasAgendadasMock', JSON.stringify(updatedVistorias)); 

    alert('Nova vistoria agendada com sucesso!');
    navigate('/vistorias-agendadas');
  };

  return (
    <div className="home-container"> {/* container geral do home.css */}
      <header className="navbar"> {/* reutiliza a navbar do home.css */}
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
            <label htmlFor="imovelId">ID do Imóvel:</label>
            <input
              type="number"
              id="imovelId"
              name="imovelId"
              value={formData.imovelId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="vistoriadorId">ID do Vistoriador:</label>
            <input
              type="number"
              id="vistoriadorId"
              name="vistoriadorId"
              value={formData.vistoriadorId}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dataAgendamento">Data de Agendamento:</label>
            <input
              type="date"
              id="dataAgendamento"
              name="dataAgendamento"
              value={formData.dataAgendamento}
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
            <button type="button" className="btn-cancelar" onClick={() => navigate('/vistorias-agendadas')}>
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