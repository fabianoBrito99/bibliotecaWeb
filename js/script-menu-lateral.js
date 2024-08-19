document.addEventListener('DOMContentLoaded', function() {
  const homeIcon = document.getElementById('home-icon');
  const navMenu = document.querySelector('.nav-menu');
  const navItems = document.querySelectorAll('.nav-item');
  const closeMenuButton = document.getElementById('close-menu');

  // Abrir/Fechar o menu
  homeIcon.addEventListener('click', function() {
    navMenu.classList.toggle('nav-open');
  });

  navItems.forEach(item => {
    item.addEventListener('click', function() {
      navMenu.classList.remove('nav-open');
    });
  });

  closeMenuButton.addEventListener('click', function() {
    navMenu.classList.remove('nav-open');
  });

  // Redirecionar para as páginas correspondentes
  document.querySelector('.menu-content li:nth-child(1)').addEventListener('click', function() {
    window.location.href = '/livros.html'; // URL da página de livros
  });

  document.querySelector('.menu-content li:nth-child(2)').addEventListener('click', function() {
    window.location.href = '/cadastrarLivro.html'; // URL da página de cadastro de livros
  });

  document.querySelector('.menu-content li:nth-child(3)').addEventListener('click', function() {
    window.location.href = '/emprestimo.html'; // URL da página de empréstimos
  });

  document.querySelector('.menu-content li:nth-child(4)').addEventListener('click', function() {
    window.location.href = '/usuarios.html'; // URL da página de usuários
  });

  document.querySelector('.menu-content li:nth-child(5)').addEventListener('click', function() {
    window.location.href = '/pagina-cadastrar-usuario'; // URL da página de cadastro de usuários
  });

  document.querySelector('.menu-content li:nth-child(6)').addEventListener('click', function() {
    window.location.href = '/index.html';
  });
});
