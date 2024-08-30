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

  // Carregar o login salvo, se existir
  const savedLogin = localStorage.getItem('login');
  if (savedLogin) {
    document.getElementById('login-email').value = savedLogin;
  }
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
  const salvarLogin = document.querySelector('.check').checked;

  fetch('http://127.0.0.1:4000/api/login', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, senha })
  })
  .then(response => {
    if (response.ok) {
      if (salvarLogin) {
        localStorage.setItem('login', email);
      } else {
        localStorage.removeItem('login');
      }
      window.location.href = '/home.html'; // Redireciona para a página home
    } else {
      return response.text().then(text => { throw new Error(text) });
    }
  })
  .catch(error => alert(error.message));
}

function register() {
  const nome_login = document.getElementById('register-nome').value;
  const email = document.getElementById('register-email').value;
  const senha = document.getElementById('register-senha').value;
  const telefone = document.querySelector('[name="Telefone"]').value;
  const igrejaLocal = document.querySelector('[name="igreja"]').value;
  const cep = document.querySelector('[name="cep"]').value;
  const rua = document.querySelector('[name="rua"]').value;
  const numero = document.querySelector('[name="numero"]').value;
  const bairro = document.querySelector('[name="Bairro"]').value;

  fetch('http://127.0.0.1:4000/api/usuario', {  // Atualize para a rota correta
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome_login, email, senha, telefone, igrejaLocal, cep, rua, numero, bairro })
  })
  .then(response => response.text())
  .then(data => alert(data))
  .catch(error => console.error('Error:', error));
}

document.getElementById('cep').addEventListener('blur', function() {
  const cep = this.value.replace(/\D/g, '');

  if (cep.length === 8) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        if (!data.erro) {
          document.getElementById('rua').value = data.logradouro;
          document.getElementById('bairro').value = data.bairro;
        } else {
          alert('CEP não encontrado.');
        }
      })
      .catch(error => console.error('Erro ao buscar o CEP:', error));
  } else {
    alert('CEP inválido.');
  }
});
