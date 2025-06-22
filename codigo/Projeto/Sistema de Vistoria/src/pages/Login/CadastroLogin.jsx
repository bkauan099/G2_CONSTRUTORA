import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; 

function Cadastro() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userType, setUserType] = useState('cliente'); 

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    const storedUsers = localStorage.getItem('usersMock');
    const users = storedUsers ? JSON.parse(storedUsers) : [];

    if (users.some(user => user.email === email)) {
      alert('Este e-mail já está cadastrado!');
      return;
    }


    //variaveis de criação de usuario
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      email,
      password, 
      type: userType,
    };

    const updatedUsers = [...users, newUser];
    localStorage.setItem('usersMock', JSON.stringify(updatedUsers));

    alert('Cadastro realizado com sucesso! Agora você pode fazer login.');
    navigate('/login');
  };

  return (
    // Página de Cadastro
    <div className="cadastro-page">
      <div className="cadastro-container">
        {/* botao de voltar para a página de login */}
        <button
          type="button"
          className="back-arrow"
          onClick={() => navigate('/login')}
          aria-label="Voltar"
        >
          &#8592;
        </button>

        <h1 className="cadastro-title">Cadastro</h1>

        { /* formulario de cadastro */}
        <form onSubmit={handleRegister} className="cadastro-form">
          <div className="form-group"> 
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Digite seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          { /* campo de senha */}
          <div className="form-group"> 
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              placeholder="Crie sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          { /* campo de confirmação de senha */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirme a Senha</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirme sua senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

        { /* campo de seleção de tipo de usuário */}
          <div className="form"> 
            <label htmlFor="userType">Tipo de Usuário:</label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="cliente">Cliente</option>
              <option value="vistoriador">Vistoriador</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          <button type="submit" className="cadastro-button">
            Cadastrar
          </button>

          <p className="login-link" onClick={() => navigate('/login')}>
            Já possui cadastro? Faça login
          </p>
        </form>
      </div>
    </div>
  );
}

export default Cadastro;