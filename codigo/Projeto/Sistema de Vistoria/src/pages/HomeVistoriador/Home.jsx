import "./home.css";
import { useNavigate } from "react-router-dom";

function HomeVistoriador({ onLogout }) {
  const navigate = useNavigate();

  // Placeholder data for "Vistorias Disponíveis"
  // Em uma aplicação real, esses dados viriam de uma API
  const possibleSurveys = [
    {
      id: 1,
      image: "/assets/imagensEmpreendimentos/VillageGarden.jpg",
      title: "Vistoria Casa - Turu",
      description: "Agendada para 25/06/2025",
      status: "AGENDADA" // Adicionado para refletir um possível status
    },
    {
      id: 2,
      image: "/assets/imagensEmpreendimentos/JardimDeEvora.jpg",
      title: "Vistoria Apartamento - Cidade Operária",
      description: "Agendada para 26/06/2025",
      status: "AGENDADA"
    },
    {
      id: 3,
      image: "/assets/imagensEmpreendimentos/VillageAlvorada.jpg",
      title: "Vistoria Apartamento - São Cristóvão",
      description: "Agendada para 27/06/2025",
      status: "AGENDADA"
    },
    {
      id: 4,
      image: "/assets/imagensEmpreendimentos/RanchoDasFlores.jpg", // Exemplo de vistoria em andamento
      title: "Vistoria Loja - Centro",
      description: "Em Andamento - Iniciada em 20/06/2025",
      status: "EM_ANDAMENTO"
    }
    // Você pode adicionar mais conforme necessário
  ];

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">CIVIS</div> {/* Logo permanece CIVIS */}
        <nav className="nav-links">
          {/* Change color of these links via CSS */}
          <a href="#" onClick={() => navigate("/home")}>Home</a>
          {/* Este link leva à mesma lista de vistorias, conforme "Acessar Lista de Imóveis" */}
          <a href="#" onClick={() => navigate("/vistoriador/realizar-vistoria")}>Realizar Vistoria</a>

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

      <section className="possible-surveys-section">
        <div className="menu-header-surveys">
          <h2>Vistorias Disponíveis</h2>
          <div className="search-bar-and-add-surveys">
            <div className="search-input-wrapper">
              <input type="text" placeholder="Pesquisar Vistoria..." className="search-input" />
              <span className="search-icon">🔍</span>
            </div>
            {/* O diagrama não mostra um botão de "Agendar Nova Vistoria" a partir desta tela para o vistoriador,
                focando em acessar e proceder com as vistorias existentes. */}
          </div>
        </div>

        <div className="survey-cards-container">
          {possibleSurveys.map((survey) => (
            <div key={survey.id} className="survey-card">
              <img src={survey.image} alt={survey.title} className="survey-image" />
              <h3>{survey.title}</h3>
              <p>{survey.description}</p>
              {/* O botão "Ver Vistoria" agora navega para a página de detalhes da vistoria
                  (que seria o VistoriaDataEntryPage) para 'Acessar Aba de Vistoria'. */}
              <button
                className="view-survey-button"
                onClick={() => navigate(`/vistoriador/vistoria/${survey.id}`)}
              >
                Ver Vistoria
              </button>
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

export default HomeVistoriador;