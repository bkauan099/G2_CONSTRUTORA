import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Removendo '../home.css' (presume-se que os estilos globais venham de index.css)
import './EditarFuncionario.css'; // Importa o CSS específico para EditarFuncionario

function EditarFuncionario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    senha: '',
    telefone: '',
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
  }, []); // O array vazio [] garante que este efeito roda apenas uma vez, na montagem do componente

  // Função de logout para o navbar (copiado de outros componentes de admin)
  const handleLogout = () => {
    alert('Usuário deslogado!'); // Apenas um alerta de exemplo
    navigate('/login');
  };

  useEffect(() => {
    const storedFuncionarios = localStorage.getItem('funcionariosMock');
    const funcionarios = storedFuncionarios ? JSON.parse(storedFuncionarios) : [];
    const funcionarioEncontrado = funcionarios.find(func => func.id === parseInt(id));

    if (funcionarioEncontrado) {
      // Garante que todos os campos são string para evitar "controlled to uncontrolled"
      const sanitizedData = {
        nome: funcionarioEncontrado.nome || '',
        cpf: funcionarioEncontrado.cpf || '',
        email: funcionarioEncontrado.email || '',
        senha: funcionarioEncontrado.senha || '', // Lembre-se da segurança em produção!
        telefone: funcionarioEncontrado.telefone || '',
      };
      setFormData(sanitizedData);
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
        {/* Usando as mesmas classes de layout que CadastrarCliente/CadastrarEmpreendimento */}
        <main className="cadastrar-cliente-content"> {/* Usando nome de classe consistente */}
          <div className="cadastrar-cliente-header"> {/* Usando nome de classe consistente */}
            <button className="btn-voltar" onClick={() => navigate('/funcionarios')}>
              &#8592; Voltar
            </button>
            <h1>Editar <span>Funcionário</span>: {formData.nome}</h1> {/* Título consistente */}
          </div>

          <form onSubmit={handleUpdate} className="form-container"> {/* Usa classes globais para o formulário */}
            {/* Seções de formulário */}
            <div className="form-grid"> {/* Para layout de grid (2 colunas em desktop) */}
                <div className="form-group full-width-field"> {/* Nome completo */}
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

                <div className="form-group"> {/* CPF */}
                    <label htmlFor="cpf">CPF:</label>
                    <input
                        type="text"
                        id="cpf"
                        name="cpf"
                        value={formData.cpf}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group"> {/* Telefone */}
                    <label htmlFor="telefone">Telefone:</label>
                    <input
                        type="tel"
                        id="telefone"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group full-width-field"> {/* Email */}
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

                <div className="form-group full-width-field"> {/* Senha (para mock) */}
                    <label htmlFor="senha">Senha:</label>
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        value={formData.senha}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div> {/* Fim do form-grid */}

            <div className="form-actions"> {/* Botões de ação do formulário */}
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
    </div>
  );
}

export default EditarFuncionario;