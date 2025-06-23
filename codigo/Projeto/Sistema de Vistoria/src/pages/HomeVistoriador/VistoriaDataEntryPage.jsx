import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './vistoriaDataEntryPage.css';

function VistoriaDataEntryPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vistoriaData, setVistoriaData] = useState({
    idVistoria: parseInt(id) || null,
    idCliente: '',
    idImovel: '',
    idRelatorio: null,
    idVistoriador: '',
    dataInicio: '',
    dataFim: '',
    status: 'AGENDADA',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setVistoriaData({
        idVistoria: parseInt(id),
        idCliente: 101,
        idImovel: 205,
        idRelatorio: null,
        idVistoriador: 302,
        dataInicio: '2025-06-20',
        dataFim: '2025-06-20',
        status: 'AGENDADA',
      });
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setVistoriaData(prevState => ({
        ...prevState,
        status: 'AGENDADA',
        dataInicio: new Date().toISOString().slice(0, 10)
      }));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVistoriaData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleIniciarVistoria = () => {
    setVistoriaData(prevData => ({
      ...prevData,
      status: 'EM_ANDAMENTO',
      dataInicio: new Date().toISOString().slice(0, 10)
    }));
    navigate(`/vistoriador/iniciar-vistoria-detalhes/${vistoriaData.idVistoria}`);
  };

  const handleReagendar = () => {
    navigate(`/vistoriador/reagendar-vistoria/${vistoriaData.idVistoria}`);
  };

  const handleFinalizar = () => {
    setVistoriaData(prevData => ({
      ...prevData,
      status: 'FINALIZADA',
      dataFim: new Date().toISOString().slice(0, 10)
    }));
    alert('Vistoria finalizada! Notificando cliente...');
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
          readOnly
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
          readOnly
        />
        {/*botao para gerar relatorio */}
        <div className="form-actions">
          <button
            type="button"
            onClick={handleIniciarVistoria}
            className="action-button start-button"
          >
            Iniciar Vistoria
          </button>

          {/* Botão para reagendar vistoria */}
          <button
            type="button"
            onClick={handleReagendar}
            className="action-button reschedule-button"
          >
            Reagendar Vistoria
          </button>


          {/* Botão para finalizar vistoria */}
          <button
            type="button"
            onClick={handleFinalizar}
            className="action-button finalize-button"
            disabled={vistoriaData.status !== 'EM_ANDAMENTO'}
          >
            Finalizar Vistoria
          </button>
        </div>
      </form>
      
      {/* Botão para voltar à lista de vistorias */ }
      <button
        type="button"
        className="back-to-list-button"
        onClick={() => navigate('/vistoriador/realizar-vistoria')}
      >
        Voltar para a Lista
      </button>
    </div>
  );
}

export default VistoriaDataEntryPage;
