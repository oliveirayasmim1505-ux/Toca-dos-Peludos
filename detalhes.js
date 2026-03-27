const container = document.getElementById("detalhes");
const btnAprovar = document.getElementById("btnAprovar");
const btnReprovar = document.getElementById("btnReprovar");

let adotante = null;
let index = localStorage.getItem("adotanteSelecionado");

// COR DO STATUS
function getClasseStatus(status) {
  if (status === "Aprovado") return "aprovado";
  if (status === "Reprovado") return "reprovado";
  return "analise";
}

// CARREGAR DADOS DO BACKEND
async function carregarDetalhes() {
  try {
    const resposta = await fetch("http://localhost:3000/adotantes");
    const dados = await resposta.json();

    adotante = dados[index];

    mostrar();

  } catch (erro) {
    alert("Erro ao carregar dados!");
    console.error(erro);
  }
}

// MOSTRAR DADOS
function mostrar() {
  container.innerHTML = `
    <p><strong>Nome:</strong> ${adotante.nome}</p>
    <p><strong>CPF:</strong> ${adotante.cpf}</p>
    <p><strong>Telefone:</strong> ${adotante.telefone}</p>
    <p><strong>Endereço:</strong> ${adotante.endereco}</p>
    <p><strong>Moradia:</strong> ${adotante.moradia}</p>
    <p><strong>Outros animais:</strong> ${adotante.animais}</p>
    <p><strong>Espaço:</strong> ${adotante.espaco}</p>
    <p><strong>Status:</strong> 
      <span class="${getClasseStatus(adotante.status)}">
        ${adotante.status}
      </span>
    </p>
  `;

  controlarBotoes();
}

// BLOQUEAR BOTÕES
function controlarBotoes() {
  if (adotante.status !== "Em análise") {
    btnAprovar.disabled = true;
    btnReprovar.disabled = true;
  } else {
    btnAprovar.disabled = false;
    btnReprovar.disabled = false;
  }
}

// ATUALIZAR STATUS
async function atualizarStatus(novoStatus) {
  try {
    adotante.status = novoStatus;

    await fetch(`http://localhost:3000/adotantes/${index}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(adotante)
    });

    carregarDetalhes();

  } catch (erro) {
    alert("Erro ao atualizar!");
  }
}

// EVENTOS
btnAprovar.addEventListener("click", () => {
  atualizarStatus("Aprovado");
});

btnReprovar.addEventListener("click", () => {
  atualizarStatus("Reprovado");
});

// INICIAR
carregarDetalhes();