import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import '../../Home.css'; // REMOVIDO: Não deve ser importado aqui
// import '../Clientes.css'; // REMOVIDO: Não deve ser importado aqui
import './EditarCliente.css'; // IMPORTA O NOVO CSS ESPECÍFICO

function EditarCliente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    idCliente: '',
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
  });

  useEffect(() => {
    const storedClientes = localStorage.getItem('clientesMock');
    const clientes = storedClientes ? JSON.parse(storedClientes) : [];
    
    const clienteEncontrado = clientes.find(cliente => cliente.id === parseInt(id));

    if (clienteEncontrado) {
      const sanitizedData = {
        idCliente: clienteEncontrado.idCliente || '',
        nome: clienteEncontrado.nome || '',
        cpf: clienteEncontrado.cpf || '',
        telefone: clienteEncontrado.telefone || '',
        email: clienteEncontrado.email || '',
      };
      setFormData(sanitizedData);
    } else {
      alert('Cliente não encontrado!');
      navigate('/clientes');
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const storedClientes = localStorage.getItem('clientesMock');
    let clientes = storedClientes ? JSON.parse(storedClientes) : [];

    const updatedClientes = clientes.map(cliente =>
      cliente.id === parseInt(id) ? { 
        ...formData, 
        id: parseInt(id),
        idCliente: cliente.idCliente // Garante que o idCliente permanece o original
      } : cliente
    );
    localStorage.setItem('clientesMock', JSON.stringify(updatedClientes));

    alert('Cliente atualizado com sucesso!');
    navigate('/clientes');
  };

  const handleDelete = () => {
    if (window.confirm(`ATENÇÃO: Tem certeza que deseja EXCLUIR o cliente(a) "${formData.nome}" permanentemente? Esta ação não pode ser desfeita.`)) {
      const confirmacaoFinal = prompt("Para confirmar a exclusão, digite 'EXCLUIR' no campo abaixo:");
      if (confirmacaoFinal === "EXCLUIR") {
        const storedClientes = localStorage.getItem('clientesMock');
        let clientes = storedClientes ? JSON.parse(storedClientes) : [];

        const updatedClientes = clientes.filter(cliente => cliente.id !== parseInt(id));
        localStorage.setItem('clientesMock', JSON.stringify(updatedClientes));

        alert(`Cliente(a) "${formData.nome}" excluído(a) com sucesso!`);
        navigate('/clientes');
      } else {
        alert("Exclusão cancelada ou confirmação incorreta.");
      }
    }
  };

  const handleLogout = () => { // Função de logout para o navbar
    alert('Usuário deslogado!');
    navigate('/login');
  };

  return (
    <body> {/* Remove home-container, body é filho direto do root */}
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
            {/* Ajustei o menu para refletir o que parece ser seu padrão global */}
            <a href="#" onClick={() => navigate("/nova-vistoria")}>Nova Vistoria</a> 
            <a href="#" onClick={() => navigate("/vistorias-agendadas")}>Vistorias Agendadas</a>
            <a href="#" onClick={() => navigate("/clientes")}>Clientes</a> 
            <a href="#" onClick={() => navigate("/empreendimentos")}>Empreendimentos</a> 
            <a href="#" onClick={() => navigate("/funcionarios")}>Funcionários</a>
            <a href="#" className="logout" onClick={handleLogout}>Sair</a>
        </nav>
      </header>

      <div className="container-main"> {/* Usa a classe global de container */}
        <main className="editar-cliente-content"> {/* Nova classe específica para o conteúdo do editar */}
          <div className="editar-cliente-header"> {/* Container para botão voltar e título */}
            <button className="btn-voltar" onClick={() => navigate('/clientes')}>
              &#8592; Voltar
            </button>
            <h1>Editar Cliente: <span>{formData.nome}</span></h1> {/* Adicionado span para consistência de estilo */}
          </div>

          <form onSubmit={handleUpdate} className="form-container"> {/* Usa classes globais para o formulário */}
            <div className="form-group">
              <label htmlFor="idCliente">ID Cliente:</label>
              <input type="number" id="idCliente" name="idCliente" value={formData.idCliente} onChange={handleChange} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="nome">Nome Completo:</label>
              <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="cpf">CPF:</label>
              <input type="text" id="cpf" name="cpf" value={formData.cpf} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="telefone">Telefone:</label>
              <input type="tel" id="telefone" name="telefone" value={formData.telefone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-actions"> {/* Usa classes globais para as ações do formulário */}
              <button type="button" className="btn-cancelar" onClick={() => navigate('/clientes')}>
                Cancelar
              </button>
              <button type="submit" className="btn-salvar">
                Atualizar Cliente
              </button>
              <button type="button" className="btn-excluir-form" onClick={handleDelete}> {/* Classe específica para este botão de excluir */}
                Excluir Cliente
              </button>
            </div>
          </form>
        </main>
      </div>
    </body>
  );
}

export default EditarCliente;