// ── Máscara CPF ───────────────────────────────────────
document.getElementById("cpf").addEventListener("input", (e) => {
  let v = e.target.value.replace(/\D/g, "").slice(0, 11);
  if (v.length > 9)      v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
  else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{0,3})/,        "$1.$2.$3");
  else if (v.length > 3) v = v.replace(/(\d{3})(\d{0,3})/,               "$1.$2");
  e.target.value = v;
});

// ── Máscara Telefone ──────────────────────────────────
document.getElementById("telefone").addEventListener("input", (e) => {
  let v = e.target.value.replace(/\D/g, "").slice(0, 11);
  if (v.length > 10)     v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  else if (v.length > 6) v = v.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  else if (v.length > 2) v = v.replace(/(\d{2})(\d{0,5})/,        "($1) $2");
  else if (v.length > 0) v = "(" + v;
  e.target.value = v;
});

// ── Nome: só letras ───────────────────────────────────
document.getElementById("nome").addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^A-Za-zÀ-ÿ\s]/g, "");
});

// ── Envio ─────────────────────────────────────────────
document.getElementById("formCadastro").addEventListener("submit", (e) => {
  e.preventDefault();

  const nome     = document.getElementById("nome").value.trim();
  const cpf      = document.getElementById("cpf").value;
  const telefone = document.getElementById("telefone").value;
  const erroMsg  = document.getElementById("erroMsg");

  if (nome.split(" ").filter(p => p.length > 1).length < 2) {
    erroMsg.textContent = "Digite seu nome completo (nome e sobrenome).";
    return;
  }
  if (cpf.replace(/\D/g, "").length !== 11) {
    erroMsg.textContent = "CPF incompleto. Digite os 11 dígitos.";
    return;
  }
  if (telefone.replace(/\D/g, "").length < 10) {
    erroMsg.textContent = "Telefone incompleto.";
    return;
  }
  erroMsg.textContent = "";

  const lista = lerAdotantes();
  const novo = {
    id:       Date.now(),
    nome,
    cpf,
    telefone,
    endereco: document.getElementById("endereco").value,
    moradia:  document.getElementById("moradia").value,
    animais:  document.getElementById("animais").value,
    espaco:   document.getElementById("espaco").value,
    status:   "analise"
  };

  lista.push(novo);
  salvarAdotantes(lista);

  document.getElementById("formCadastro").innerHTML = `
    <div style="text-align:center; padding:30px 0;">
      <div style="font-size:64px; margin-bottom:12px;">🎉</div>
      <h3 style="color:#e75480; font-size:20px; margin-bottom:8px;">Cadastro enviado!</h3>
      <p style="color:#aaa; font-size:14px; margin-bottom:24px;">
        Entraremos em contato em breve. Obrigado pelo interesse em adotar! 💕
      </p>
      <a href="index.html" style="display:inline-block; padding:12px 32px;
        background:linear-gradient(135deg,#f06292,#e75480); color:#fff;
        border-radius:50px; font-weight:700; text-decoration:none; font-family:inherit;">
        ← Voltar ao início
      </a>
    </div>
  `;
});
