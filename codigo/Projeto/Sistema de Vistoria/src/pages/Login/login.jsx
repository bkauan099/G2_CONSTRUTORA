import { useNavigate } from "react-router-dom";
import "./login.css"
function Login (){

    const navigate = useNavigate();
    return (
        <div>
            <h1>Login</h1>
            <p>Para voltar a aba inicial, clique no botão abaixo:</p>
            <button onClick={() => navigate("/")}>
          Página Inicial
        </button>
        </div>
    );
}

export default Login