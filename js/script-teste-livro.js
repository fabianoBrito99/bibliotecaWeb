document.addEventListener('DOMContentLoaded', async function () {
  const livrosContainer = document.getElementById('livros-container');

  try {
    const response = await fetch('http://localhost:4000/livro');
    const data = await response.json();

    const livros = data.dados;

    const categorias = {
      devocional: [],
      reflexivo: []
    };

    // Separar os livros em categorias
    livros.forEach(livro => {
      if (livro.categoria === 'devocional') {
        categorias.devocional.push(livro);
      } else if (livro.categoria === 'reflexivo') {
        categorias.reflexivo.push(livro);
      }
    });

    // Função para criar cards de livro
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

    // Função para exibir os cards em uma categoria
    function exibirLivros(container, livros) {
      livros.forEach(livro => {
        const cardLivro = criarCardLivro(livro);
        container.appendChild(cardLivro);
      });
    }

    // Exibir livros por categoria
    exibirLivros(document.getElementById('devocional-container'), categorias.devocional);
    exibirLivros(document.getElementById('reflexivo-container'), categorias.reflexivo);

  } catch (error) {
    console.error('Erro ao carregar os livros:', error);
  }
});
