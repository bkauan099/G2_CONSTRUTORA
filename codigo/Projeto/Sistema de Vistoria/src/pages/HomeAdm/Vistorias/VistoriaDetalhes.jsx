import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../home.css'; // Estilos gerais e de admin (ajuste o caminho)
// Você pode reutilizar estilos de vistoriaDataEntryPage.css ou criar um vistorias.css mais geral
function VistoriaDetalhes() {
  const { id } = useParams(); // Pega o ID interno (do localStorage) da vistoria da URL
  const navigate = useNavigate();

  const [vistoria, setVistoria] = useState(null); // Estado para armazenar os dados da vistoria

  // Carrega os dados da vistoria do localStorage ao montar o componente
  useEffect(() => {
    const storedVistorias = localStorage.getItem('vistoriasAgendadasMock');
    const vistorias = storedVistorias ? JSON.parse(storedVistorias) : [];
    // Encontra a vistoria pelo ID interno
    const vistoriaEncontrada = vistorias.find(item => item.id === parseInt(id));

    if (vistoriaEncontrada) {
      // Garante que todos os campos são strings para exibição segura
      const sanitizedData = {
        idVistoria: vistoriaEncontrada.idVistoria || 'N/A',
        idCliente: vistoriaEncontrada.idCliente || 'N/A',
        idImovel: vistoriaEncontrada.idImovel || 'N/A',
        idRelatorio: vistoriaEncontrada.idRelatorio || 'N/A',
        idVistoriador: vistoriaEncontrada.idVistoriador || 'N/A',
        dataInicio: vistoriaEncontrada.dataInicio || 'N/A',
        dataFim: vistoriaEncontrada.dataFim || 'N/A',
        status: vistoriaEncontrada.status || 'N/A',
        // Adicione outros campos se existirem em seu mock e diagrama (ex: observacoes)
        observacoes: vistoriaEncontrada.observacoes || 'N/A',
      };
      setVistoria(sanitizedData);
    } else {
      alert('Vistoria não encontrada!');
      navigate('/vistorias-agendadas'); // Redireciona de volta para a listagem
    }
  }, [id, navigate]);

  if (!vistoria) {
    // Retorna um indicador de carregamento ou null enquanto os dados não são carregados
    return (
      <div className="home-container">
        <header className="navbar">
          <div className="logo">CIVIS (Admin)</div>
          <nav className="nav-links">
            <a href="#" onClick={() => navigate("/home")}>Home</a>
            <a href="#" onClick={() => navigate("/vistorias-agendadas")}>Vistorias Agendadas</a>
          </nav>
          <button className="logout-button" onClick={() => { navigate("/login"); }}>
            Sair
          </button>
        </header>
        <main className="admin-page-container" style={{ textAlign: 'center', marginTop: '50px' }}>
          <h2>Carregando detalhes da vistoria...</h2>
        </main>
      </div>
    );
  }

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">CIVIS (Admin)</div>
        <nav className="nav-links">
          <a href="#" onClick={() => navigate("/home")}>Home</a>
          <a href="#" onClick={() => navigate("/vistorias-agendadas")}>Vistorias Agendadas</a>
        </nav>
        <button className="logout-button" onClick={() => { navigate("/login"); }}>
          Sair
        </button>
      </header>

      <main className="admin-page-container">
        <button className="back-arrow" onClick={() => navigate('/vistorias-agendadas')} style={{ marginBottom: '20px' }}>
          &#8592; Voltar para Vistorias Agendadas
        </button>
        <h1 style={{ marginBottom: '30px', color: '#004080' }}>Detalhes da Vistoria: {vistoria.idVistoria}</h1>

        {/* Reutilizando a classe form-container para o card de exibição */}
        <div className="form-container" style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'left' }}>
          <div className="form-group">
            <label><strong>ID da Vistoria:</strong></label>
            <p>{vistoria.idVistoria}</p>
          </div>
          <div className="form-group">
            <label><strong>ID do Cliente:</strong></label>
            <p>{vistoria.idCliente}</p>
          </div>
          <div className="form-group">
            <label><strong>ID do Imóvel:</strong></label>
            <p>{vistoria.idImovel}</p>
          </div>
          <div className="form-group">
            <label><strong>ID do Vistoriador:</strong></label>
            <p>{vistoria.idVistoriador}</p>
          </div>
          <div className="form-group">
            <label><strong>Data de Início:</strong></label>
            <p>{vistoria.dataInicio}</p>
          </div>
          <div className="form-group">
            <label><strong>Data de Fim:</strong></label>
            <p>{vistoria.dataFim}</p>
          </div>
          <div className="form-group">
            <label><strong>Status:</strong></label>
            <p>{vistoria.status}</p>
          </div>
          <div className="form-group">
            <label><strong>ID do Relatório:</strong></label>
            <p>{vistoria.idRelatorio}</p>
          </div>
          <div className="form-group">
            <label><strong>Observações (Agendamento):</strong></label>
            <p>{vistoria.observacoes || 'N/A'}</p>
          </div>
          {/* Adicione outros detalhes relevantes da vistoria, se existirem e forem relevantes para a visualização */}

          <div className="form-actions" style={{ justifyContent: 'flex-start' }}>
            {/* Botão para ir para a página de edição de vistoria do vistoriador (se houver, com ID interno) */}
            <button type="button" className="btn-editar" onClick={() => navigate(`/vistoriador/vistoria/${id}`)}>
              ✏️ Iniciar/Editar Vistoria
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default VistoriaDetalhes;