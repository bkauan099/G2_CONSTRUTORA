import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../home.css'; 

function EditarFuncionario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    cargo: '',
    email: '',
    telefone: '',
    dataContratacao: '',
  });

  useEffect(() => {
    const storedFuncionarios = localStorage.getItem('funcionariosMock');
    const funcionarios = storedFuncionarios ? JSON.parse(storedFuncionarios) : [];
    const funcionarioEncontrado = funcionarios.find(func => func.id === parseInt(id));

    if (funcionarioEncontrado) {
      setFormData(funcionarioEncontrado);
    } else {
      alert('Funcionário não encontrado!');
      navigate('/funcionarios'); 
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const storedFuncionarios = localStorage.getItem('funcionariosMock');
    let funcionarios = storedFuncionarios ? JSON.parse(storedFuncionarios) : [];

    const updatedFuncionarios = funcionarios.map(func =>
      func.id === parseInt(id) ? { ...formData, id: parseInt(id) } : func
    );
    localStorage.setItem('funcionariosMock', JSON.stringify(updatedFuncionarios));

    alert('Funcionário atualizado com sucesso!');
    navigate('/funcionarios'); 
  };

  const handleDelete = () => {
    if (window.confirm(`ATENÇÃO: Tem certeza que deseja EXCLUIR o funcionário(a) ${formData.nome} permanentemente? Esta ação não pode ser desfeita.`)) {
      const confirmacaoFinal = prompt("Para confirmar a exclusão, digite 'EXCLUIR' no campo abaixo:");
      if (confirmacaoFinal === "EXCLUIR") {
        const storedFuncionarios = localStorage.getItem('funcionariosMock');
        let funcionarios = storedFuncionarios ? JSON.parse(storedFuncionarios) : [];

        const updatedFuncionarios = funcionarios.filter(func => func.id !== parseInt(id));
        localStorage.setItem('funcionariosMock', JSON.stringify(updatedFuncionarios));

        alert(`Funcionário(a) ${formData.nome} excluído(a) com sucesso!`);
        navigate('/funcionarios'); 
      } else {
        alert("Exclusão cancelada ou confirmação incorreta.");
      }
    }
  };

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">CIVIS (Admin)</div>
        <nav className="nav-links">
          <a href="#" onClick={() => navigate("/home")}>Home</a>
          <a href="#" onClick={() => navigate("/funcionarios")}>Funcionários</a>
        </nav>
        <button className="logout-button" onClick={() => {navigate("/login"); }}>
          Sair
        </button>
      </header>

      <main className="admin-page-container">
        <button className="back-arrow" onClick={() => navigate('/funcionarios')} style={{ marginBottom: '20px' }}>
          &#8592; Voltar
        </button>
        <h1 style={{ marginBottom: '30px', color: '#004080' }}>Editar Funcionário: {formData.nome}</h1>

        <form onSubmit={handleUpdate} className="form-container">
          <div className="form-group">
            <label htmlFor="nome">Nome Completo:</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cargo">Cargo:</label>
            <input
              type="text"
              id="cargo"
              name="cargo"
              value={formData.cargo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone:</label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dataContratacao">Data de Contratação:</label>
            <input
              type="date"
              id="dataContratacao"
              name="dataContratacao"
              value={formData.dataContratacao}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancelar" onClick={() => navigate('/funcionarios')}>
              Cancelar
            </button>
            <button type="submit" className="btn-salvar">
              Atualizar Funcionário
            </button>
            <button type="button" className="btn-excluir-form" onClick={handleDelete}>
              Excluir Funcionário
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default EditarFuncionario; 