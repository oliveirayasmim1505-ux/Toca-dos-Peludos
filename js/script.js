// ── Helpers localStorage ──────────────────────────────
function lerAdotantes() {
  return JSON.parse(localStorage.getItem("adotantes") || "[]");
}

function salvarAdotantes(lista) {
  localStorage.setItem("adotantes", JSON.stringify(lista));
}

function traduzir(status) {
  if (status === "aprovado")  return "Aprovado";
  if (status === "reprovado") return "Reprovado";
  return "Em análise";
}

// ── Proteção de páginas restritas ─────────────────────
function protegerPagina() {
  if (!localStorage.getItem("adminLogado")) {
    window.location.href = "login.html";
  }
}

// ── Toast de notificação ──────────────────────────────
function toast(msg, tipo = "ok") {
  const t = document.createElement("div");
  t.textContent = msg;
  t.style.cssText = `
    position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%) translateY(20px);
    background: ${tipo === "ok" ? "#81c784" : tipo === "erro" ? "#e57373" : "#f06292"};
    color: #fff; padding: 12px 28px; border-radius: 50px;
    font-family: 'Nunito', sans-serif; font-size: 14px; font-weight: 700;
    box-shadow: 0 8px 24px rgba(0,0,0,.15); z-index: 9999;
    opacity: 0; transition: opacity .3s, transform .3s;
  `;
  document.body.appendChild(t);
  requestAnimationFrame(() => {
    t.style.opacity = "1";
    t.style.transform = "translateX(-50%) translateY(0)";
  });
  setTimeout(() => {
    t.style.opacity = "0";
    t.style.transform = "translateX(-50%) translateY(20px)";
    setTimeout(() => t.remove(), 300);
  }, 2800);
}
