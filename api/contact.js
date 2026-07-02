const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

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

  const { name, email, company, topic, message, botcheck } = req.body || {};

  if (botcheck) {
    return res.status(200).json({ success: true });
  }

  const trimmedName = String(name || "").trim();
  const trimmedEmail = String(email || "").trim();
  const trimmedCompany = String(company || "").trim() || "Não informada";
  const trimmedTopic = String(topic || "").trim() || "Não informado";
  const trimmedMessage = String(message || "").trim();

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

  const to = process.env.CONTACT_TO_EMAIL || "operacional@vmiass.com";
  const from = process.env.RESEND_FROM_EMAIL || "VMI Assessoria <onboarding@resend.dev>";
  const subject = `Nova solicitação VMI — ${trimmedTopic}`;

  const html = `
    <h2>Nova solicitação pelo site VMI</h2>
    <p><strong>Nome:</strong> ${escapeHtml(trimmedName)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(trimmedEmail)}</p>
    <p><strong>Empresa:</strong> ${escapeHtml(trimmedCompany)}</p>
    <p><strong>Tipo de operação:</strong> ${escapeHtml(trimmedTopic)}</p>
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
      console.error("Resend error:", error);
      return res.status(500).json({
        success: false,
        message: "Não foi possível enviar. Tente novamente ou use o WhatsApp."
      });
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
