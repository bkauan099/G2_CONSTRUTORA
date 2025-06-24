import "./HomeCliente.css"; 
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Home({ onLogout }) {
  const navigate = useNavigate();
  const [imoveis, setImoveis] = useState([]);

  useEffect(() => {
    const fetchImoveis = async () => {
      const idCliente = localStorage.getItem("idcliente");
      if (!idCliente) {
        alert("Cliente não identificado. Faça login novamente.");
        onLogout(); // opcional: força logout se não achar id
        return;
      }
      try {
        const res = await fetch(`http://localhost:3001/api/imoveis/cliente/${idCliente}`);
        if (!res.ok) throw new Error("Erro na resposta do servidor.");
        const data = await res.json();
        setImoveis(data);
      } catch (err) {
        console.error("Erro ao buscar imóveis:", err);
      }
    };

    fetchImoveis();
  }, [onLogout]);

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">CIVIS</div>
        <nav className="nav-links">
          <a href="#" onClick={() => navigate("/home-cliente")}>Home</a>
        </nav>
        <button className="logout-button" onClick={onLogout}>Sair</button>
      </header>

      <main className="main-content">
        <div className="texto">
          <h1>Bem-vindo ao <br /> <span>CIVIS Cliente</span></h1>
          <p>Visualize suas vistorias e acompanhe o progresso.</p>
        </div>
        <div className="imagem">
          <img src="/imagens/vistoria.png" alt="Imagem Vistoria" />
        </div>
      </main>

      {/* Botão adicionado aqui */}
      <div className="botao-central-container">
        <button
          className="botao-central"
          onClick={() => alert("Botão clicado!")}
        >
          Clique Aqui
        </button>
      </div>

      <section className="possible-surveys-section">
        <div className="menu-header-surveys">
          <h2>Imóveis e Vistorias</h2>
          <div className="search-bar-and-add-surveys">
            <div className="search-input-wrapper">
              <input type="text" placeholder="Pesquisar Vistoria..." className="search-input" />
              <span className="search-icon">🔍</span>
            </div>
          </div>
        </div>

        <div className="survey-cards-container">
          {imoveis.map((imovel) => (
            <div key={imovel.idimovel} className="survey-card">
              <img
                src={`http://localhost:3001/uploads/${imovel.anexos}`}
                alt={`Imagem do imóvel ${imovel.descricao}`}
                className="survey-image"
              />
              <h3>
                {imovel.nomeempreendimento} - Bloco {imovel.bloco}, Nº {imovel.numero}
              </h3>
              <p>
                Status: {imovel.status} <br />
                {imovel.datainiciovistoria ? `Data Agendada: ${new Date(imovel.datainiciovistoria).toLocaleDateString()}` : ''}
              </p>

              {imovel.idvistoria && (
                <button
                  className="view-survey-button"
                  onClick={() => navigate(`/cliente/vistoria/${imovel.idvistoria}`)}
                >
                  Ver Detalhes
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="pagination">
          <a href="#">&lt;</a>
          <a href="#" className="active">1</a>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#">4</a>
          <a href="#">&gt;</a>
        </div>
      </section>
    </div>
  );
}

export default Home;
