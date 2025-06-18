import { Link } from "react-router-dom";

function Inicial() {
  return (
    <div>
      <h1>Página Inicial</h1>
      <p>Bem-vindo ao Sistema de Vistoria.</p>
      <Link to="/login">Ir para Login</Link>
    </div>
  );
}

export default Inicial;
