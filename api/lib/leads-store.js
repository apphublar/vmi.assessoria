const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const FILE = path.join(process.cwd(), "data", "leads.json");
const BLOB_PATH = "vmi-leads.json";
const STATUSES = ["novo", "contato", "proposta", "cliente", "perdido"];

let queue = Promise.resolve();

function enqueue(task) {
  const run = queue.then(task, task);
  queue = run.then(() => undefined, () => undefined);
  return run;
}

function useBlob() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

async function readBlob() {
  const { get } = require("@vercel/blob");
  const result = await get(BLOB_PATH, { access: "private", useCache: false });
  if (!result || result.statusCode !== 200 || !result.stream) return [];
  const text = await new Response(result.stream).text();
  const data = JSON.parse(text);
  return Array.isArray(data) ? data : [];
}

async function writeBlob(leads) {
  const { put } = require("@vercel/blob");
  await put(BLOB_PATH, JSON.stringify(leads), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 60
  });
}

async function readAll() {
  if (useBlob()) return readBlob();
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

async function writeAll(leads) {
  if (useBlob()) return writeBlob(leads);
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(leads, null, 2));
}

function addLead(input) {
  return enqueue(async () => {
    const leads = await readAll();
    const lead = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: "novo",
      notes: "",
      name: input.name,
      email: input.email,
      company: input.company,
      cnpj: input.cnpj || "",
      phone: input.phone || "",
      topic: input.topic,
      product: input.product || "",
      ncm: input.ncm,
      volume: input.volume,
      volumeLabel: input.volumeLabel,
      cargo: input.cargo || "",
      message: input.message,
      page: input.page || "home"
    };
    leads.unshift(lead);
    await writeAll(leads);
    return lead;
  });
}

function listLeads() {
  return enqueue(async () => {
    const leads = await readAll();
    return leads.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
  });
}

function updateLead(id, patch) {
  return enqueue(async () => {
    const leads = await readAll();
    const lead = leads.find((item) => item.id === id);
    if (!lead) return null;
    if (patch.status) {
      if (!STATUSES.includes(patch.status)) {
        const error = new Error("Situação inválida.");
        error.status = 400;
        throw error;
      }
      lead.status = patch.status;
    }
    if (typeof patch.notes === "string") lead.notes = patch.notes.slice(0, 4000);
    lead.updatedAt = new Date().toISOString();
    await writeAll(leads);
    return lead;
  });
}

module.exports = { addLead, listLeads, updateLead, STATUSES };
