import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditarEmpreendimento.css'; // Importa o CSS específico para EditarEmpreendimento

function EditarEmpreendimento() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    construtora: '',
    dataEntrega: '',
    cidade: '',
    estado: '',
    cep: '',
    rua: '',
    condominio: '',
    bloco: '',
    numero: '',
    anexos: null
    // idEmpreendimento e idEndereco seriam IDs gerenciados pelo backend, não editáveis no form.
  });

  // ADICIONADO: Função handleLogout
  const handleLogout = () => {
    alert('Usuário deslogado!');
    navigate('/login');
  };

  // ADICIONADO: Buscar dados do empreendimento ao carregar o componente
  useEffect(() => {
    const fetchEmpreendimento = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/empreendimentos/${id}`);
        if (!response.ok) throw new Error('Empreendimento não encontrado');
        const empreendimentoEncontrado = await response.json();
        // Saneamento para garantir que todos os campos são strings para evitar "controlled to uncontrolled"
        const sanitizedData = {
          nome: empreendimentoEncontrado.nome || '',
          descricao: empreendimentoEncontrado.descricao || '',
          construtora: empreendimentoEncontrado.construtora || '',
          dataEntrega: empreendimentoEncontrado.dataEntrega || '',
          cidade: empreendimentoEncontrado.cidade || '',
          estado: empreendimentoEncontrado.estado || '',
          cep: empreendimentoEncontrado.cep || '',
          rua: empreendimentoEncontrado.rua || '',
          condominio: empreendimentoEncontrado.condominio || '',
          bloco: empreendimentoEncontrado.bloco || '',
          numero: empreendimentoEncontrado.numero || '',
          observacoes: empreendimentoEncontrado.observacoes || '',
          anexos: null
        };
        setFormData(sanitizedData);
      } catch (error) {
        alert('Empreendimento não encontrado!');
        navigate('/empreendimentos');
      }
    };
    fetchEmpreendimento();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'anexos') {
      setFormData({ ...formData, anexos: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('nome', formData.nome);
    formDataToSend.append('construtora', formData.construtora);
    formDataToSend.append('dataEntrega', formData.dataEntrega);
    formDataToSend.append('cidade', formData.cidade);
    formDataToSend.append('estado', formData.estado);
    formDataToSend.append('cep', formData.cep);
    formDataToSend.append('rua', formData.rua);
    formDataToSend.append('condominio', formData.condominio);
    formDataToSend.append('bloco', formData.bloco);
    formDataToSend.append('numero', formData.numero);
    if (formData.anexos) {
      formDataToSend.append('anexos', formData.anexos);
    }

    try {
      const response = await fetch(`http://localhost:3001/api/empreendimentos/${id}`, {
        method: 'PUT',
        body: formDataToSend,
      });

      if (!response.ok) throw new Error('Erro ao atualizar empreendimento');

      alert('Empreendimento atualizado com sucesso!');
      navigate('/empreendimentos');
    } catch (err) {
      console.error('Erro ao atualizar:', err);
      alert('Erro ao atualizar empreendimento');
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`ATENÇÃO: Tem certeza que deseja EXCLUIR o empreendimento "${formData.nome}" permanentemente? Todos os imóveis associados também serão afetados.`)) {
      const confirmacaoFinal = prompt("Para confirmar a exclusão, digite 'EXCLUIR' no campo abaixo:");
      if (confirmacaoFinal === "EXCLUIR") {
        try {
            const response = await fetch(`http://localhost:3001/api/empreendimentos/${id}`, { // Verifique se o localhost:3001 está correto
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Erro ao excluir empreendimento');
            }
            alert(`Empreendimento "${formData.nome}" excluído com sucesso!`);
            navigate('/empreendimentos');
        } catch (err) {
            console.error('Erro ao excluir:', err);
            alert('Erro ao excluir empreendimento. Verifique o console.');
        }
      } else {
        alert("Exclusão cancelada ou confirmação incorreta.");
      }
    }
  };

  return (
  
    <div> 
      <header className="header">
        <div className="logo">
          <a href="#" onClick={() => navigate("/home")}>
            <img src="src\pages\HomeAdm\logo.png" alt="Logo CIVIS" />
          </a>
        </div>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="icons">
            <i className='bx bx-menu' id="icone-menu"></i>
            <i className='bx bx-x' id="fechar-menu"></i>
        </label>
        <nav className="navbar">
            <a href="#" onClick={() => navigate("/home")}>Início</a>
            <a href="#" onClick={() => navigate("/nova-vistoria")}>Nova Vistoria</a>
            <a href="#" onClick={() => navigate("/vistorias-agendadas")}>Vistorias Agendadas</a>
            <a href="#" onClick={() => navigate("/clientes")}>Clientes</a>
            <a href="#" onClick={() => navigate("/empreendimentos")}>Empreendimentos</a>
            <a href="#" onClick={() => navigate("/funcionarios")}>Funcionários</a>
            <a href="#" className="logout" onClick={handleLogout}>Sair</a>
        </nav>
      </header>

      <div className="container-main">
        <main className="editar-empreendimento-content">
          <div className="editar-empreendimento-header">
              <button className="btn-voltar" onClick={() => navigate('/empreendimentos')}>
                &#8592; Voltar
              </button>
              <h1>Editar Empreendimento: <span>{formData.nome}</span></h1>
          </div>

          <form onSubmit={handleUpdate} className="form-container">
            <div className="form-grid">
              <div className="form-group full-width-field">
                <label htmlFor="nome">Nome:</label>
                <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
              </div>

              <div className="form-group full-width-field">
                <label htmlFor="descricao">Descrição:</label>
                <textarea id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} rows="4"></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="construtora">Construtora:</label>
                <input type="text" id="construtora" name="construtora" value={formData.construtora} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="dataEntrega">Data de Entrega:</label>
                <input type="date" id="dataEntrega" name="dataEntrega" value={formData.dataEntrega} onChange={handleChange} />
              </div>

              <div className="form-group full-width-field">
                <label htmlFor="observacoes">Observações:</label>
                <textarea id="observacoes" name="observacoes" value={formData.observacoes} onChange={handleChange} rows="3"></textarea>
              </div>

              <h2 className="form-section-title">Endereço</h2>

              <div className="form-group">
                <label htmlFor="rua">Rua:</label>
                <input type="text" id="rua" name="rua" value={formData.rua} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="numero">Número:</label>
                <input type="text" id="numero" name="numero" value={formData.numero} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="cidade">Cidade:</label>
                <input type="text" id="cidade" name="cidade" value={formData.cidade} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="estado">Estado:</label>
                <input type="text" id="estado" name="estado" value={formData.estado} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="cep">CEP:</label>
                <input type="text" id="cep" name="cep" value={formData.cep} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="condominio">Condomínio:</label>
                <input type="text" id="condominio" name="condominio" value={formData.condominio} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="bloco">Bloco:</label>
                <input type="text" id="bloco" name="bloco" value={formData.bloco} onChange={handleChange} />
              </div>
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
    </div>
  );
}

export default EditarEmpreendimento;