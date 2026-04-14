const emojis = ["🐶","🐱","🐰","🐹","🦊","🐻","🐼","🐨","🐯","🦁"];
function avatar(nome) {
  return emojis[(nome.charCodeAt(0) || 0) % emojis.length];
}

function carregarAdotantes() {
  const adotantes = lerAdotantes();
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  atualizarStats(adotantes);

  if (adotantes.length === 0) {
    lista.innerHTML = '<p class="lista-vazia">😿 Nenhum adotante cadastrado ainda.</p>';
    return;
  }

  // mostra os 10 mais recentes primeiro
  [...adotantes].reverse().slice(0, 10).forEach(pessoa => {
    lista.innerHTML += `
      <div class="lista-item">
        <div class="li-avatar">${avatar(pessoa.nome)}</div>
        <div>
          <div class="li-nome">${pessoa.nome}</div>
          <div class="li-sub">${pessoa.moradia || ""} · ${pessoa.endereco || ""}</div>
        </div>
        <div class="li-right">
          <span class="status ${pessoa.status}">${traduzir(pessoa.status)}</span>
        </div>
      </div>
    `;
  });
}

function atualizarStats(lista) {
  document.getElementById("total").innerText     = lista.length;
  document.getElementById("analise").innerText   = lista.filter(a => a.status === "analise").length;
  document.getElementById("aprovados").innerText = lista.filter(a => a.status === "aprovado").length;
  document.getElementById("reprovados").innerText= lista.filter(a => a.status === "reprovado").length;
}

carregarAdotantes();
