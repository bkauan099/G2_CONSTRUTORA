import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../../home.css';
import '../Imoveis.css';

function CadastrarImovel() {
  const navigate = useNavigate();
  const location = useLocation();
  const empreendimentoid = new URLSearchParams(location.search).get('empreendimentoid');

  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    idcliente: '',
    descricao: '',
    bloco: '',
    numero: '',
  });

  // Carregar clientes ao iniciar
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/clientes');
        const data = await res.json();
        setClientes(data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };
    fetchClientes();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'anexos') {
      setFormData({ ...formData, anexos: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!empreendimentoid) {
      alert('Empreendimento ID não encontrado na URL.');
      return;
    }

    const formDataToSend = {
      descricao: formData.descricao,
      bloco: formData.bloco,
      numero: formData.numero,
      idcliente: formData.idcliente,
      idempreendimento: empreendimentoid
    };

    try {
      const response = await fetch('http://localhost:3001/api/imoveis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar imóvel.');
      }

      alert('Imóvel cadastrado com sucesso!');
      navigate(`/imoveis?empreendimentoid=${empreendimentoid}`);
    } catch (error) {
      console.error('Erro ao cadastrar imóvel:', error);
      alert('Erro ao cadastrar imóvel.');
    }
  };


  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">CIVIS (Admin)</div>
        <nav className="nav-links">
          <a href="#" onClick={() => navigate("/home")}>Home</a>
          <a href="#" onClick={() => navigate("/empreendimentos")}>Empreendimentos</a>
          <a href="#" onClick={() => navigate(`/imoveis?empreendimentoid=${empreendimentoid}`)}>Imóveis</a>
        </nav>
        <button className="logout-button" onClick={() => navigate("/login")}>Sair</button>
      </header>

      <main className="admin-page-container">
        <button
          className="back-arrow"
          onClick={() => navigate(`/imoveis?empreendimentoid=${empreendimentoid}`)}
          style={{ marginBottom: '20px' }}
        >
          &#8592; Voltar
        </button>
        <h1 className="titulo-centralizado">Cadastrar Novo Imóvel</h1>


        <form onSubmit={handleSubmit} className="form-container" encType="multipart/form-data">
          {/* Select Cliente */}
          <div className="form-group">
            <label htmlFor="idcliente">Selecione o Cliente:</label>
            <select
              id="idcliente"
              name="idcliente"
              value={formData.idcliente}
              onChange={handleChange}
              required
            >
              <option value="">-- Escolha --</option>
              {clientes.map(c => (
                <option key={c.idcliente} value={c.idcliente}>
                  {c.nome} - {c.cpf}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="descricao">Descrição:</label>
            <input
              type="text"
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="bloco">Bloco:</label>
            <input
              type="text"
              id="bloco"
              name="bloco"
              value={formData.bloco}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="numero">Número:</label>
            <input
              type="text"
              id="numero"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="anexos">Anexos (Imagem):</label>
            <input
              type="file"
              id="anexos"
              name="anexos"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn-cancelar"
              onClick={() => navigate(`/imoveis?empreendimentoid=${empreendimentoid}`)}
            >
              Cancelar
            </button>
            <button type="submit" className="btn-salvar">
              Salvar Imóvel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default CadastrarImovel;
