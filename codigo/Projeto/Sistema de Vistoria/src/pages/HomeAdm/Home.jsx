import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div>
      <h1>Home</h1>
      <p>Bem-vindo ao Sistema de Vistoria - Página Principal</p>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}

export default Home;
