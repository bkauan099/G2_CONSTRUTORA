import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './vistoriaDataEntryPage.css';

function VistoriaDataEntryPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vistoriaDetalhes, setVistoriaDetalhes] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVistoria = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/vistorias/${id}`);
        if (!res.ok) throw new Error('Erro ao buscar vistoria');

        const data = await res.json();
        setVistoriaDetalhes(data);
      } catch (err) {
        console.error('Erro ao carregar detalhes da vistoria:', err);
        alert('Erro ao carregar detalhes da vistoria.');
      } finally {
        setLoading(false);
      }
    };

    fetchVistoria();
  }, [id]);

  const handleIniciarVistoria = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/vistorias/iniciar/${id}`, {
        method: 'PUT',
      });

      if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.error || 'Erro ao iniciar a vistoria.');
      }

      alert('Vistoria iniciada com sucesso!');
      navigate(`/vistoriador/iniciar-vistoria-detalhes/${id}`);
    } catch (err) {
      console.error('Erro ao iniciar a vistoria:', err);
      alert(err.message);
    }
  };

  if (loading) return <div>Carregando detalhes da vistoria...</div>;
  if (!vistoriaDetalhes) return <div>Vistoria não encontrada.</div>;

  return (
    <div className="vistoria-data-entry-container">
      <h1>{vistoriaDetalhes.nomeempreendimento || `Detalhes da Vistoria ID: ${id}`}</h1>

      {vistoriaDetalhes.anexos && (
        <img
          src={`http://localhost:3001/uploads/${vistoriaDetalhes.anexos}`}
          alt="Imagem do Imóvel"
          className="imagem-empreendimento"
        />
      )}

      <div className="vistoria-form">
        <div className="info-line">
          <span className="label">Descrição do Imóvel:</span>
          <span className="value">{vistoriaDetalhes.descricao || 'N/A'}</span>
        </div>

        <div className="info-line">
          <span className="label">Cidade:</span>
          <span className="value">{vistoriaDetalhes.cidade || 'N/A'}</span>
        </div>

        <div className="info-line">
          <span className="label">Estado:</span>
          <span className="value">{vistoriaDetalhes.estado || 'N/A'}</span>
        </div>

        <div className="info-line">
          <span className="label">CEP:</span>
          <span className="value">{vistoriaDetalhes.cep || 'N/A'}</span>
        </div>

        <div className="info-line">
          <span className="label">Rua:</span>
          <span className="value">{vistoriaDetalhes.rua || 'N/A'}</span>
        </div>

        <div className="info-line">
          <span className="label">Bloco:</span>
          <span className="value">{vistoriaDetalhes.bloco || 'N/A'}</span>
        </div>

        <div className="info-line">
          <span className="label">Número:</span>
          <span className="value">{vistoriaDetalhes.numero || 'N/A'}</span>
        </div>

        <div className="info-line">
          <span className="label">Vistorias Realizadas:</span>
          <span className="value">{vistoriaDetalhes.vistoriasrealizadas ?? '0'}</span>
        </div>

        <div className="info-line">
          <span className="label">Status do Imóvel:</span>
          <span className="value">{vistoriaDetalhes.status || 'N/A'}</span>
        </div>

        <div className="info-line">
          <span className="label">Data Agendada:</span>
          <span className="value">
            {vistoriaDetalhes.datainicio ? new Date(vistoriaDetalhes.datainicio).toLocaleDateString() : 'N/A'}
          </span>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={handleIniciarVistoria}
            className="action-button start-button"
          >
            Iniciar Vistoria
          </button>

          <button
            type="button"
            onClick={() => navigate(`/vistoriador/reagendar-vistoria/${id}`)}
            className="action-button reschedule-button"
          >
            Reagendar Vistoria
          </button>

          <button
            type="button"
            onClick={() => alert('Vistoria finalizada!')}
            className="action-button finalize-button"
          >
            Finalizar Vistoria
          </button>
        </div>
      </div>

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
