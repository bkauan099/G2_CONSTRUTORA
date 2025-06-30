import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './CadastrarImovel.css'; // Importa o CSS específico para CadastrarImovel

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
    // REMOVIDO: anexos: null,
  });

  // NOVO useEffect para controlar a classe do body com base no checkbox (copiado de Clientes.jsx)
  useEffect(() => {
    const checkbox = document.getElementById('check');
    if (!checkbox) return; // Garante que o checkbox existe

    const handleCheckboxChange = () => {
      if (checkbox.checked) {
        document.body.classList.add('menu-aberto');
      } else {
        document.body.classList.remove('menu-aberto');
      }
    };

    checkbox.addEventListener('change', handleCheckboxChange);

    return () => {
      checkbox.removeEventListener('change', handleCheckboxChange);
    };
  }, []);

  // Função de logout para o navbar (copiado de outros componentes de admin)
  const handleLogout = () => {
    alert('Usuário deslogado!');
    navigate('/login');
  };

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
    const { name, value } = e.target;
    // REMOVIDO: if (name === 'anexos') { setFormData({ ...formData, anexos: files[0] }); } else { ... }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!empreendimentoid) {
      alert('Empreendimento ID não encontrado na URL.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('descricao', formData.descricao);
    formDataToSend.append('bloco', formData.bloco);
    formDataToSend.append('numero', formData.numero);
    formDataToSend.append('idcliente', formData.idcliente);
    formDataToSend.append('idempreendimento', empreendimentoid);

    // REMOVIDO: if (formData.anexos) { formDataToSend.append('anexos', formData.anexos); }

    try {
      const response = await fetch('http://localhost:3001/api/imoveis', {
        method: 'POST',
        body: formDataToSend, // Note: se você não estiver enviando arquivos, pode usar 'application/json' e JSON.stringify(formData)
        // headers: { 'Content-Type': 'application/json' }, // Descomente esta linha e use JSON.stringify(formData) se não enviar arquivos
                                                            // mas certifique-se que o backend aceita isso
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
    <div> 
      <header className="header"> {/* Usa a classe global de navbar */}
        <div className="logo">
           <a href="#" onClick={() => navigate("/home")}>
            <img src="src\pages\HomeAdm\logo.png" alt="Logo CIVIS" />
          </a>
        </div>
        <input type="checkbox" id="check" /> {/* input#check sem style para JS controlar */}
        <label htmlFor="check" className="icons">
            <i className='bx bx-menu' id="icone-menu"></i>
            <i className='bx bx-x' id="fechar-menu"></i>
        </label>
        <nav className="navbar"> {/* Usa a classe global de navbar */}
            <a href="#" onClick={() => navigate("/home")}>Início</a>
            <a href="#" onClick={() => navigate("/nova-vistoria")}>Nova Vistoria</a> 
            <a href="#" onClick={() => navigate("/vistorias-agendadas")}>Vistorias Agendadas</a>
            <a href="#" onClick={() => navigate("/clientes")}>Clientes</a> 
            <a href="#" onClick={() => navigate("/empreendimentos")}>Empreendimentos</a> 
            <a href="#" onClick={() => navigate("/funcionarios")}>Funcionários</a>
            <a href="#" className="logout" onClick={handleLogout}>Sair</a>
        </nav>
      </header>

      <div className="container-main"> {/* Usa a classe global de container */}
        {/* Usando as mesmas classes de layout que CadastrarCliente */}
        <main className="cadastrar-cliente-content">
          <div className="cadastrar-cliente-header">
            <button className="btn-voltar" onClick={() => navigate(`/imoveis?empreendimentoid=${empreendimentoid}`)}>
              &#8592; Voltar
            </button>
            <h1>Cadastrar Novo <span>Imóvel</span></h1> {/* Título consistente com CadastrarCliente */}
          </div>

          <form onSubmit={handleSubmit} className="form-container" encType="multipart/form-data">
            {/* Os campos do formulário usam as classes globais form-group, form-grid, full-width-field */}
            <div className="form-grid">
                <div className="form-group full-width-field"> {/* Select Cliente */}
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

                <div className="form-group full-width-field"> {/* Descrição */}
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

                <div className="form-group"> {/* Bloco */}
                    <label htmlFor="bloco">Bloco:</label>
                    <input
                        type="text"
                        id="bloco"
                        name="bloco"
                        value={formData.bloco}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group"> {/* Número */}
                    <label htmlFor="numero">Número:</label>
                    <input
                        type="text"
                        id="numero"
                        name="numero"
                        value={formData.numero}
                        onChange={handleChange}
                    />
                </div>

                {/* REMOVIDO: Campo Anexos (Imagem) */}
            </div> {/* Fim do form-grid */}

            <div className="form-actions"> {/* Botões de ação do formulário */}
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
    </div>
  );
}

export default CadastrarImovel;