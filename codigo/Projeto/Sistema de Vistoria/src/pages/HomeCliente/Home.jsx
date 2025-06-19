import "./HomeCliente.css";
import { useNavigate } from "react-router-dom"; 

function Home({ onLogout }) {
  const navigate = useNavigate(); 

  return (
    <div className="home-container">
      
      <header className="navbar">
        <div className="logo">CIVIS</div>
        <nav className="nav-links">
          <a href="#" onClick={() => navigate("/home")}>Home</a>
          <a href="#" onClick={() => navigate("/agendar-vistoria")}>Agendar Vistoria</a> 
          <a href="#" onClick={() => navigate("/minhas-vistorias")}>Minhas Vistorias</a> 
          <a href="#" onClick={() => navigate("/meus-imoveis")}>Meus Imóveis</a> 
        </nav>
        <button className="logout-button" onClick={onLogout}>
          Sair
        </button>
      </header>

      
      <main className="main-content">
        <div className="texto">
          <h1>
            Bem-vindo ao <br /> <span>CIVIS Cliente</span>
          </h1>
          <p>
            Gerencie seus imóveis e acompanhe suas vistorias de forma rápida, prática e
            eficiente.
          </p>
        </div>

        <div className="imagem">
          <img src="/imagens/vistoria.png" alt="Imagem Vistoria" />
        </div>
      </main>

     {/*atalhos rapidos, talvez tire*/}
      <section className="atalhos">
        <h2>Acesso Rápido</h2>
        <div className="atalhos-cards">
          <div className="card" onClick={() => navigate("/agendar-vistoria")}>
            <img src="/imagens/nova-vistoria.png" alt="Agendar Vistoria" />
            <h3>Agendar Vistoria</h3>
          </div>
          <div className="card" onClick={() => navigate("/minhas-vistorias")}>
            <img src="/imagens/agendadas.png" alt="Minhas Vistorias" />
            <h3>Minhas Vistorias</h3>
          </div>
          <div className="card" onClick={() => navigate("/meus-imoveis")}>
            <img src="/imagens/imoveis.png" alt="Meus Imóveis" />
            <h3>Meus Imóveis</h3>
          </div>
          
        </div>
      </section>
    </div>
  );
}

export default Home;