import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// You might want to fetch survey data and update it via API calls here
// import { fetchVistoriaData, saveVistoriaData, finalizeVistoria, emitReport, notifyClient } from '../../api-service';
import './vistoriaDataEntryPage.css'; // Create this CSS file

function VistoriaDataEntryPage() {
  const { id } = useParams(); // Get the property/vistoria ID from the URL
  const navigate = useNavigate();
  const [vistoriaData, setVistoriaData] = useState({
    // Example fields
    area: '',
    conditions: '',
    observations: '',
    // ... other survey fields
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // In a real application, fetch existing vistoria data for this ID
    // if (id) {
    //   setIsLoading(true);
    //   fetchVistoriaData(id)
    //     .then(data => {
    //       setVistoriaData(data);
    //       setIsLoading(false);
    //     })
    //     .catch(err => {
    //       setError("Erro ao carregar dados da vistoria.");
    //       setIsLoading(false);
    //     });
    // }
    // Mock data for demonstration:
    if (id) {
        setVistoriaData({
            area: '50m²',
            conditions: 'Boas condições gerais, pintura descascando em alguns pontos.',
            observations: 'Verificar vazamento no banheiro social.',
        });
        setIsLoading(false);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVistoriaData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    // Call API to save partial data
    console.log(`Salvando dados da vistoria ${id}:`, vistoriaData);
    alert('Dados salvos com sucesso!');
    // saveVistoriaData(id, vistoriaData)
    //   .then(() => alert('Dados salvos com sucesso!'))
    //   .catch(err => alert('Erro ao salvar dados.'));
  };

  const handleReagendar = () => {
    // Navigate to a rescheduling page, passing the vistoria ID
    navigate(`/vistoriador/reagendar-vistoria/${id}`);
  };

  const handleFinalizar = () => {
    // Call API to finalize the vistoria
    console.log(`Finalizando vistoria ${id}...`);
    alert('Vistoria finalizada! Notificando cliente...');
    // finalizeVistoria(id)
    //   .then(() => {
    //     alert('Vistoria finalizada e cliente notificado!');
    //     navigate('/vistoriador/realizar-vistoria'); // Go back to the list
    //   })
    //   .catch(err => alert('Erro ao finalizar vistoria.'));
  };

  const handleEmitirRelatorio = () => {
    // Call API to generate and perhaps store the report
    console.log(`Emitindo relatório para vistoria ${id}...`);
    alert('Relatório emitido com sucesso! O cliente será notificado.');
    // emitReport(id)
    //   .then(() => {
    //     alert('Relatório emitido com sucesso!');
    //     // You might want to notify the client here as well
    //     // notifyClient(id, "Relatório disponível");
    //   })
    //   .catch(err => alert('Erro ao emitir relatório.'));
  };

  if (isLoading) return <div>Carregando dados da vistoria...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="vistoria-data-entry-container">
      <h1>Vistoria do Imóvel ID: {id}</h1>

      <form className="vistoria-form">
        <label htmlFor="area">Área do Imóvel:</label>
        <input 
          type="text" 
          id="area" 
          name="area" 
          value={vistoriaData.area} 
          onChange={handleChange} 
        />

        <label htmlFor="conditions">Condições Gerais:</label>
        <textarea 
          id="conditions" 
          name="conditions" 
          value={vistoriaData.conditions} 
          onChange={handleChange} 
          rows="5"
        ></textarea>

        <label htmlFor="observations">Observações:</label>
        <textarea 
          id="observations" 
          name="observations" 
          value={vistoriaData.observations} 
          onChange={handleChange} 
          rows="5"
        ></textarea>

        {/* Add more fields as needed for your survey */}

        <div className="form-actions">
          <button type="button" onClick={handleSave} className="action-button save-button">
            Salvar
          </button>
          <button type="button" onClick={handleReagendar} className="action-button reschedule-button">
            Reagendar Vistoria
          </button>
          <button type="button" onClick={handleFinalizar} className="action-button finalize-button">
            Finalizar Vistoria
          </button>
          <button type="button" onClick={handleEmitirRelatorio} className="action-button report-button">
            Emitir Relatório
          </button>
        </div>
      </form>

      <button type="button" className="back-to-list-button" onClick={() => navigate('/vistoriador/realizar-vistoria')}>
        Voltar para a Lista
      </button>
    </div>
  );
}

export default VistoriaDataEntryPage;