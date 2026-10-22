const { listLeads, updateLead } = require("./lib/leads-store");
const { isAuthed, login, logoutCookie } = require("./lib/gestao-auth");

module.exports = async (req, res) => {
  try {
    if (req.method === "GET") {
      if (!isAuthed(req)) return res.status(401).json({ success: false, message: "Faça login." });
      const leads = await listLeads();
      return res.status(200).json({ success: true, leads });
    }

    if (req.method !== "POST") {
      return res.status(405).json({ success: false, message: "Método não permitido." });
    }

    const body = req.body || {};
    if (body.action === "login") {
      const result = login(body.password);
      if (!result.ok) return res.status(result.status).json({ success: false, message: result.message });
      res.setHeader("Set-Cookie", result.cookie);
      return res.status(200).json({ success: true });
    }

    if (body.action === "logout") {
      res.setHeader("Set-Cookie", logoutCookie());
      return res.status(200).json({ success: true });
    }

    if (!isAuthed(req)) return res.status(401).json({ success: false, message: "Faça login." });

    if (body.action === "update") {
      const lead = await updateLead(body.id, { status: body.status, notes: body.notes });
      if (!lead) return res.status(404).json({ success: false, message: "Lead não encontrado." });
      return res.status(200).json({ success: true, lead });
    }

    return res.status(400).json({ success: false, message: "Ação inválida." });
  } catch (err) {
    console.error("Gestao API error:", err);
    return res.status(err.status || 500).json({
      success: false,
      message: err.status === 400 ? err.message : "Não foi possível concluir. Tente novamente."
    });
  }
};
