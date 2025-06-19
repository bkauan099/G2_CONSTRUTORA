import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../home.css';
import './empreendimentos.css';


//função de editar
function EditarEmpreendimento() {
  const { id } = useParams();
  const navigate = useNavigate();

  //variaveis 
  const [formData, setFormData] = useState({
    nome: '',
    endereco: '',
    descricao: '',
  });

  useEffect(() => {
    const storedEmpreendimentos = localStorage.getItem('empreendimentosMock');
    const empreendimentos = storedEmpreendimentos ? JSON.parse(storedEmpreendimentos) : [];
    const empreendimentoEncontrado = empreendimentos.find(emp => emp.id === parseInt(id));

    if (empreendimentoEncontrado) {
      setFormData(empreendimentoEncontrado);
    } else {
      alert('Empreendimento não encontrado!');
      navigate('/empreendimentos');
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const storedEmpreendimentos = localStorage.getItem('empreendimentosMock');
    let empreendimentos = storedEmpreendimentos ? JSON.parse(storedEmpreendimentos) : [];

    const updatedEmpreendimentos = empreendimentos.map(emp =>
      emp.id === parseInt(id) ? { ...formData, id: parseInt(id) } : emp
    );
    localStorage.setItem('empreendimentosMock', JSON.stringify(updatedEmpreendimentos));

    alert('Empreendimento atualizado com sucesso!');
    navigate('/empreendimentos');
  };

  const handleDelete = () => {
    if (window.confirm(`ATENÇÃO: Tem certeza que deseja EXCLUIR o empreendimento "${formData.nome}" permanentemente?  Todos os imóveis associados também serão afetados.`)) {
      const confirmacaoFinal = prompt("Para confirmar a exclusão, digite 'EXCLUIR' no campo abaixo:");
      if (confirmacaoFinal === "EXCLUIR") {
        const storedEmpreendimentos = localStorage.getItem('empreendimentosMock');
        let empreendimentos = storedEmpreendimentos ? JSON.parse(storedEmpreendimentos) : [];

        const updatedEmpreendimentos = empreendimentos.filter(emp => emp.id !== parseInt(id));
        localStorage.setItem('empreendimentosMock', JSON.stringify(updatedEmpreendimentos));

        

        alert(`Empreendimento "${formData.nome}" excluído com sucesso!`);
        navigate('/empreendimentos');
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
          <a href="#" onClick={() => navigate("/empreendimentos")}>Empreendimentos</a>
        </nav>
        <button className="logout-button" onClick={() => {navigate("/login"); }}>
          Sair
        </button>
      </header>

      <main className="admin-page-container">
        <button className="back-arrow" onClick={() => navigate('/empreendimentos')} style={{ marginBottom: '20px' }}>
          &#8592; Voltar
        </button>
        <h1 style={{ marginBottom: '30px', color: '#004080' }}>Editar Empreendimento: {formData.nome}</h1>

        <form onSubmit={handleUpdate} className="form-container">
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="endereco">Endereço:</label>
            <input type="text" id="endereco" name="endereco" value={formData.endereco} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="descricao">Descrição:</label>
            <textarea id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} rows="4"></textarea>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancelar" onClick={() => navigate('/empreendimentos')}>
              Cancelar
            </button>
            <button type="submit" className="btn-salvar">
              Atualizar Empreendimento
            </button>
            <button type="button" className="btn-excluir-form" onClick={handleDelete}>
              Excluir Empreendimento
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default EditarEmpreendimento;