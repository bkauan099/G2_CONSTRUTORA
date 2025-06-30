import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NovaVistoria.css';


function NovaVistoria() {
  const navigate = useNavigate();
  const [empreendimentos, setEmpreendimentos] = useState([]);
  const [imoveis, setImoveis] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [vistoriadores, setVistoriadores] = useState([]);

  const [selectedEmpreendimentoId, setSelectedEmpreendimentoId] = useState('');
  const [formData, setFormData] = useState({
    idimovel: '',
    idcliente: '',
    idvistoriador: '',
    observacoes: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empRes, cliRes, vistRes] = await Promise.all([
          fetch('http://localhost:3001/api/empreendimentos'),
          fetch('http://localhost:3001/api/clientes'),
          fetch('http://localhost:3001/api/vistoriadores'),
        ]);

        setEmpreendimentos(await empRes.json());
        setClientes(await cliRes.json());
        setVistoriadores(await vistRes.json());
      } catch (err) {
        console.error('Erro ao carregar dados iniciais:', err);
      }
    };

    fetchData();
  }, []);

  const handleEmpreendimentoChange = async (e) => {
    const id = e.target.value;
    setSelectedEmpreendimentoId(id);
    setFormData({ ...formData, idimovel: '' });

    try {
      const res = await fetch(`http://localhost:3001/api/imoveis?empreendimentoid=${id}`);
      setImoveis(await res.json());
    } catch (err) {
      console.error('Erro ao carregar imóveis:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      idcliente: formData.idcliente,
      idvistoriador: formData.idvistoriador,
      idimovel: formData.idimovel,
      observacoes: formData.observacoes,
      datainicio: new Date().toISOString(),
    };

    try {
      const res = await fetch('http://localhost:3001/api/vistorias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Erro detalhado ao agendar vistoria:', errorText);
        throw new Error('Erro ao agendar vistoria.');
      }

      const novaVistoria = await res.json();
      alert('Vistoria agendada com sucesso!');
      navigate(`/vistorias-agendadas/${novaVistoria.idvistoria}`);
    } catch (err) {
      console.error('Erro ao agendar vistoria:', err);
      alert('Erro ao agendar vistoria.');
    }
  };
  const handleLogout = () => {
    alert('Usuário deslogado!'); 
    //onLogout();
    navigate('/login'); 
  };

  return (
    
    <body>
      <header className="header">
        <div className="logo"> 
           <a href="#" onClick={() => navigate("/home")}>
            <img src="src\pages\HomeAdm\logo.png" >
            </img> 
          </a>
          </div>
           <input type="checkbox" id="check" style={{ display: 'none' }} />
            <label htmlFor="check" className="icons"> 
                <i className='bx bx-menu' id="icone-menu"></i>
                <i className='bx bx-x' id="fechar-menu"></i>
            </label>
        
            <nav className="navbar"> 
                <a href="#" onClick={() => navigate("/home")}>Início</a> 
                <a href="#" onClick={() => navigate("/vistorias-agendadas")}>Vistorias Agendadas</a>
                <a href="#" onClick={() => navigate("/clientes")}>Clientes</a> 
                <a href="#" onClick={() => navigate("/empreendimentos")}>Empreendimentos</a> 
                <a href="#" onClick={() => navigate("/funcionarios")}>Funcionários</a>
                <a href="#" className="logout" onClick={handleLogout}>Sair</a> 
            </nav>
      </header>
    
    <div className="container-main">
      <main className="main-content">
        <h1 style={{ textAlign: 'center' }}>Agendar<br/> <span>Nova Vistoria </span>
        </h1>
        <form onSubmit={handleSubmit} className="form-container">
          
          <div className="form-group">
            <label>Selecione o Cliente:</label>
            <select name="idcliente" value={formData.idcliente} onChange={handleChange} required>
              <option value="">-- Escolha --</option>
              {clientes.map((c) => (
                <option key={c.idcliente} value={c.idcliente}>
                  {c.nome} - {c.cpf}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Selecione o Empreendimento:</label>
            <select value={selectedEmpreendimentoId} onChange={handleEmpreendimentoChange} required>
              <option value="">-- Escolha --</option>
              {empreendimentos.map((e) => (
                <option key={e.idempreendimento} value={e.idempreendimento}>{e.nome}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Selecione o Imóvel:</label>
            <select name="idimovel" value={formData.idimovel} onChange={handleChange} required>
              <option value="">-- Escolha --</option>
              {imoveis.map((i) => (
                <option key={i.idimovel} value={i.idimovel}>{i.descricao}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Selecione o Vistoriador:</label>
            <select name="idvistoriador" value={formData.idvistoriador} onChange={handleChange} required>
              <option value="">-- Escolha --</option>
              {vistoriadores.map((v) => (
                <option key={v.idvistoriador} value={v.idvistoriador}>
                  {v.nome} - {v.cpf}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Observações:</label>
            <textarea name="observacoes" value={formData.observacoes} onChange={handleChange}></textarea>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-salvar">Agendar</button>
            <button type="button" className="btn-cancelar" onClick={() => navigate('/home')}>Cancelar</button>
          </div>
        </form>
      </main>
      </div>
    </body>
  );
}

export default NovaVistoria;