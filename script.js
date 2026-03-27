const form = document.getElementById("formCadastro");
const inputs = document.querySelectorAll("input, select");

// MÁSCARA CPF
document.getElementById("cpf").addEventListener("input", function(e) {
  let value = e.target.value.replace(/\D/g, "");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  e.target.value = value;
});

// MÁSCARA TELEFONE
document.getElementById("telefone").addEventListener("input", function(e) {
  let value = e.target.value.replace(/\D/g, "");
  value = value.replace(/(\d{2})(\d)/, "($1) $2");
  value = value.replace(/(\d{5})(\d)/, "$1-$2");
  e.target.value = value;
});

// LIMPAR ERROS
inputs.forEach(input => {
  input.addEventListener("input", () => {
    input.classList.remove("erroInput");
    input.nextElementSibling.textContent = "";
  });
});

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  let valido = true;

  function erro(input, mensagem) {
    input.classList.add("erroInput");
    input.nextElementSibling.textContent = mensagem;
    valido = false;
  }

  const nome = document.getElementById("nome");
  const cpf = document.getElementById("cpf");
  const telefone = document.getElementById("telefone");
  const endereco = document.getElementById("endereco");
  const moradia = document.getElementById("moradia");
  const animais = document.getElementById("animais");
  const espaco = document.getElementById("espaco");

  if (nome.value.trim() === "") erro(nome, "Nome obrigatório");
  if (cpf.value.length < 14) erro(cpf, "CPF inválido");
  if (telefone.value.length < 14) erro(telefone, "Telefone inválido");
  if (endereco.value.trim() === "") erro(endereco, "Endereço obrigatório");
  if (moradia.value === "") erro(moradia, "Selecione uma opção");
  if (animais.value === "") erro(animais, "Selecione uma opção");
  if (espaco.value === "") erro(espaco, "Selecione uma opção");

  if (!valido) return;

  const adotante = {
    nome: nome.value,
    cpf: cpf.value,
    telefone: telefone.value,
    endereco: endereco.value,
    moradia: moradia.value,
    animais: animais.value,
    espaco: espaco.value,
    status: "Em análise"
  };

  try {
    await fetch("http://localhost:3000/adotantes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(adotante)
    });

    alert("Cadastro realizado com sucesso!");
    form.reset();

  } catch (erro) {
    alert("Erro ao conectar com o servidor!");
  }
});