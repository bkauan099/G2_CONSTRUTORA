import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./inicial.css";


function Inicial() {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("inicial-body");
    return () => {
      document.body.classList.remove("inicial-body");
    };
  }, []);

  return (
    <div className="container-inicial">
      <header className="header">
        
        <h1>CIVIS</h1>
        <p>Bem-vindo ao Sistema de Vistorias da Construtora</p>
      </header>

      <div className="conteudo">
        <p>Gerencie, acompanhe e realize vistorias de forma eficiente.</p>

        <div className="botoes">
          <button onClick={() => navigate("/login")}>Realizar Login</button>
          <button onClick={() => alert("Em breve...")}>Saiba Mais</button>
        </div>
      </div>

      <footer className="footer">
        <p>© 2025 CIVIS - Todos os direitos reservados</p>
      </footer>
    </div>
  );
}

export default Inicial;
