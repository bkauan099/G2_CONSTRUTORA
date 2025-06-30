import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Removendo imports de CSS externos como '../../home.css' e '../Imoveis.css'
// pois os estilos serão replicados em EditarImovel.css
import './EditarImovel.css'; // Importa o CSS específico para EditarImovel

function EditarImovel() {
  const { id } = useParams(); // Pega o ID do imóvel da URL
  const navigate = useNavigate();

  // variaveis pra armazenar os dados q foram editados
  const [formData, setFormData] = useState({
    idImovel: '', // Este parece ser um ID interno ou secundário
    descricao: '',
    tipo: '',
    observacao: '',
    numeroUnidade: '',
    idEmpreendimento: '',
    // idCliente: '', // não sei quando implementar
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
    alert('Usuário deslogado!'); // Apenas um alerta de exemplo, sua lógica real de logout deve ser implementada aqui
    navigate('/login');
  };

  // Carrega os dados do imóvel do backend
  useEffect(() => {
    const fetchImovel = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/imoveis/${id}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar imóvel');
        }
        const data = await response.json();
        // Saneamento para garantir que todos os campos são strings para evitar "controlled to uncontrolled"
        const sanitizedData = {
          idImovel: data.idimovel || '', // Use o campo correto do seu backend para o ID do imóvel
          descricao: data.descricao || '',
          tipo: data.tipo || '',
          observacao: data.observacao || '',
          anexos: data.anexos || '', // Assumindo que o backend retorna a URL/caminho do anexo
          numeroUnidade: data.numero || '', // Mapeando 'numero' do backend para 'numeroUnidade'
          bloco: data.bloco || '', // Adicionado bloco, que está no formData
          idEmpreendimento: data.idempreendimento || '', // Use o campo correto do seu backend para o ID do empreendimento
        };
        setFormData(sanitizedData);
      } catch (err) {
        console.error('Erro ao buscar imóvel:', err);
        alert('Erro ao carregar imóvel. Verifique o console.');
        navigate('/imoveis');
      }
    };
    fetchImovel();
  }, [id, navigate]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => { // Tornar assíncrona para usar fetch
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/api/imoveis/${id}`, {
        method: 'PUT', // ou PATCH, dependendo da sua API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar imóvel.');
      }

      alert('Imóvel atualizado com sucesso!');
      // Redirecionar para a listagem de imóveis do empreendimento correto
      navigate(`/imoveis?empreendimentoid=${formData.idEmpreendimento}`);
    } catch (error) {
      console.error('Erro ao atualizar imóvel:', error);
      alert('Erro ao atualizar imóvel.');
    }
  };

  const handleDelete = async () => { // Tornar assíncrona para usar fetch
    if (window.confirm(`ATENÇÃO: Tem certeza que deseja EXCLUIR o imóvel "${formData.descricao}" permanentemente? Esta ação não pode ser desfeita.`)) {
      const confirmacaoFinal = prompt("Para confirmar a exclusão, digite 'EXCLUIR' no campo abaixo:");
      if (confirmacaoFinal === "EXCLUIR") {
        try {
          const response = await fetch(`http://localhost:3001/api/imoveis/${id}`, { method: 'DELETE' });
          if (!response.ok) {
            throw new Error('Erro ao excluir imóvel.');
          }

          alert(`Imóvel "${formData.descricao}" excluído(a) com sucesso!`);
          // Redirecionar para a listagem de imóveis do empreendimento correto
          navigate(`/imoveis?empreendimentoid=${formData.idEmpreendimento}`);
        } catch (error) {
          console.error('Erro ao excluir imóvel:', error);
          alert('Erro ao excluir imóvel.');
        }
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
        <main className="cadastrar-cliente-content"> {/* Mantido o nome da classe para consistência com o que já existe */}
          <div className="cadastrar-cliente-header"> {/* Mantido o nome da classe para consistência */}
            <button className="btn-voltar" onClick={() => navigate(`/imoveis?empreendimentoid=${formData.idEmpreendimento}`)}>
              &#8592; Voltar
            </button>
            <h1>Editar <span>Imóvel</span>: {formData.descricao}</h1> {/* Título consistente com CadastrarCliente */}
          </div>

          <form onSubmit={handleUpdate} className="form-container"> {/* Usa classes globais para o formulário */}
            <div className="form-grid"> {/* Para layout de duas colunas */}
                <div className="form-group">
                    <label htmlFor="idImovel">ID do Imóvel:</label>
                    <input
                        type="number"
                        id="idImovel"
                        name="idImovel"
                        value={formData.idImovel}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="idEmpreendimento">ID do Empreendimento:</label>
                    <input
                        type="number"
                        id="idEmpreendimento"
                        name="idEmpreendimento"
                        value={formData.idEmpreendimento}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group full-width-field">
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
                    <label htmlFor="tipo">Tipo:</label>
                    <select
                        id="tipo"
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione o Tipo</option>
                        <option value="Apartamento">Apartamento</option>
                        <option value="Casa">Casa</option>
                        <option value="Comercial">Comercial</option>
                        <option value="Terreno">Terreno</option>
                    </select>
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

                <div className="form-group"> {/* Número da Unidade (campo para o número em si) */}
                    <label htmlFor="numeroUnidade">Número da Unidade:</label>
                    <input
                        type="text"
                        id="numeroUnidade"
                        name="numeroUnidade"
                        value={formData.numeroUnidade}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group full-width-field">
                    <label htmlFor="observacao">Observação:</label>
                    <textarea
                        id="observacao"
                        name="observacao"
                        value={formData.observacao}
                        onChange={handleChange}
                        rows="3"
                    ></textarea>
                </div>

                <div className="form-group full-width-field">
                    <label htmlFor="anexos">Anexos (URL/Caminho):</label>
                    <input
                        type="text"
                        id="anexos"
                        name="anexos"
                        value={formData.anexos}
                        onChange={handleChange}
                    />
                </div>
            </div> {/* Fim do form-grid */}

            <div className="form-actions"> {/* Botões de ação do formulário */}
              <button type="button" className="btn-cancelar" onClick={() => navigate(`/imoveis?empreendimentoid=${formData.idEmpreendimento}`)}>
                Cancelar
              </button>
              <button type="submit" className="btn-salvar">
                Atualizar Imóvel
              </button>
              <button type="button" className="btn-excluir-form" onClick={handleDelete}>
                Excluir Imóvel
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}

export default EditarImovel;