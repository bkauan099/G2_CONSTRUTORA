import "./home.css"; // Ensure this CSS path is correct
import { useNavigate } from "react-router-dom"; 

function HomeVistoriador({ onLogout }) {
  const navigate = useNavigate(); 

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">CIVIS</div>
        <nav className="nav-links">
          <a href="#" onClick={() => navigate("/home")}>Home</a>
          {/* Main entry point for the survey process */}
          <a href="#" onClick={() => navigate("/vistoriador/realizar-vistoria")}>Realizar Vistoria</a> 
          <a href="#" onClick={() => navigate("/vistoriador/criar-relatorio")}>Criar Relatório</a>
          {/* General actions for Vistoriador, if not directly part of a survey flow */}
          <a href="#" onClick={() => navigate("/vistoriador/notificar-cliente")}>Notificar Cliente</a>
        </nav>
        <button className="logout-button" onClick={onLogout}>
          Sair
        </button>
      </header>

      <main className="main-content">
        <div className="texto">
          <h1>
            Bem-vindo ao <br /> <span>CIVIS Vistoriador</span>
          </h1>
          <p>
            Gerencie suas vistorias e crie relatórios de forma rápida, prática e
            eficiente.
          </p>
        </div>

        <div className="imagem">
          <img src="/imagens/vistoria.png" alt="Imagem Vistoria" />
        </div>
      </main>

      {/* Atalhos rápidos */}
      <section className="atalhos">
        <h2>Acesso Rápido</h2>
        <div className="atalhos-cards">
          {/* Quick access for the main survey process */}
          <div className="card" onClick={() => navigate("/vistoriador/realizar-vistoria")}>
            <img src="/imagens/realizar.png" alt="Realizar Vistoria" />
            <h3>Realizar Vistoria</h3>
          </div>
          <div className="card" onClick={() => navigate("/vistoriador/criar-relatorio")}>
            <img src="/imagens/criar.png" alt="Criar Relatório" />
            <h3>Criar Relatório</h3>
          </div>
          {/* Quick access for general actions */}
          <div className="card" onClick={() => navigate("/vistoriador/notificar-cliente")}>
            <img src="/imagens/notificar.png" alt="Notificar Cliente" /> 
            <h3>Notificar Cliente</h3>
          </div>
          {/* Reagendar Vistoria is now primarily a button on the data entry page, 
              but you could have a general rescheduling dashboard here if needed.
              For now, I'm removing it from the quick access to avoid redundancy 
              with the button on the VistoriaDataEntryPage.*/}
        </div>
      </section>
    </div>
  );
}

export default HomeVistoriador;