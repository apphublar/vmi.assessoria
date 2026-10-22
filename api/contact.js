const { Resend } = require("resend");
const { addLead } = require("./lib/leads-store");

function isValidCnpj(value) {
  const cnpj = String(value || "").replace(/\D/g, "");
  if (!/^\d{14}$/.test(cnpj) || /^(\d)\1{13}$/.test(cnpj)) return false;
  const digit = (length) => {
    let sum = 0;
    let pos = length - 7;
    for (let i = length; i >= 1; i -= 1) {
      sum += Number(cnpj[length - i]) * pos;
      pos -= 1;
      if (pos < 2) pos = 9;
    }
    const result = sum % 11;
    return result < 2 ? 0 : 11 - result;
  };
  return digit(12) === Number(cnpj[12]) && digit(13) === Number(cnpj[13]);
}

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

  const { name, email, company, cnpj, topic, product, message, ncm, volume, cargo, page, phone, botcheck } = req.body || {};

  if (botcheck) {
    return res.status(200).json({ success: true });
  }

  const trimmedName = String(name || "").trim();
  const trimmedEmail = String(email || "").trim();
  const trimmedCompany = String(company || "").trim();
  const trimmedCnpj = String(cnpj || "").trim();
  const trimmedTopic = String(topic || "").trim() || "Não informado";
  const trimmedProduct = String(product || "").trim();
  const trimmedMessage = String(message || "").trim();
  const trimmedNcm = String(ncm || "").trim();
  const trimmedVolume = String(volume || "").trim();
  const trimmedCargo = String(cargo || "").trim();
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
  if (!trimmedCompany) {
    return res.status(400).json({ success: false, message: "Informe a empresa." });
  }
  if (!isValidCnpj(trimmedCnpj)) {
    return res.status(400).json({ success: false, message: "Informe um CNPJ válido." });
  }
  if (trimmedProduct.length < 2 || trimmedProduct.length > 160) {
    return res.status(400).json({ success: false, message: "Informe o produto." });
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
  if (trimmedCargo.length < 2 || trimmedCargo.length > 160) {
    return res.status(400).json({ success: false, message: "Informe o volume da carga." });
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

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({
      success: false,
      message: "Serviço de e-mail não configurado. Configure RESEND_API_KEY na Vercel."
    });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const to = process.env.CONTACT_TO_EMAIL || "operacional@vmiass.com";
  const from = process.env.RESEND_FROM_EMAIL || "VMI Assessoria <operacional@vmiass.com>";
  const subject = `Nova solicitação VMI: ${trimmedTopic}`;

  const html = `
    <h2>Nova solicitação pelo site VMI</h2>
    <p><strong>Nome:</strong> ${escapeHtml(trimmedName)}</p>
    <p><strong>E-mail:</strong> ${escapeHtml(trimmedEmail)}</p>
    <p><strong>Empresa:</strong> ${escapeHtml(trimmedCompany)}</p>
    <p><strong>CNPJ:</strong> ${escapeHtml(trimmedCnpj)}</p>
    <p><strong>WhatsApp:</strong> ${escapeHtml(trimmedPhone || "Não informado")}</p>
    <p><strong>Tipo de operação:</strong> ${escapeHtml(trimmedTopic)}</p>
    <p><strong>Produto:</strong> ${escapeHtml(trimmedProduct)}</p>
    <p><strong>NCM:</strong> ${escapeHtml(trimmedNcm)}</p>
    <p><strong>Volume mensal:</strong> ${escapeHtml(volumeLabels[trimmedVolume])}</p>
    <p><strong>Volume da carga:</strong> ${escapeHtml(trimmedCargo)}</p>
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
        cnpj: trimmedCnpj,
        phone: trimmedPhone,
        topic: trimmedTopic,
        product: trimmedProduct,
        ncm: trimmedNcm,
        volume: trimmedVolume,
        volumeLabel: volumeLabels[trimmedVolume],
        cargo: trimmedCargo,
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
