const { Resend } = require("resend");
const { addLead } = require("./lib/leads-store");

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Método não permitido." });
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({
      success: false,
      message: "Serviço de e-mail não configurado. Configure RESEND_API_KEY na Vercel."
    });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const { name, email, company, topic, message, ncm, volume, page, phone, botcheck } = req.body || {};

  if (botcheck) {
    return res.status(200).json({ success: true });
  }

  const trimmedName = String(name || "").trim();
  const trimmedEmail = String(email || "").trim();
  const trimmedCompany = String(company || "").trim() || "Não informada";
  const trimmedTopic = String(topic || "").trim() || "Não informado";
  const trimmedMessage = String(message || "").trim();
  const trimmedNcm = String(ncm || "").trim();
  const trimmedVolume = String(volume || "").trim();
  const trimmedPage = String(page || "").trim();
  const trimmedPhone = String(phone || "").trim();
  const volumeLabels = {
    pessoal: "Compra pessoal ou ainda sem operação",
    "ate-5": "Até US$ 5 mil por mês",
    "5-20": "De US$ 5 mil a US$ 20 mil por mês",
    "20-100": "De US$ 20 mil a US$ 100 mil por mês",
    "acima-100": "Acima de US$ 100 mil por mês"
  };

  if (!trimmedName) {
    return res.status(400).json({ success: false, message: "Informe seu nome." });
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmedEmail)) {
    return res.status(400).json({ success: false, message: "E-mail inválido." });
  }
  if (trimmedMessage.length < 10) {
    return res.status(400).json({
      success: false,
      message: "Descreva sua necessidade (10+ caracteres)."
    });
  }
  if (!trimmedNcm) {
    return res.status(400).json({ success: false, message: "Informe o NCM." });
  }
  if (!volumeLabels[trimmedVolume]) {
    return res.status(400).json({ success: false, message: "Selecione o volume mensal." });
  }
  if (trimmedPhone && trimmedPhone.replace(/\D/g, "").length < 10) {
    return res.status(400).json({ success: false, message: "Informe um WhatsApp com DDD." });
  }
  if (trimmedVolume === "pessoal") {
    return res.status(200).json({
      success: false,
      qualified: false,
      message: "Para compra pessoal, fale conosco pelo WhatsApp."
    });
  }

  const to = process.env.CONTACT_TO_EMAIL || "operacional@vmiass.com";
  const from = process.env.RESEND_FROM_EMAIL || "VMI Assessoria <operacional@vmiass.com>";
  const subject = `Nova solicitação VMI: ${trimmedTopic}`;

  const html = `
    <h2>Nova solicitação pelo site VMI</h2>
    <p><strong>Nome:</strong> ${escapeHtml(trimmedName)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(trimmedEmail)}</p>
    <p><strong>Empresa:</strong> ${escapeHtml(trimmedCompany)}</p>
    <p><strong>WhatsApp:</strong> ${escapeHtml(trimmedPhone || "Não informado")}</p>
    <p><strong>Tipo de operação:</strong> ${escapeHtml(trimmedTopic)}</p>
    <p><strong>NCM:</strong> ${escapeHtml(trimmedNcm)}</p>
    <p><strong>Volume mensal:</strong> ${escapeHtml(volumeLabels[trimmedVolume])}</p>
    <p><strong>Página:</strong> ${escapeHtml(trimmedPage || "home")}</p>
    <p><strong>Mensagem:</strong></p>
    <p>${escapeHtml(trimmedMessage).replace(/\n/g, "<br>")}</p>
  `;

  try {
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: trimmedEmail,
      subject,
      html
    });

    if (error) {
      console.error("Resend error:", {
        name: error.name,
        message: error.message,
        statusCode: error.statusCode,
      });
      return res.status(500).json({
        success: false,
        message: "Não foi possível enviar. Tente novamente ou use o WhatsApp."
      });
    }

    try {
      await addLead({
        name: trimmedName,
        email: trimmedEmail,
        company: trimmedCompany,
        phone: trimmedPhone,
        topic: trimmedTopic,
        ncm: trimmedNcm,
        volume: trimmedVolume,
        volumeLabel: volumeLabels[trimmedVolume],
        message: trimmedMessage,
        page: trimmedPage || "home"
      });
    } catch (storeErr) {
      console.error("Lead store error:", storeErr);
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return res.status(500).json({
      success: false,
      message: "Erro ao enviar. Tente novamente ou fale conosco pelo WhatsApp."
    });
  }
};
