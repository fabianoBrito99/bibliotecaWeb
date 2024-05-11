document.addEventListener('DOMContentLoaded', function() {
  const homeIcon = document.getElementById('home-icon');
  const navMenu = document.querySelector('.nav-menu');
  const navItems = document.querySelectorAll('.nav-item');
  const closeMenuButton = document.getElementById('close-menu');

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
});
