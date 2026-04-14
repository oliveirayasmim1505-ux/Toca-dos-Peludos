function carregarAdmin() {
  const dados = lerAdotantes();
  const lista = document.getElementById("listaAdmin");
  lista.innerHTML = "";

  // stats
  document.getElementById("st-total").textContent   = dados.length;
  document.getElementById("st-analise").textContent = dados.filter(a => a.status === "analise").length;
  document.getElementById("st-aprov").textContent   = dados.filter(a => a.status === "aprovado").length;
  document.getElementById("st-reprov").textContent  = dados.filter(a => a.status === "reprovado").length;

  if (dados.length === 0) {
    lista.innerHTML = '<p class="vazio-admin">😿 Nenhuma solicitação ainda.<br>Quando alguém se cadastrar, aparece aqui!</p>';
    return;
  }

  // avatar emoji por inicial
  function avatar(nome) {
    const emojis = ["🐶","🐱","🐰","🐹","🦊","🐻","🐼","🐨","🐯","🦁"];
    const i = (nome.charCodeAt(0) || 0) % emojis.length;
    return emojis[i];
  }

  dados.forEach(pessoa => {
    const statusLabel = traduzir(pessoa.status);
    const card = document.createElement("div");
    card.className = "sol-card fade-up";
    card.dataset.status = pessoa.status;
    card.innerHTML = `
      <div class="sol-avatar">${avatar(pessoa.nome)}</div>
      <div class="sol-info">
        <div class="sol-nome">${pessoa.nome}</div>
        <div class="sol-sub">${pessoa.endereco || "Endereço não informado"} · ${pessoa.moradia || ""}</div>
        <div style="margin-top:6px;">
          <span class="status ${pessoa.status}">${statusLabel}</span>
        </div>
      </div>
      <div class="sol-acoes">
        <button class="btn-ver" onclick="location.href='detalhes.html?id=${pessoa.id}'">🔍 Ver</button>
        <button class="btn-ok"
          onclick="atualizar(${pessoa.id}, 'aprovado')"
          ${pessoa.status === 'aprovado' ? 'disabled' : ''}>✅ Aprovar</button>
        <button class="btn-nok"
          onclick="atualizar(${pessoa.id}, 'reprovado')"
          ${pessoa.status === 'reprovado' ? 'disabled' : ''}>❌ Reprovar</button>
      </div>
    `;
    lista.appendChild(card);
  });
}

function atualizar(id, status) {
  const lista  = lerAdotantes();
  const pessoa = lista.find(a => a.id === id);
  if (!pessoa) return;
  pessoa.status = status;
  salvarAdotantes(lista);
  const msg = status === "aprovado" ? "✅ Aprovado com sucesso!" : "❌ Reprovado.";
  toast(msg, status === "aprovado" ? "ok" : "erro");
  carregarAdmin();
}

carregarAdmin();
