import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Importe seus serviços de API aqui para salvar dados, atualizar status e emitir relatório
// Exemplo:
// import { fetchVistoriaDetails, saveVistoriaDetails, updateVistoriaStatus, emitReportAPI } from '../../api-service';

import './iniciarVistoriaDetalhesPage.css'; // Importa o CSS específico para esta página

function IniciarVistoriaDetalhesPage() {
  const { id } = useParams(); // Obtém o ID da vistoria da URL
  const navigate = useNavigate(); // Hook para navegação programática

  // Estado para armazenar os dados genéricos da vistoria
  // Agora inclui status e idRelatorio para gerenciar os botões
  const [vistoriaDetalhesData, setVistoriaDetalhesData] = useState({
    idVistoria: parseInt(id) || null,
    dataHoraInicioReal: '', // Pode ser preenchido ao carregar ou via input
    condicoesClimaticas: '',
    observacoesIniciais: '',
    status: 'EM_ANDAMENTO', // Assumimos que ao entrar nesta página, a vistoria está 'EM_ANDAMENTO' para teste
    idRelatorio: null, // Será preenchido após emitir relatório
    dataHoraFimReal: '', // Para ser preenchido ao finalizar
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Em uma aplicação real, você buscaria todos os detalhes da vistoria por ID
    // incluindo o status atual e o idRelatorio, se já existir.
    /*
    if (id) {
      setIsLoading(true);
      fetchVistoriaDetails(id) // Função que busca todos os detalhes da vistoria por ID
        .then(data => {
          setVistoriaDetalhesData(prev => ({ 
            ...prev, 
            ...data,
            // Assegura que o campo de data/hora esteja no formato correto para input
            dataHoraInicioReal: data.dataHoraInicioReal || new Date().toISOString().slice(0, 16),
            dataHoraFimReal: data.dataHoraFimReal || '',
          }));
          setIsLoading(false);
        })
        .catch(err => {
          setError("Erro ao carregar dados da vistoria.");
          setIsLoading(false);
          console.error("Erro ao carregar detalhes da vistoria:", err);
        });
    } else {
      setIsLoading(false);
    }
    */
    // Para fins de demonstração (mock data):
    setIsLoading(false);
    // Para testar o botão "Finalizar", o status precisa ser 'EM_ANDAMENTO'
    // Para testar o botão "Emitir Relatório", o status precisa ser 'FINALIZADA' e idRelatorio nulo
    // Vamos começar com 'EM_ANDAMENTO' para que o "Finalizar" esteja ativo.
    setVistoriaDetalhesData(prev => ({
      ...prev,
      dataHoraInicioReal: prev.dataHoraInicioReal || new Date().toISOString().slice(0, 16),
      status: 'EM_ANDAMENTO', // <-- Definido como EM_ANDAMENTO para teste inicial
      idRelatorio: null, // Garante que não há relatório inicialmente
    }));
    console.log(`Carregando página de detalhes de vistoria ID: ${id}`);
  }, [id]);

  // Handler para atualizar o estado quando os campos do formulário mudam
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setVistoriaDetalhesData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Função para Salvar os dados genéricos da vistoria
  const handleSave = async () => {
    console.log(`Salvando dados da vistoria ${vistoriaDetalhesData.idVistoria}:`, vistoriaDetalhesData);
    setIsLoading(true);
    try {
      // Mock de chamada de API para salvar os detalhes genéricos
      // await saveVistoriaDetails(vistoriaDetalhesData.idVistoria, vistoriaDetalhesData);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simula API delay
      alert('Dados da vistoria salvos com sucesso!');
    } catch (err) {
      console.error("Erro ao salvar dados da vistoria:", err);
      alert("Ocorreu um erro ao salvar os dados.");
    } finally {
      setIsLoading(false);
    }
  };

  // Função para Finalizar a vistoria
  const handleFinalizar = async () => {
    console.log(`Finalizando vistoria ${vistoriaDetalhesData.idVistoria}...`);
    setIsLoading(true);
    try {
      // Mock de chamada de API para atualizar o status para 'FINALIZADA'
      // await updateVistoriaStatus(vistoriaDetalhesData.idVistoria, 'FINALIZADA');
      await new Promise(resolve => setTimeout(resolve, 500)); // Simula API delay

      // Atualiza o estado local e a data/hora de fim real
      setVistoriaDetalhesData(prev => ({
        ...prev,
        status: 'FINALIZADA',
        dataHoraFimReal: new Date().toISOString().slice(0, 16)
      }));
      alert('Vistoria finalizada com sucesso!');
      // Opcional: Navegar de volta para a página de detalhes original ou lista de vistorias
      // navigate(`/vistoriador/detalhes-vistoria/${vistoriaDetalhesData.idVistoria}`);
    } catch (err) {
      console.error("Erro ao finalizar vistoria:", err);
      alert("Ocorreu um erro ao finalizar a vistoria.");
    } finally {
      setIsLoading(false);
    }
  };

  // Função para Emitir Relatório
  const handleEmitirRelatorio = async () => {
    console.log(`Emitindo relatório para vistoria ${vistoriaDetalhesData.idVistoria}...`);
    setIsLoading(true);
    try {
      // Mock de chamada de API para emitir o relatório
      // const reportInfo = await emitReportAPI(vistoriaDetalhesData.idVistoria);
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simula API delay

      const newReportId = Math.floor(Math.random() * 100000) + 1; // Mock de um ID de relatório
      setVistoriaDetalhesData(prev => ({ ...prev, idRelatorio: newReportId }));
      alert(`Relatório ${newReportId} emitido com sucesso!`);
      // Redireciona para a página de criação de relatório
      navigate('/vistoriador/criar-relatorio'); // <-- Redirecionamento adicionado aqui
    } catch (err) {
      console.error("Erro ao emitir relatório:", err);
      alert("Ocorreu um erro ao emitir o relatório.");
    } finally {
      setIsLoading(false);
    }
  };

  // NOVA FUNÇÃO: handleReagendar - para navegar para a página de reagendamento
  const handleReagendar = () => {
    navigate(`/vistoriador/reagendar-vistoria/${vistoriaDetalhesData.idVistoria}`);
  };


  if (isLoading) return <div className="loading">Carregando formulário de vistoria...</div>;
  if (error) return <div className="error">Erro: {error}</div>;

  return (
    <div className="iniciar-vistoria-detalhes-container">
      {/* Botão de voltar */}
      <button
        type="button"
        className="back-arrow"
        onClick={() => navigate(`/vistoriador/realizar-vistoria`)} // Ajusta para voltar para a lista principal
      >
        &#8592; Voltar
      </button>

      <h1>Vistoria em Andamento - ID: {id}</h1>
      <p className="description">Preencha os dados e gerencie o processo da vistoria.</p>

      <form className="iniciar-vistoria-form" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="dataHoraInicioReal">Data e Hora de Início Real:</label>
        <input
          type="datetime-local"
          id="dataHoraInicioReal"
          name="dataHoraInicioReal"
          value={vistoriaDetalhesData.dataHoraInicioReal}
          onChange={handleChange}
          required
          // Campos de data/hora podem ser apenas leitura após o início, se preferir
          // readOnly={vistoriaDetalhesData.status !== 'AGENDADA'}
        />

        <label htmlFor="dataHoraFimReal">Data e Hora de Fim Real:</label>
        <input
          type="datetime-local"
          id="dataHoraFimReal"
          name="dataHoraFimReal"
          value={vistoriaDetalhesData.dataHoraFimReal}
          onChange={handleChange}
          readOnly={vistoriaDetalhesData.status !== 'FINALIZADA'} // Apenas leitura a menos que esteja finalizada para preencher
        />

        <label htmlFor="condicoesClimaticas">Condições Climáticas:</label>
        <input
          type="text"
          id="condicoesClimaticas"
          name="condicoesClimaticas"
          value={vistoriaDetalhesData.condicoesClimaticas}
          onChange={handleChange}
          placeholder="Ex: Ensolarado, Chuvoso, Nublado"
          readOnly={vistoriaDetalhesData.status === 'FINALIZADA'} // Apenas leitura se finalizada
        />

        <label htmlFor="observacoesIniciais">Observações Gerais da Vistoria:</label>
        <textarea
          id="observacoesIniciais"
          name="observacoesIniciais"
          value={vistoriaDetalhesData.observacoesIniciais}
          onChange={handleChange}
          placeholder="Registre observações gerais, detalhes da inspeção, etc."
          readOnly={vistoriaDetalhesData.status === 'FINALIZADA'} // Apenas leitura se finalizada
        ></textarea>

        <label htmlFor="statusDisplay">Status Atual:</label>
        <input
            type="text"
            id="statusDisplay"
            name="statusDisplay"
            value={vistoriaDetalhesData.status}
            readOnly // O status é exibido, mas alterado por ações e não diretamente no input
            className="status-display-input"
        />

        {vistoriaDetalhesData.idRelatorio && (
            <label htmlFor="idRelatorioDisplay">ID do Relatório:</label>
        )}
        {vistoriaDetalhesData.idRelatorio && (
            <input
                type="text"
                id="idRelatorioDisplay"
                name="idRelatorioDisplay"
                value={vistoriaDetalhesData.idRelatorio}
                readOnly
                className="report-id-display-input"
            />
        )}


        <div className="form-actions-extended">
          <button
            type="button"
            onClick={handleSave}
            className="action-button save-button"
            disabled={isLoading || vistoriaDetalhesData.status === 'FINALIZADA'} // Desabilita se carregando ou já finalizada
          >
            {isLoading ? 'Salvando...' : 'Salvar Dados'}
          </button>

          <button
            type="button"
            onClick={handleFinalizar}
            className="action-button finalize-button"
            disabled={isLoading || vistoriaDetalhesData.status !== 'EM_ANDAMENTO'} // Habilita se EM_ANDAMENTO
          >
            {isLoading ? 'Finalizando...' : 'Finalizar Vistoria'}
          </button>

          {/*botão de emitir relatório*/}
          <button
            type="button"
            onClick={handleEmitirRelatorio}
            className="action-button report-button"
            disabled={isLoading || vistoriaDetalhesData.status !== 'FINALIZADA' || vistoriaDetalhesData.idRelatorio !== null} // Habilita se FINALIZADA e sem relatório
          >
            {isLoading ? 'Gerando...' : 'Emitir Relatório'}
          </button>

          {/* Botão Reagendar Vistoria */}
          <button
            type="button"
            onClick={handleReagendar}
            className="action-button reschedule-button"
            disabled={isLoading || vistoriaDetalhesData.status === 'FINALIZADA'} // Desabilita se carregando ou já finalizada
          >
            Reagendar Vistoria
          </button>
        </div>
      </form>
    </div>
  );
}

export default IniciarVistoriaDetalhesPage;