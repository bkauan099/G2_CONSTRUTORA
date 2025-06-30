import { useNavigate } from 'react-router-dom';
import './Home.css'; // Importa o CSS específico para Home

// Componente Home
function Home({ onLogout }) {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    alert('Usuário deslogado!'); 
    onLogout(); 
    navigate('/login'); 
  };

  return (
    <> 
      <body> 
        {/* INICIO DO NAVBAR */}
        <header className="header"> 
          {/*logo*/}
          <div className="logo"> 
           <a href="#" onClick={() => navigate("/home")}>
            <img src="src\pages\HomeAdm\logo.png" >
            </img> 
          </a>
          </div>
            <input type="checkbox" id="check" style={{ display: 'none' }} />
            <label htmlFor="check" className="icons"> 
                <i className='bx bx-menu' id="icone-menu"></i>
                <i className='bx bx-x' id="fechar-menu"></i>
            </label>

            {/* Navegação Principal: Classe 'navbar' para os links e o botão de logout */}
            <nav className="navbar"> 
                <a href="#" onClick={() => navigate("/home")}>Início</a> 
                <a href="#" onClick={() => navigate("/nova-vistoria")}>Nova Vistoria</a> 
                <a href="#" onClick={() => navigate("/vistorias-agendadas")}>Vistorias Agendadas</a>
                <a href="#" onClick={() => navigate("/clientes")}>Clientes</a> 
                <a href="#" onClick={() => navigate("/empreendimentos")}>Empreendimentos</a> 
                <a href="#" onClick={() => navigate("/funcionarios")}>Funcionários</a> 
                {/* eu substitui o botao pelo <a> mesmo pra ser padrão no nav */}
                <a href="#" className="logout" onClick={handleLogout}>Sair</a>
            </nav>
        </header>
        {/*FIM DO NAVBAR*/}

      {/*INÍCIO DO CONTEUDO PRINCIPAL MOSTRADO */}
      <div className="container-main">
        {/*CONTEÚDO COM TEXTO*/}
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
      {/*FIM DO CONTEUDO PRINCIPAL MOSTRADO */}

      {/* INÍCIO DA SEÇÃO DE ATALHOS */}
      </div>
      <section className="atalhos">
          <h2>Gerenciamento Rápido</h2>
          <div className="atalhos-cards" >
            <div className="card" onClick={() => navigate("/nova-vistoria")}>
              <img src="/assets/nova.png" alt="Nova Vistoria" />
              <h3>Nova Vistoria</h3>
            </div>
            <div className="card" onClick={() => navigate("/vistorias-agendadas")}>
              <img src="/assets/agendada.png" alt="Agendadas" />
              <h3>Vistorias Agendadas</h3>
            </div>
              <div className="card" onClick={() => navigate("/clientes")}>
              <img src="/assets/cliente.png" alt="Clientes" />
              <h3>Clientes</h3>
            </div>
            <div className="card" onClick={() => navigate("/empreendimentos")}>
              <img src="/assets/empreendimentos.png" alt="Empreendimentos" />
              <h3>Empreendimentos</h3>
            </div>
            <div className="card" onClick={() => navigate("/funcionarios")}>
              <img src="/assets/funcionario.jpg" alt="Funcionário" />
              <h3>Funcionário</h3>
            </div>
          </div>
        </section>
    </body>
    </>
  );
}

export default Home;