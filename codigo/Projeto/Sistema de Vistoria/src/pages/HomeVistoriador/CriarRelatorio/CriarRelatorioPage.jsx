import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import './CriarRelatorioPage.css';

const opcoesEstado = ["Péssimo", "Ruim", "Razoável", "Bom", "Excelente"];
const comodos = ["quartos", "banheiros", "sala", "cozinha", "varanda"];

function Step({ step, currentStep }) {
  const status = currentStep === step ? "active" : currentStep < step ? "inactive" : "complete";

  return (
    <motion.div animate={status} className="step-wrapper">
      <motion.div
        variants={{
          active: { scale: 1 },
          complete: { scale: 1.25 },
        }}
        transition={{ duration: 0.2 }}
        className="step-bg"
      />
      <motion.div
        initial={false}
        variants={{
          inactive: { backgroundColor: "#fff", borderColor: "#ccc", color: "#999" },
          active: { backgroundColor: "#fff", borderColor: "#007bff", color: "#007bff" },
          complete: { backgroundColor: "#007bff", borderColor: "#007bff", color: "#fff" },
        }}
        transition={{ duration: 0.2 }}
        className="step-circle"
      >
        {status === "complete" ? <CheckIcon /> : <span>{step}</span>}
      </motion.div>
    </motion.div>
  );
}

function CheckIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} width="20" height="20">
      <motion.path
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.2, type: "tween", ease: "easeOut", duration: 0.3 }}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 13l4 4L19 7"
      />
    </svg>
  );
}

function CriarRelatorioPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [step, setStep] = useState(0);
  const [mensagem, setMensagem] = useState("");

  const [form, setForm] = useState({
    idVistoria: id || "",
    nomeVistoriador: "",
    localizacao: "",
    dataVistoria: "",
    horaVistoria: "",
    comodos: {
      quartos: {},
      banheiros: {},
      sala: {},
      cozinha: {},
      varanda: {}
    }
  });

  useEffect(() => {
    const hoje = new Date().toISOString().split("T")[0];
    setForm(prev => ({ ...prev, dataVistoria: hoje }));
  }, []);

  const handleComodoChange = (comodo, field, value) => {
    setForm(prev => ({
      ...prev,
      comodos: {
        ...prev.comodos,
        [comodo]: {
          ...prev.comodos[comodo],
          [field]: value
        }
      }
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("Gerando relatório...");

    const response = await fetch("http://localhost:3001/api/relatorio/gerar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await response.json();
    if (data.arquivo) {
      navigate(`/vistoriador/vistoria/${form.idVistoria}`, {
        state: { relatorio: data.arquivo }
      });
    } else {
      setMensagem("Erro ao gerar relatório");
    }
  };

  const renderComodoForm = (comodo) => (
    <>
      <div className="form-group">
        <label>Quantidade de {comodo}:</label>
        <select
          value={form.comodos[comodo].quantidade || ""}
          onChange={(e) => handleComodoChange(comodo, "quantidade", e.target.value)}
        >
          <option value="">Selecione</option>
          {[...Array(11)].map((_, i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </div>
      {["estrutura", "pintura", "instalacaoEletrica", "instalacaoHidraulica", "piso", "telhado"].map((campo) => (
        <div className="form-group" key={campo}>
          <label>{campo.replace(/([A-Z])/g, " $1")}:</label>
          <select
            value={form.comodos[comodo][campo] || ""}
            onChange={(e) => handleComodoChange(comodo, campo, e.target.value)}
          >
            <option value="">Selecione</option>
            {opcoesEstado.map(op => (
              <option key={op} value={op}>{op}</option>
            ))}
          </select>
        </div>
      ))}
      <div className="form-group">
        <label>Observações sobre {comodo}:</label>
        <textarea
          rows={3}
          value={form.comodos[comodo].observacoes || ""}
          onChange={(e) => handleComodoChange(comodo, "observacoes", e.target.value)}
        />
      </div>
    </>
  );

  return (
    <div className="wizard-container">
      <div className="wizard-box">
        <div className="wizard-steps">
          {[...Array(6)].map((_, i) => (
            <Step key={i} step={i} currentStep={step} />
          ))}
        </div>

        <h2 className="relatorio-header">Gerar Relatório Técnico</h2>
        <form onSubmit={handleSubmit} className="relatorio-form-container">
          {step === 0 ? (
            <>
              <div className="form-group">
                <label>Nome do Vistoriador:</label>
                <input type="text" name="nomeVistoriador" value={form.nomeVistoriador} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Localização:</label>
                <input type="text" name="localizacao" value={form.localizacao} onChange={handleChange} required />
              </div>
              <div className="form-group double">
                <div>
                  <label>Data da Vistoria:</label>
                  <input type="date" name="dataVistoria" value={form.dataVistoria} onChange={handleChange} required />
                </div>
                <div>
                  <label>Hora da Vistoria:</label>
                  <input type="time" name="horaVistoria" value={form.horaVistoria} onChange={handleChange} required />
                </div>
              </div>
            </>
          ) : (
            renderComodoForm(comodos[step - 1])
          )}

          <div className="wizard-buttons">
            {step > 0 && (
              <button type="button" className="wizard-btn back" onClick={() => setStep(step - 1)}>Voltar</button>
            )}
            {step < comodos.length ? (
              <button type="button" className="wizard-btn next" onClick={() => setStep(step + 1)}>Avançar</button>
            ) : (
              <button type="submit" className="wizard-btn next">Gerar Relatório</button>
            )}
          </div>
        </form>
        <p className="relatorio-message">{mensagem}</p>
      </div>
    </div>
  );
}

export default CriarRelatorioPage;