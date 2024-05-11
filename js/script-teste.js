document.addEventListener('DOMContentLoaded', async function () {
  const livros = []; // Array de livros para carregar dinamicamente
  const categorias = {
    devocional: [],
    reflexivo: []
  };

  let currentPositionDevocional = 0;
  let currentPositionReflexivo = 0;
  let cardWidth = 0;
  let maxScrollPositionDevocional = 0;
  let maxScrollPositionReflexivo = 0;

  // Simular dados de livros (substitua por sua lógica de busca)
  const data = await fetch('http://localhost:4000/livro')
    .then(response => response.json())
    .catch(error => console.error('Erro ao carregar os livros:', error));

  if (data && data.dados) {
    livros.push(...data.dados);

    // Separar os livros em categorias
    livros.forEach(livro => {
      if (livro.categoria === 'devocional') {
        categorias.devocional.push(livro);
      } else if (livro.categoria === 'reflexivo') {
        categorias.reflexivo.push(livro);
      }
    });
  }

  // Função para criar o card de livro
  function criarCardLivro(livro) {
    const cardLivro = document.createElement('div');
    cardLivro.classList.add('card-livro');

    const img = document.createElement('img');
    img.src = livro.foto_capa;
    img.alt = livro.nome_livro;
    cardLivro.appendChild(img);

    const titulo = document.createElement('h2');
    titulo.textContent = livro.nome_livro;
    cardLivro.appendChild(titulo);

    const autor = document.createElement('h6');
    autor.textContent = `Autor: ${livro.autor}`;
    cardLivro.appendChild(autor);

    return cardLivro;
  }

  // Função para exibir os livros em uma categoria
  function exibirLivros(container, livros) {
    container.innerHTML = ''; // Limpar o conteúdo existente

    livros.forEach(livro => {
      const cardLivro = criarCardLivro(livro);
      container.appendChild(cardLivro);
    });

    // Calcular a largura total dos cards
    cardWidth = container.firstElementChild.offsetWidth;
    const numCards = livros.length;
    const containerWidth = container.offsetWidth;
    
    // Máximo deslocamento permitido
    const maxScrollPosition = Math.max(0, (numCards * cardWidth) - containerWidth);

    return maxScrollPosition;
  }

  // Exibir livros por categoria inicial
  const devocionalContainer = document.getElementById('devocional-container');
  const reflexivoContainer = document.getElementById('reflexivo-container');

  if (devocionalContainer && reflexivoContainer) {
    maxScrollPositionDevocional = exibirLivros(devocionalContainer, categorias.devocional);
    maxScrollPositionReflexivo = exibirLivros(reflexivoContainer, categorias.reflexivo);
  } else {
    console.error('Elementos de categoria não encontrados no DOM.');
    return;
  }

  // Eventos para navegação nos cards de devocional
  document.getElementById('btn-next-devocional').addEventListener('click', function () {
    if (currentPositionDevocional < maxScrollPositionDevocional) {
      currentPositionDevocional += cardWidth;
      currentPositionDevocional = Math.min(currentPositionDevocional, maxScrollPositionDevocional);
      devocionalContainer.style.transform = `translateX(-${currentPositionDevocional}px)`;
    }
  });

  document.getElementById('btn-prev-devocional').addEventListener('click', function () {
    if (currentPositionDevocional > 0) {
      currentPositionDevocional -= cardWidth;
      currentPositionDevocional = Math.max(currentPositionDevocional, 0);
      devocionalContainer.style.transform = `translateX(-${currentPositionDevocional}px)`;
    }
  });

  // Eventos para navegação nos cards de reflexivo
  document.getElementById('btn-next-reflexivo').addEventListener('click', function () {
    if (currentPositionReflexivo < maxScrollPositionReflexivo) {
      currentPositionReflexivo += cardWidth;
      currentPositionReflexivo = Math.min(currentPositionReflexivo, maxScrollPositionReflexivo);
      reflexivoContainer.style.transform = `translateX(-${currentPositionReflexivo}px)`;
    }
  });

  document.getElementById('btn-prev-reflexivo').addEventListener('click', function () {
    if (currentPositionReflexivo > 0) {
      currentPositionReflexivo -= cardWidth;
      currentPositionReflexivo = Math.max(currentPositionReflexivo, 0);
      reflexivoContainer.style.transform = `translateX(-${currentPositionReflexivo}px)`;
    }
  });
});
