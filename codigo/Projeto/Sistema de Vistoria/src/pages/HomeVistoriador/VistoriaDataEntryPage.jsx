import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// You might want to fetch survey data and update it via API calls here
// import { fetchVistoriaData, saveVistoriaData, finalizeVistoria, emitReport, notifyClient } from '../../api-service';
import './vistoriaDataEntryPage.css'; // Create this CSS file

function VistoriaDataEntryPage() {
  const { id } = useParams(); // Get the vistoria ID from the URL (corresponds to idVistoria)
  const navigate = useNavigate();

  // Based on the Vistoria class diagram
  const [vistoriaData, setVistoriaData] = useState({
    idVistoria: parseInt(id) || null, // Parse ID from URL
    idCliente: '',
    idImovel: '',
    idRelatorio: null, // This might be set after the report is emitted
    idVistoriador: '',
    dataInicio: '', // Format as 'YYYY-MM-DD' for date input
    dataFim: '',   // Format as 'YYYY-MM-DD' for date input
    status: 'AGENDADA', // Enum values: 'AGENDADA', 'EM_ANDAMENTO', 'FINALIZADA', 'CANCELADA'
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
    // Mock data for demonstration, matching the diagram fields:
    if (id) {
      setVistoriaData({
        idVistoria: parseInt(id),
        idCliente: 101,
        idImovel: 205,
        idRelatorio: null, // Assume no report yet
        idVistoriador: 302,
        dataInicio: '2025-06-20',
        dataFim: '2025-06-20',
        status: 'EM_ANDAMENTO',
      });
      setIsLoading(false);
    } else {
      // If no ID is provided, it might be a new vistoria entry
      setIsLoading(false);
      setVistoriaData(prevState => ({ ...prevState, status: 'AGENDADA', dataInicio: new Date().toISOString().slice(0, 10) }));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVistoriaData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSave = () => {
    // Call API to save partial data
    console.log(`Salvando dados da vistoria ${vistoriaData.idVistoria || 'nova'}:`, vistoriaData);
    alert('Dados salvos com sucesso!');
    // saveVistoriaData(vistoriaData.idVistoria, vistoriaData)
    //   .then(() => alert('Dados salvos com sucesso!'))
    //   .catch(err => alert('Erro ao salvar dados.'));
  };

  const handleReagendar = () => {
    // Navigate to a rescheduling page, passing the vistoria ID
    navigate(`/vistoriador/reagendar-vistoria/${vistoriaData.idVistoria}`);
  };

  const handleFinalizar = () => {
    // Call API to finalize the vistoria
    // This should also update the status to 'FINALIZADA'
    console.log(`Finalizando vistoria ${vistoriaData.idVistoria}...`);
    // Assuming API updates the status
    setVistoriaData(prevData => ({ ...prevData, status: 'FINALIZADA', dataFim: new Date().toISOString().slice(0, 10) }));
    alert('Vistoria finalizada! Notificando cliente...');
    // finalizeVistoria(vistoriaData.idVistoria)
    //   .then(() => {
    //     alert('Vistoria finalizada e cliente notificado!');
    //     navigate('/vistoriador/realizar-vistoria'); // Go back to the list
    //   })
    //   .catch(err => alert('Erro ao finalizar vistoria.'));
  };

  const handleEmitirRelatorio = () => {
    // Call API to generate and perhaps store the report
    console.log(`Emitindo relatório para vistoria ${vistoriaData.idVistoria}...`);
    // After emission, you might get an idRelatorio back from the API
    const newReportId = Math.floor(Math.random() * 1000) + 1; // Mock new report ID
    setVistoriaData(prevData => ({ ...prevData, idRelatorio: newReportId }));
    alert('Relatório emitido com sucesso! O cliente será notificado.');
    // emitReport(vistoriaData.idVistoria)
    //   .then((reportInfo) => { // Assume reportInfo contains idRelatorio
    //     setVistoriaData(prevData => ({ ...prevData, idRelatorio: reportInfo.idRelatorio }));
    //     alert('Relatório emitido com sucesso!');
    //     // You might want to notify the client here as well
    //     // notifyClient(vistoriaData.idVistoria, "Relatório disponível");
    //   })
    //   .catch(err => alert('Erro ao emitir relatório.'));
  };

  if (isLoading) return <div>Carregando dados da vistoria...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div className="vistoria-data-entry-container">
      <h1>Detalhes da Vistoria ID: {vistoriaData.idVistoria || 'Nova Vistoria'}</h1>

      <form className="vistoria-form">
        <label htmlFor="idVistoria">ID da Vistoria:</label>
        <input
          type="text"
          id="idVistoria"
          name="idVistoria"
          value={vistoriaData.idVistoria || ''}
          readOnly // Vistoria ID is usually system generated/read-only
        />

        <label htmlFor="idCliente">ID do Cliente:</label>
        <input
          type="number"
          id="idCliente"
          name="idCliente"
          value={vistoriaData.idCliente}
          onChange={handleChange}
        />

        <label htmlFor="idImovel">ID do Imóvel:</label>
        <input
          type="number"
          id="idImovel"
          name="idImovel"
          value={vistoriaData.idImovel}
          onChange={handleChange}
        />

        <label htmlFor="idVistoriador">ID do Vistoriador:</label>
        <input
          type="number"
          id="idVistoriador"
          name="idVistoriador"
          value={vistoriaData.idVistoriador}
          onChange={handleChange}
        />

        <label htmlFor="dataInicio">Data de Início:</label>
        <input
          type="date"
          id="dataInicio"
          name="dataInicio"
          value={vistoriaData.dataInicio}
          onChange={handleChange}
        />

        <label htmlFor="dataFim">Data de Fim:</label>
        <input
          type="date"
          id="dataFim"
          name="dataFim"
          value={vistoriaData.dataFim}
          onChange={handleChange}
        />

        <label htmlFor="status">Status:</label>
        <select
          id="status"
          name="status"
          value={vistoriaData.status}
          onChange={handleChange}
        >
          <option value="AGENDADA">Agendada</option>
          <option value="EM_ANDAMENTO">Em Andamento</option>
          <option value="FINALIZADA">Finalizada</option>
          <option value="CANCELADA">Cancelada</option>
        </select>

        <label htmlFor="idRelatorio">ID do Relatório:</label>
        <input
          type="text"
          id="idRelatorio"
          name="idRelatorio"
          value={vistoriaData.idRelatorio || 'Não Gerado'}
          readOnly // Report ID is usually system generated/read-only
        />

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
          <button type="button" onClick={handleEmitirRelatorio} className="action-button report-button"
            disabled={vistoriaData.status !== 'FINALIZADA'}> {/* Only enable if vistoria is finalized */}
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