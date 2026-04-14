const params = new URLSearchParams(window.location.search);
const id     = Number(params.get("id"));
let adotante = null;

const emojis = ["🐶","🐱","🐰","🐹","🦊","🐻","🐼","🐨","🐯","🦁"];
function avatar(nome) {
  return emojis[(nome.charCodeAt(0) || 0) % emojis.length];
}

function carregarDetalhes() {
  const lista = lerAdotantes();
  adotante    = lista.find(a => a.id === id);

  if (!adotante) {
    document.getElementById("detCard").innerHTML =
      '<p style="text-align:center;padding:60px;color:#e57373;">😿 Adotante não encontrado.</p>';
    return;
  }

  renderizar();
}

function renderizar() {
  const card = document.getElementById("detCard");
  card.innerHTML = `
    <div class="det-top">
      <div class="det-avatar">${avatar(adotante.nome)}</div>
      <div class="det-nome">${adotante.nome}</div>
      <div class="det-status-wrap">
        <span class="status ${adotante.status}">${traduzir(adotante.status)}</span>
      </div>
    </div>

    <div class="det-body">
      <div class="det-grid">
        <div class="det-field">
          <div class="lbl">CPF</div>
          <div class="val">${adotante.cpf || "—"}</div>
        </div>
        <div class="det-field">
          <div class="lbl">Telefone</div>
          <div class="val">${adotante.telefone || "—"}</div>
        </div>
        <div class="det-field full">
          <div class="lbl">Endereço</div>
          <div class="val">${adotante.endereco || "—"}</div>
        </div>
        <div class="det-field">
          <div class="lbl">Moradia</div>
          <div class="val">${adotante.moradia || "—"}</div>
        </div>
        <div class="det-field">
          <div class="lbl">Outros animais</div>
          <div class="val">${adotante.animais || "—"}</div>
        </div>
        <div class="det-field full">
          <div class="lbl">Espaço disponível</div>
          <div class="val">${adotante.espaco || "—"}</div>
        </div>
      </div>

      <div class="det-acoes">
        <button class="btn-det-aprov" id="btnAprovar"
          ${adotante.status === 'aprovado' ? 'disabled' : ''}
          onclick="atualizarStatus('aprovado')">
          ✅ Aprovar
        </button>
        <button class="btn-det-reprov" id="btnReprovar"
          ${adotante.status === 'reprovado' ? 'disabled' : ''}
          onclick="atualizarStatus('reprovado')">
          ❌ Reprovar
        </button>
      </div>
    </div>
  `;
}

function atualizarStatus(novoStatus) {
  const lista  = lerAdotantes();
  const pessoa = lista.find(a => a.id === id);
  if (!pessoa) return;
  pessoa.status   = novoStatus;
  adotante.status = novoStatus;
  salvarAdotantes(lista);
  const msg = novoStatus === "aprovado" ? "✅ Adotante aprovado!" : "❌ Adotante reprovado.";
  toast(msg, novoStatus === "aprovado" ? "ok" : "erro");
  renderizar();
}

carregarDetalhes();
