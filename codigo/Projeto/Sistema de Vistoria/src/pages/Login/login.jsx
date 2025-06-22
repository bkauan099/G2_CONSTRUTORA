import { useNavigate } from "react-router-dom";
import "./login.css"; 

function Login({ onLogin }) {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); 

    //logica de autenticação com email e senha
    const email = e.target.elements[0].value; 
    const password = e.target.elements[1].value;

    let determinedUserType = null; //variavel para determinar o tipo de usuario

   // autenticação simples e manual
    if (email === "admin@civis.com" && password === "admin123") {
      determinedUserType = "admin";
    } else if (email === "cliente@civis.com" && password === "cliente123") {
      determinedUserType = "cliente";
    } else if (email === "vistoriador@civis.com" && password === "vistoria123") { 
      determinedUserType = "vistoriador";
    } else {
      //em caso de falha na autenticação exibe a mensagem abaixo
      alert("Email ou senha incorretos! Tente 'admin@civis.com'/'admin123', 'cliente@civis.com'/'cliente123' ou 'vistoriador@civis.com'/'vistoria123'");
      return; 

    }

    //se o login for bem sucedido exibe a mensagem de login realizado mas acho q pode ser tirado
    if (determinedUserType) {
      alert(`Login de ${determinedUserType} realizado com sucesso!`);
      onLogin(determinedUserType);
      navigate("/home"); 
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Back arrow button */}
        <button
          type="button"
          className="back-arrow"
          onClick={() => navigate("/")}
          aria-label="Voltar"
        >
          &#8592;
        </button>

        <h1 className="login-title">Login</h1>

        <form onSubmit={handleLogin} className="login-form">
          <label>Email</label>
          <input type="email" placeholder="Digite seu email" required />

          <label>Senha</label>
          <input type="password" placeholder="Digite sua senha" required />

          <button type="submit" className="login-button">
            Entrar
          </button>

          <p
            className="no-account"
            onClick={() => navigate("/cadastro-login")}
          >
            Não possui cadastro?
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

