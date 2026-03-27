const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const FILE = "dados.json";

// 🔹 LER DADOS
function lerDados() {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE));
}

// 🔹 SALVAR DADOS
function salvarDados(dados) {
  fs.writeFileSync(FILE, JSON.stringify(dados, null, 2));
}

// 🔹 GET - LISTAR ADOTANTES
app.get("/adotantes", (req, res) => {
  res.json(lerDados());
});

// 🔹 POST - CADASTRAR
app.post("/adotantes", (req, res) => {
  const dados = lerDados();
  dados.push(req.body);
  salvarDados(dados);

  res.json({ mensagem: "Adicionado com sucesso" });
});

// 🔹 PUT - ATUALIZAR (STATUS OU DADOS)
app.put("/adotantes/:id", (req, res) => {
  const dados = lerDados();
  const id = req.params.id;

  dados[id] = req.body;
  salvarDados(dados);

  res.json({ mensagem: "Atualizado com sucesso" });
});

// 🔹 DELETE - REMOVER
app.delete("/adotantes/:id", (req, res) => {
  const dados = lerDados();
  const id = req.params.id;

  dados.splice(id, 1);
  salvarDados(dados);

  res.json({ mensagem: "Removido com sucesso" });
});

// 🔹 INICIAR SERVIDOR
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});