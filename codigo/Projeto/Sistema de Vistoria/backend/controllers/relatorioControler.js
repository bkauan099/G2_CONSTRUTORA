const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

async function gerarRelatorio(req, res) {
  const {
    nomeVistoriador,
    localizacao,
    dataVistoria,
    ...dadosTecnicos
  } = req.body;

  try {
    const prompt = `Gere um relatório técnico claro e objetivo com base nas informações técnicas a seguir e as deixe enumeradas e organizadas e no final coloque a conclusão e as recomendações: ${JSON.stringify(dadosTecnicos)}. Não inclua assinatura, nem nome do vistoriador, nem localização , nem data de vistoria, nem o nome Relatório Técnico de Vistoria.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Você é um engenheiro civil que escreve relatórios técnicos claros, objetivos e bem estruturados." },
        { role: "user", content: prompt }
      ],
    });

    const texto = response.choices[0].message.content;

    const doc = new PDFDocument();
    const nomeArquivo = `relatorio_${Date.now()}.pdf`;
    const caminho = path.join(__dirname, "../relatorios", nomeArquivo);
    const logoPath = path.join(__dirname, "../assets/logo-civis.png");
    const assinaturaPath = path.join(__dirname, "../assets/assinatura.png");

    doc.pipe(fs.createWriteStream(caminho));

    // Logo
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 50, 40, { width: 100 });
    }

    doc.moveDown(2);
    doc.fontSize(14).text("Relatório Técnico de Vistoria", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Data da Vistoria: ${dataVistoria}`);
    doc.text(`Localização do Imóvel: ${localizacao}`);
    doc.text(`Responsável Técnico: ${nomeVistoriador}`);
    doc.moveDown();

    // Corpo do relatório
    doc.fontSize(12).text(texto, { align: "left" });
    doc.moveDown(2);

    // Assinatura
    if (fs.existsSync(assinaturaPath)) {
      doc.image(assinaturaPath, { width: 120 });
    }
    doc.text(nomeVistoriador);
    doc.text("Engenheiro Responsável");

    doc.end();

    res.json({ mensagem: "Relatório gerado com sucesso", arquivo: nomeArquivo });

  } catch (err) {
    console.error("Erro ao gerar relatório:", err);
    res.status(500).json({ erro: "Erro ao gerar relatório" });
  }
}

module.exports = { gerarRelatorio };
