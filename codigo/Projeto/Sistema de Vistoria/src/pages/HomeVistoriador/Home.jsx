// Example: ./pages/HomeVistoriador/Home.jsx
import "./home.css";
import { useNavigate } from "react-router-dom"; 

function HomeVistoriador({ onLogout }) { // <--- Renamed the function here
  const navigate = useNavigate(); 

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">CIVIS</div>
        <nav className="nav-links">
          <a href="#" onClick={() => navigate("/home")}>Home</a>
          <a href="#" onClick={() => navigate("/realizar-vistoria")}>Realizar Vistoria</a> 
          <a href="#" onClick={() => navigate("/criar-relatorio")}>Criar Relatório</a> {/* Changed to /criar-relatorio for consistency */}
        </nav>
        <button className="logout-button" onClick={onLogout}>
          Sair
        </button>
      </header>

      <main className="main-content">
        <div className="texto">
          <h1>
            Bem-vindo ao <br /> <span>CIVIS Vistoriador</span> {/* <--- Changed "Cliente" to "Vistoriador" */}
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
          <div className="card" onClick={() => navigate("/realizar-vistoria")}>
            <img src="/imagens/realizar.png" alt="Realizar Vistoria" />
            <h3>Realizar Vistoria</h3>
          </div>
          <div className="card" onClick={() => navigate("/criar-relatorio")}> {/* Changed to /criar-relatorio for consistency */}
            <img src="/imagens/criar.png" alt="Criar Relatório" /> {/* Removed "IA" from text as it was likely a typo */}
            <h3>Criar Relatório</h3>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeVistoriador; // <--- Renamed the export here