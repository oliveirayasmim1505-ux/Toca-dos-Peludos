document.getElementById("formLogin").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  if (email === "admin@toca.com" && senha === "123456") {
    localStorage.setItem("adminLogado", "true");
    window.location.href = "admin.html";
  } else {
    document.getElementById("erro").textContent = "Login inválido!";
  }
});