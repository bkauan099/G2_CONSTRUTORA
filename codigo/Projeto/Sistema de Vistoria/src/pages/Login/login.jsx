import { useNavigate } from "react-router-dom";
import "./login.css"; // Certifique-se de que o caminho para o CSS está correto

function Login({ onLogin }) {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    // Acessa os valores dos campos de input pelo formulário
    const email = e.target.elements[0].value; // Primeiro input do formulário (email)
    const password = e.target.elements[1].value; // Segundo input do formulário (senha)

    let determinedUserType = null; // Variável para armazenar o tipo de usuário

    // --- Lógica de Autenticação Simples para Teste (SUBSTITUIR POR BACKEND REAL) ---
    // Esta é uma simulação. Em um ambiente real, você enviaria 'email' e 'password'
    // para um backend, que validaria as credenciais e retornaria o tipo de usuário.

    if (email === "admin@civis.com" && password === "admin123") {
      determinedUserType = "admin";
    } else if (email === "cliente@civis.com" && password === "cliente123") {
      determinedUserType = "cliente";
    } else {
      // Credenciais inválidas
      alert("Email ou senha incorretos! Tente 'admin@civis.com'/'admin123' ou 'cliente@civis.com'/'cliente123'");
      return; // Interrompe a execução da função se o login falhar
    }
    // --- Fim da Lógica de Autenticação Simples ---

    // Se o login for bem-sucedido e o tipo de usuário for determinado
    if (determinedUserType) {
      alert(`Login de ${determinedUserType} realizado com sucesso!`);
      onLogin(determinedUserType); // Chama a função onLogin passada via props, enviando o tipo de usuário
      navigate("/home"); // Redireciona para a rota /home. O App.jsx decidirá qual "Home" mostrar.
    }
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

