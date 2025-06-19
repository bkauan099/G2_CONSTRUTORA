import { useNavigate } from "react-router-dom";
import "./login.css"; // Make sure the path to the CSS is correct

function Login({ onLogin }) {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); // Prevents page reload

    // Access input field values from the form
    const email = e.target.elements[0].value; // First form input (email)
    const password = e.target.elements[1].value; // Second form input (password)

    let determinedUserType = null; // Variable to store the user type

    // --- Simple Authentication Logic for Testing (REPLACE WITH REAL BACKEND) ---
    // This is a simulation. In a real environment, you'd send 'email' and 'password'
    // to a backend, which would validate credentials and return the user type.

    if (email === "admin@civis.com" && password === "admin123") {
      determinedUserType = "admin";
    } else if (email === "cliente@civis.com" && password === "cliente123") {
      determinedUserType = "cliente";
    } else if (email === "vistoriador@civis.com" && password === "vistoria123") { // <--- Added Vistoriador credentials
      determinedUserType = "vistoriador";
    } else {
      // Invalid credentials
      alert("Email ou senha incorretos! Tente 'admin@civis.com'/'admin123', 'cliente@civis.com'/'cliente123' ou 'vistoriador@civis.com'/'vistoria123'");
      return; // Stop function execution if login fails
    }
    // --- End of Simple Authentication Logic ---

    // If login is successful and user type is determined
    if (determinedUserType) {
      alert(`Login de ${determinedUserType} realizado com sucesso!`);
      onLogin(determinedUserType); // Call onLogin function passed via props, sending the user type
      navigate("/home"); // Redirect to /home route. App.jsx will decide which "Home" to show.
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

          {/* Signup link */}
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

