import "./Home.css";

function Home({ onLogout }) {
  return (
    <div className="home-container">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">CIVIS</div>
        <nav className="nav-links">
          <a href="#">Home</a>
          <a href="#">Nova Vistoria</a>
          <a href="#">Agendadas</a>
          <a href="#">Clientes</a>
          <a href="#">Empreendimentos</a>
          <a href="#">Funcionário</a>
        </nav>
        <button className="logout-button" onClick={onLogout}>
          Sair
        </button>
      </header>

      {/* Conteúdo principal */}
      <main className="main-content">
        <div className="texto">
          <h1>
            Sistema de <br /> <span>Gestão de Vistorias</span>
          </h1>
          <p>
            Gerencie, acompanhe e realize vistorias de forma rápida, prática e
            eficiente com o <strong>CIVIS</strong>.
          </p>

          
         
        </div>

        <div className="imagem">
          <img src="/imagens/vistoria.png" alt="Imagem Vistoria" />
        </div>
      </main>

      {/* Seção de Atalhos */}
      <section className="atalhos">
        <h2>Gerenciamento Rápido</h2>
        <div className="atalhos-cards">
          <div className="card">
            <img src="/imagens/nova-vistoria.png" alt="Nova Vistoria" />
            <h3>Nova Vistoria</h3>
          </div>
          <div className="card">
            <img src="/imagens/agendadas.png" alt="Agendadas" />
            <h3>Vistorias Agendadas</h3>
          </div>
          <div className="card">
            <img src="/imagens/imoveis.png" alt="Imóveis" />
            <h3>Imóveis</h3>
          </div>
          <div className="card">
            <img src="/imagens/clientes.png" alt="Clientes" />
            <h3>Clientes</h3>
          </div>
          <div className="card">
            <img src="/imagens/empreendimentos.png" alt="Empreendimentos" />
            <h3>Empreendimentos</h3>
          </div>
          <div className="card">
            <img src="/imagens/funcionário.png" alt="Funcionário" />
            <h3>Funcionário</h3>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
