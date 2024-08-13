document.addEventListener("DOMContentLoaded", function() {
  const criarContaLink = document.querySelector(".criar-conta");
  const logarLink = document.querySelector(".logar");

  criarContaLink.addEventListener("click", function(event) {
    event.preventDefault();
    toggleCards();
  });

  logarLink.addEventListener("click", function(event) {
    event.preventDefault();
    toggleCards();
  });
});

function toggleCards() {
  const cardLogin = document.querySelector(".card-tela-login");
  const cardCriarConta = document.querySelector(".card-criar");

  cardLogin.classList.toggle("hidden");
  cardCriarConta.classList.toggle("hidden");
}

function login() {
  const email = document.getElementById('login-email').value;
  const senha = document.getElementById('login-senha').value;

  fetch('http://127.0.0.1:4000/api/login', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, senha })
  })
  .then(response => {
    if (response.ok) {
      window.location.href = '/home.html'; // Redireciona para a página home
    } else {
      return response.text().then(text => { throw new Error(text) });
    }
  })
  .catch(error => alert(error.message));
}

function register() {
  const nome_login = document.getElementById('register-email').value;
  const email = document.getElementById('register-email').value;
  const senha = document.getElementById('register-senha').value;

  fetch('http://127.0.0.1:4000/api/register', {  // Atualize para a porta correta
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome_login, email, senha })
  })
  .then(response => response.text())
  .then(data => alert(data))
  .catch(error => console.error('Error:', error));
}