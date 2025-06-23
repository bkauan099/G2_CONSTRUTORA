import { useNavigate } from "react-router-dom";
import { useState } from "react"; // Necessário para useState em ambos os casos
import "./login.css"; 

function Login({ onLogin }) {
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(false); // Esta linha era usada para o loading da versão de backend

  const handleLogin = (e) => { // Descomentar este handleLogin
    e.preventDefault(); 

    //logica de autenticação com email e senha
    const email = e.target.elements[0].value; 
    const password = e.target.elements[1].value;

    let determinedUserType = null; //variavel para determinar o tipo de usuario

    // NOVO: Verifica usuários cadastrados no localStorage (para o cadastro front-end)
    const storedUsers = localStorage.getItem('usersMock');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    const foundUser = users.find(user => user.email === email && user.password === password);

    if (foundUser) {
      determinedUserType = foundUser.type;
    } else if (email === "admin@civis.com" && password === "admin123") { // autenticação simples e manual
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
      navigate("/home"); // Redireciona para /home. App.jsx vai mostrar a Home correta.
    }
  };


  // COMENTAR A VERSÃO COM BACKEND
  /*
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
      navigate(`/home/${tipo}`); // Se usar rotas dinâmicas como /home/admin
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };
  */

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
            {/* {loading ? "Entrando..." : "Entrar"} */ "Entrar"} {/* Botão sem loading text */}
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