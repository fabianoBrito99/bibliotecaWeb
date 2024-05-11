document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita que o formulário seja enviado normalmente
  document.querySelector(".card").classList.add("animate");
});





