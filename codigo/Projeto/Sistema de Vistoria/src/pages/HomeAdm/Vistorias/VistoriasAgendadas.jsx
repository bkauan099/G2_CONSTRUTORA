import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../home.css'; 

function VistoriasAgendadas() {
  const navigate = useNavigate();

    //armazenar vistorias no local
  const [vistorias, setVistorias] = useState(() => {
    const savedVistorias = localStorage.getItem('vistoriasAgendadasMock');
    //exemplos de visualização
    return savedVistorias ? JSON.parse(savedVistorias) : [
      { id: 1, imovel: 'Apto 101, Ed. Alfa', vistoriador: 'João Silva', data: '2025-07-20', status: 'Agendada' },
      { id: 2, imovel: 'Casa 5, Cond. Beta', vistoriador: 'Maria Souza', data: '2025-07-22', status: 'Agendada' },
      { id: 3, imovel: 'Loja 12, Shopping', vistoriador: 'Carlos Lima', data: '2025-07-25', status: 'Agendada' },
    ];
  });

  //salvamento no local sempre que editar
  useEffect(() => {
    localStorage.setItem('vistoriasAgendadasMock', JSON.stringify(vistorias));
  }, [vistorias]);

  //função de ver detalhes da vistoria
  const handleVerDetalhes = (id) => {
    alert(`Ver detalhes da vistoria ${id}`);
    //depois acho bom colocar uma rota para ver detalhes mesmo
  };

  // cancelar vistoria
  const handleCancelarVistoria = (id, imovel) => {
    if (window.confirm(`Tem certeza que deseja cancelar a vistoria do imóvel "${imovel}"?`)) {
      const updatedVistorias = vistorias.filter(vist => vist.id !== id);
      setVistorias(updatedVistorias); // Atualiza o estado e o localStorage
      alert(`Vistoria do imóvel "${imovel}" cancelada com sucesso!`);
    }
  };

  return (
    <div className="home-container"> {/*  geral do home.css */}
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
        <div className="admin-header">
          <h1>Vistorias Agendadas</h1>
          <button className="admin-action-button" onClick={() => navigate('/nova-vistoria')}>
            + Agendar Nova Vistoria
          </button>
        </div>

        {vistorias.length === 0 ? (
          <p style={{ textAlign: 'center', marginTop: '50px', color: '#555' }}>Nenhuma vistoria agendada.</p>
        ) : (
          <table className="lista-tabela"> 
            <thead>
              <tr>
                <th>ID</th>
                <th>Imóvel</th>
                <th>Vistoriador</th>
                <th>Data</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {vistorias.map(vistoria => (
                <tr key={vistoria.id}>
                  <td>{vistoria.id}</td>
                  <td>{vistoria.imovel}</td>
                  <td>{vistoria.vistoriador}</td>
                  <td>{vistoria.data}</td>
                  <td>{vistoria.status}</td>
                  <td className="acoes-botoes">
                    <button className="btn-editar" onClick={() => handleVerDetalhes(vistoria.id)}>
                      Ver Detalhes
                    </button>
                    <button className="btn-excluir" onClick={() => handleCancelarVistoria(vistoria.id, vistoria.imovel)}>
                      Cancelar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}

export default VistoriasAgendadas; 