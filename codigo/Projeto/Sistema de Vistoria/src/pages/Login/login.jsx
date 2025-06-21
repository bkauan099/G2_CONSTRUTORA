import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./login.css";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.elements[0].value;
    const senha = e.target.elements[1].value;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.erro || "Erro desconhecido.");
      }

      const data = await response.json();
      const tipo = data.tipo;

      alert(`Login de ${tipo} realizado com sucesso!`);
      onLogin(tipo);
      navigate(`/home/${tipo}`);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <button type="button" className="back-arrow" onClick={() => navigate("/")}>
          &#8592;
        </button>

        <h1 className="login-title">Login</h1>

        <form onSubmit={handleLogin} className="login-form">
          <label>Email</label>
          <input type="email" placeholder="Digite seu email" required />

          <label>Senha</label>
          <input type="password" placeholder="Digite sua senha" required />

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <p className="no-account" onClick={() => navigate("/cadastro")}>
            Não possui cadastro?
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
