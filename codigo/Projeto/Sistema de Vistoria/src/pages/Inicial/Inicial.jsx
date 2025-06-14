import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./inicial.css";

function Inicial() {

 useEffect(() => {
    document.body.classList.add("inicial-body");
    return () => {
      document.body.classList.remove("inicial-body");
    };
  }, []);
  
  const navigate = useNavigate();

  return (
    <div>
      <h1>Bem-vindo ao CIVIS</h1>
      <div >
        <p>Para realizar o login, clique no botão abaixo:</p>
        <button onClick={() => navigate("/login")}>
          Realizar login
        </button>
      </div>
    </div>
  );
}

export default Inicial;
