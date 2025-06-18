import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Simula login
    navigate("/home");
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Entrar</button>
      <br />
      <Link to="/">Voltar para Inicial</Link>
    </div>
  );
}

export default Login;
