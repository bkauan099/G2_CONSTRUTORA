const fs = require("fs");
const path = require("path");
const PDFDocument = require("pdfkit");
const OpenAI = require("openai");
const nodemailer = require("nodemailer");
const db = require("../db");
const fetch = require("node-fetch");
require("dotenv").config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

async function gerarRelatorio(req, res) {
  const {
    idVistoria,
    nomeVistoriador,
    localizacao,
    dataVistoria,
    horaVistoria,
    comodos
  } = req.body;

  try {
    // ✅ Gerar texto do relatório via OpenAI
    const prompt = `
Gere um relatório técnico claro e objetivo com base nas informações abaixo:

Informações dos cômodos vistoriados:
${JSON.stringify(comodos, null, 2)}

Organize as informações por cômodo, detalhe cada aspecto técnico (estrutura, pintura, instalações, piso, telhado, etc.), enumere e explique objetivamente.

No final, inclua uma conclusão com observações gerais, recomendações técnicas e considerações relevantes com base no estado geral do imóvel.

Não inclua assinatura, cabeçalho ou rodapé.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Você é um engenheiro civil que escreve relatórios técnicos claros, objetivos e bem estruturados."
        },
        { role: "user", content: prompt }
      ]
    });

    const texto = response.choices[0].message.content;

    // ✅ Gerar PDF
    const nomeArquivo = `relatorio_${Date.now()}.pdf`;
    const caminho = path.join(__dirname, "../relatorios", nomeArquivo);
    const assinaturaPath = path.join(__dirname, "../assets/assinatura.png");
    const fundoPath = path.join(__dirname, "../assets/vistoria.png");

    const doc = new PDFDocument();
    const stream = fs.createWriteStream(caminho);
    doc.pipe(stream);

    const desenharFundo = () => {
      if (fs.existsSync(fundoPath)) {
        doc.image(fundoPath, 0, 0, {
          width: doc.page.width,
          height: doc.page.height,
        });
      }
    };

    desenharFundo();
    doc.on("pageAdded", desenharFundo);

    doc.moveDown(2);
    doc.fontSize(14).text("Relatório Técnico de Vistoria", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Data da Vistoria: ${dataVistoria}`);
    doc.text(`Hora da Vistoria: ${horaVistoria}`);
    doc.text(`Localização do Imóvel: ${localizacao}`);
    doc.text(`Responsável Técnico: ${nomeVistoriador}`);
    doc.moveDown();
    doc.fontSize(12).text(texto, { align: "left" });
    doc.moveDown(2);

    if (fs.existsSync(assinaturaPath)) {
      doc.image(assinaturaPath, { width: 120 });
    }

    doc.text(nomeVistoriador);
    doc.text("Engenheiro Responsável");
    doc.end();

    stream.on("finish", async () => {
      try {
        //  Buscar e-mails reais do banco
        const [dados] = await db`
          SELECT c.email AS email_cliente, f.email AS email_vistoriador
          FROM vistoria v
          JOIN cliente c ON v.idcliente = c.idcliente
          JOIN funcionario f ON v.idvistoriador = f.id
          WHERE v.idvistoria = ${idVistoria}
        `;

        if (!dados) {
          console.error("Não encontrou dados de cliente e vistoriador para essa vistoria.");
          return res.status(404).json({ erro: "Cliente ou vistoriador não encontrados para essa vistoria." });
        }

        //  Configurar envio de e-mail
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        //  Enviar para o cliente
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: dados.email_cliente,
          subject: "Relatório Técnico de Vistoria",
          text: "Segue em anexo o relatório técnico da sua vistoria.",
          attachments: [{ filename: nomeArquivo, path: caminho }],
        });

        console.log("Relatório enviado para cliente:", dados.email_cliente);

        //  Enviar para o vistoriador
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: dados.email_vistoriador,
          subject: "Relatório Técnico de Vistoria",
          text: "Segue em anexo o relatório técnico gerado.",
          attachments: [{ filename: nomeArquivo, path: caminho }],
        });

        console.log("Relatório enviado para vistoriador:", dados.email_vistoriador);

        //  Upload para Supabase
        const storageUrl = 'https://sictbgrpkhacrukvpopz.supabase.co/storage/v1/object';
        const bucketName = 'relatorios';
        const filePath = `relatorios/${nomeArquivo}`;
        const pdfBuffer = fs.readFileSync(caminho);

        const uploadResponse = await fetch(`${storageUrl}/${filePath}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/pdf',
            'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
          },
          body: pdfBuffer
        });

        if (!uploadResponse.ok) {
          console.error("Erro ao enviar PDF para Supabase:", await uploadResponse.text());
          return res.status(500).json({ erro: "Erro ao subir PDF para Supabase Storage" });
        }

        const publicUrl = `https://sictbgrpkhacrukvpopz.supabase.co/storage/v1/object/public/${filePath}`;

        //  Atualiza banco de dados com a URL do relatório
        await db`
          UPDATE vistoria
          SET relatorio_url = ${publicUrl}, status = 'Aguardando Validação'
          WHERE idvistoria = ${idVistoria}
        `;

        await db`
          UPDATE imovel
          SET vistoriasrealizadas = vistoriasrealizadas + 1
          WHERE idimovel = (
            SELECT idimovel FROM vistoria WHERE idvistoria = ${idVistoria}
          )
        `;

        res.json({
          mensagem: "Relatório gerado, enviado para cliente e vistoriador, salvo e status atualizado com sucesso",
          arquivo: nomeArquivo,
          url: publicUrl
        });

      } catch (emailError) {
        console.error("Erro ao enviar e-mail:", emailError);
        res.status(500).json({ erro: "Erro ao enviar e-mail com o relatório" });
      }
    });

  } catch (err) {
    console.error("Erro ao gerar relatório:", err);
    res.status(500).json({ erro: "Erro ao gerar relatório" });
  }
}

module.exports = { gerarRelatorio };
