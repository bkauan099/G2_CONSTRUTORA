import { useNavigate } from "react-router-dom";
import "./login.css";

function Login({ onLogin }) {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Login realizado com sucesso!");
    onLogin();
    navigate("/home");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Setinha no canto superior esquerdo */}
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

          {/* Link de cadastro */}
          <p
            className="no-account"
            onClick={() => navigate("/cadastro")}
          >
            Não possui cadastro?
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;

