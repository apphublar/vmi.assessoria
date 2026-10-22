const crypto = require("crypto");

const COOKIE = "vmi_gestao";

function password() {
  if (process.env.GESTAO_PASSWORD) return process.env.GESTAO_PASSWORD;
  if (process.env.VERCEL) return "";
  return "vmi-gestao";
}

function signature(value) {
  return crypto.createHmac("sha256", value).update("vmi-gestao-v1").digest("hex");
}

function cookieHeader(token, maxAge) {
  const secure = process.env.VERCEL ? "; Secure" : "";
  return `${COOKIE}=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}

function readToken(req) {
  const raw = req.headers.cookie || "";
  const part = raw.split(";").map((item) => item.trim()).find((item) => item.startsWith(`${COOKIE}=`));
  return part ? part.slice(COOKIE.length + 1) : "";
}

function isAuthed(req) {
  const current = password();
  const token = readToken(req);
  if (!current || !token || token.length !== signature(current).length) return false;
  return crypto.timingSafeEqual(Buffer.from(token), Buffer.from(signature(current)));
}

function login(attempt) {
  const current = password();
  if (!current) {
    return { ok: false, status: 503, message: "Defina GESTAO_PASSWORD nas variáveis da Vercel." };
  }
  const given = crypto.createHash("sha256").update(String(attempt || "")).digest();
  const expected = crypto.createHash("sha256").update(current).digest();
  const same = crypto.timingSafeEqual(given, expected);
  if (!same) return { ok: false, status: 401, message: "Senha incorreta." };
  return { ok: true, cookie: cookieHeader(signature(current), 60 * 60 * 24 * 14) };
}

function logoutCookie() {
  return cookieHeader("", 0);
}

module.exports = { isAuthed, login, logoutCookie };
