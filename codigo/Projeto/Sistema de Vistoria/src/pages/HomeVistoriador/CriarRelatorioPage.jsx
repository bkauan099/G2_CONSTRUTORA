import { useState, useEffect } from "react";

function CriarRelatorioAI() {
  const [form, setForm] = useState({
    nomeVistoriador: "",
    localizacao: "",
    dataVistoria: "",
    estadoConservacaoEstrutura: "",
    estadoConservacaoPintura: "",
    estadoInstalacaoEletrica: "",
    estadoInstalacaoHidraulica: "",
    estadoTelhado: "",
    estadoPiso: "",
    segurancaPortasJanelas: false,
    funcionamentoSistemaAlarme: false,
    presencaPragas: false,
    presencaInfiltracoes: false
  });

  const [mensagem, setMensagem] = useState("");

  // Preenche a data automaticamente
  useEffect(() => {
    const hoje = new Date().toISOString().split("T")[0];
    setForm((prev) => ({ ...prev, dataVistoria: hoje }));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("Gerando relatório...");

    const response = await fetch("http://localhost:3001/api/relatorio/gerar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    if (data.arquivo) {
      setMensagem(`Relatório gerado! Nome do arquivo: ${data.arquivo}`);
    } else {
      setMensagem("Erro ao gerar relatório");
    }
  };

  return (
    <div>
      <h2>Gerar Relatório Técnico</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nomeVistoriador"
          placeholder="Nome do Vistoriador"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="localizacao"
          placeholder="Localização do Imóvel"
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dataVistoria"
          value={form.dataVistoria}
          onChange={handleChange}
          required
        />

        {[
          "estadoConservacaoEstrutura",
          "estadoConservacaoPintura",
          "estadoInstalacaoEletrica",
          "estadoInstalacaoHidraulica",
          "estadoTelhado",
          "estadoPiso"
        ].map((campo) => (
          <input
            key={campo}
            type="text"
            name={campo}
            placeholder={campo.replace(/([A-Z])/g, " $1")}
            onChange={handleChange}
            required
          />
        ))}

        {[
          ["segurancaPortasJanelas", "Segurança de Portas e Janelas"],
          ["funcionamentoSistemaAlarme", "Funcionamento do Sistema de Alarme"],
          ["presencaPragas", "Presença de Pragas"],
          ["presencaInfiltracoes", "Presença de Infiltrações"]
        ].map(([name, label]) => (
          <label key={name}>
            <input
              type="checkbox"
              name={name}
              onChange={handleChange}
            />
            {label}
          </label>
        ))}

        <button type="submit">Gerar Relatório</button>
      </form>
      <p>{mensagem}</p>
    </div>
  );
}

export default CriarRelatorioAI;
