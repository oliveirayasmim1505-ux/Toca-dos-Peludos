document.addEventListener("DOMContentLoaded", () => {

  const lista = document.getElementById("lista");
  const busca = document.getElementById("busca");

  let adotantes = [];

  function getClasseStatus(status) {
    if (status === "Aprovado") return "aprovado";
    if (status === "Reprovado") return "reprovado";
    return "analise";
  }

  // 🔥 CARREGAR DO BACKEND
  async function carregarAdotantes() {
    try {
      const resposta = await fetch("http://localhost:3000/adotantes");
      adotantes = await resposta.json();

      console.log("DADOS:", adotantes); // debug

      renderizar(adotantes);

    } catch (erro) {
      console.error("Erro:", erro);
      alert("Erro ao carregar dados!");
    }
  }

  // 🔥 RENDERIZAR LISTA
  function renderizar(listaDados) {
    lista.innerHTML = "";

    listaDados.forEach((adotante, index) => {

      const li = document.createElement("li");

      li.innerHTML = `
        <strong>${adotante.nome}</strong><br>
        Status: <span class="${getClasseStatus(adotante.status)}">
          ${adotante.status}
        </span><br>

        <button onclick="verDetalhes(${index})">Ver</button>
        <button onclick="excluir(${index})">Excluir</button>
      `;

      lista.appendChild(li);
    });
  }

  // 🔍 BUSCA
  busca.addEventListener("input", () => {
    const termo = busca.value.toLowerCase();

    const filtrados = adotantes.filter(a =>
      a.nome.toLowerCase().includes(termo)
    );

    renderizar(filtrados);
  });

  // 🔥 DETALHES
  window.verDetalhes = function(index) {
    localStorage.setItem("adotanteSelecionado", index);
    window.location.href = "detalhes.html";
  };

  // 🔥 EXCLUIR
  window.excluir = async function(index) {
    if (!confirm("Deseja excluir?")) return;

    await fetch(`http://localhost:3000/adotantes/${index}`, {
      method: "DELETE"
    });

    carregarAdotantes();
  };

  // INICIAR
  carregarAdotantes();

});