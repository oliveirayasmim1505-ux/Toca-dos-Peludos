const express = require("express");
const cors    = require("cors");
const fs      = require("fs");
const path    = require("path");

const app        = express();
const DADOS_PATH = path.join(__dirname, "dados.json");
const FRONT_PATH = path.join(__dirname, ".."); // pasta raiz do projeto

app.use(cors());
app.use(express.json());

// ── Serve os arquivos do frontend ─────────────────────
app.use(express.static(FRONT_PATH));

// ── Helpers ──────────────────────────────────────────
function lerDados() {
  try {
    return JSON.parse(fs.readFileSync(DADOS_PATH, "utf-8"));
  } catch {
    return [];
  }
}

function salvarDados(dados) {
  fs.writeFileSync(DADOS_PATH, JSON.stringify(dados, null, 2), "utf-8");
}

// ── Rotas API ─────────────────────────────────────────

app.get("/adotantes", (req, res) => {
  res.json(lerDados());
});

app.post("/adotantes", (req, res) => {
  const dados = lerDados();
  const novo  = {
    id:       Date.now(),
    nome:     req.body.nome,
    cpf:      req.body.cpf,
    telefone: req.body.telefone,
    endereco: req.body.endereco,
    moradia:  req.body.moradia,
    animais:  req.body.animais,
    espaco:   req.body.espaco,
    status:   "analise"
  };
  dados.push(novo);
  salvarDados(dados);
  res.json(novo);
});

app.put("/adotantes/:id", (req, res) => {
  const dados  = lerDados();
  const id     = Number(req.params.id);
  const pessoa = dados.find(a => a.id === id);
  if (!pessoa) return res.status(404).json({ erro: "Não encontrado" });
  pessoa.status = req.body.status;
  salvarDados(dados);
  res.json(pessoa);
});

// ── Start ─────────────────────────────────────────────
app.listen(3000, () => {
  console.log("✅ Servidor rodando em http://localhost:3000");
  console.log("🐾 Abra http://localhost:3000 no navegador!");
});
