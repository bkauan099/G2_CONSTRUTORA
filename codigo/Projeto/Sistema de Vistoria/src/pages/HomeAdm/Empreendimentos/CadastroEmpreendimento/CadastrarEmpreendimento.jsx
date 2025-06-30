import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { estadosECidades } from '../../../../utils/estadosECidades';
// REMOVIDO: '../../Home.css' e '../empreendimentos.css'
import './CadastrarEmpreendimento.css'; // Importa o CSS específico para CadastrarEmpreendimento

function CadastrarEmpreendimento() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    construtora: '',
    cidade: '',
    estado: '',
    cep: '',
    rua: '',
    // Se você tiver campo para anexos, ele será tratado separadamente, mas para o formulário base, não está no formData.
  });

  const estados = Object.keys(estadosECidades);

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

  // Efeito para resetar a cidade quando o estado muda
  useEffect(() => {
    setFormData((prev) => ({ ...prev, cidade: '' }));
  }, [formData.estado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/empreendimentos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Erro desconhecido ao cadastrar." }));
        throw new Error(errorData.message || `Erro ao cadastrar empreendimento: ${response.status}`);
      }

      alert('Empreendimento cadastrado com sucesso!');
      navigate('/empreendimentos');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao cadastrar empreendimento. Verifique o console. ' + error.message);
    }
  };

  const handleLogout = () => { // Função de logout para o navbar
    alert('Usuário deslogado!');
    navigate('/login');
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
        {/* Nova classe específica para o conteúdo de cadastro, como no CadastrarCliente */}
        <main className="cadastrar-cliente-content">
          {/* Container para botão voltar e título, como no CadastrarCliente */}
          <div className="cadastrar-cliente-header">
            <button className="btn-voltar" onClick={() => navigate('/empreendimentos')}>
              &#8592; Voltar
            </button>
            <h1>Cadastrar Novo <span>Empreendimento</span></h1> {/* Adicionado span para consistência de estilo */}
          </div>

          <form onSubmit={handleSubmit} className="form-container"> {/* Usa classes globais para o formulário */}
            {/* O form-grid para layout de duas colunas, se você quiser: */}
            <div className="form-grid"> 
              <div className="form-group full-width-field">
                <label htmlFor="nome">Nome:</label>
                <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
              </div>
              
              {/* Descrição, movido para aqui para seguir o padrão */}
              <div className="form-group full-width-field">
                <label htmlFor="descricao">Descrição:</label>
                <textarea id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} rows="4"></textarea>
              </div>

              <div className="form-group full-width-field"> {/* Construtora em largura total */}
                <label htmlFor="construtora">Construtora:</label>
                <input type="text" id="construtora" name="construtora" value={formData.construtora} onChange={handleChange} />
              </div>

              <div className="form-group full-width-field"> {/* Observações em largura total */}
                <label htmlFor="observacoes">Observações:</label>
                <textarea id="observacoes" name="observacoes" value={formData.observacoes} onChange={handleChange} rows="3" />
              </div>

              {/* Anexos (Imagem) - Este campo estava no seu JSX original, mas o CSS para ele
                  estava no Empreendimentos.css (que é o CSS da LISTAGEM, não do formulário).
                  Se você não quer globalizar, o estilo dele teria que vir para CadastrarEmpreendimento.css
                  ou para um CSS de Formulário geral.
                  Para manter igual a CadastrarCliente.jsx, o CadastrarCliente.jsx não tinha este campo.
                  Vou mantê-lo aqui, mas saiba que ele precisará de estilos no CadastrarEmpreendimento.css.
              */}
              <div className="form-group full-width-field"> {/* Ocupa largura total */}
                <label htmlFor="anexos">Anexos (Imagem):</label>
                <input
                  type="file"
                  id="anexos"
                  name="anexos"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>

              {/* Subtítulo para a seção de Endereço */}
              <h2 className="form-section-title">Endereço</h2>

              <div className="form-group">
                <label htmlFor="estado">Estado:</label>
                <select id="estado" name="estado" value={formData.estado} onChange={handleChange} required>
                  <option value="">Selecione o Estado</option>
                  {estados.map((estado) => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="cidade">Cidade:</label>
                <select
                  id="cidade"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  required
                  disabled={!formData.estado}
                >
                  <option value="">Selecione a Cidade</option>
                  {formData.estado &&
                    estadosECidades[formData.estado].map((cidade) => (
                      <option key={cidade} value={cidade}>{cidade}</option>
                    ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="cep">CEP:</label>
                <input type="text" id="cep" name="cep" value={formData.cep} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="rua">Rua:</label>
                <input type="text" id="rua" name="rua" value={formData.rua} onChange={handleChange} required />
              </div>
            </div> {/* Fim do form-grid */}

            <div className="form-actions"> {/* Usa classes globais para as ações do formulário */}
              <button type="button" className="btn-cancelar" onClick={() => navigate('/empreendimentos')}>
                Cancelar
              </button>
              <button type="submit" className="btn-salvar">
                Salvar Empreendimento
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default CadastrarEmpreendimento;