document.addEventListener('DOMContentLoaded', async function () {
  const livrosContainer = document.getElementById('livros-container');

  try {
    const response = await fetch('http://localhost:4000/livro');
    const data = await response.json();

    const livros = data.dados;

    const maxBooksToShow = 10;

    const randomBookIndices = [];

    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    while (randomBookIndices.length < maxBooksToShow) {
      const randomIndex = getRandomInt(0, livros.length - 1);
      if (!randomBookIndices.includes(randomIndex)) {
        randomBookIndices.push(randomIndex);
      }
    }

    // Criar cards para os livros selecionados aleatoriamente
    randomBookIndices.forEach(index => {
      const livro = livros[index];

      // Criar elemento div para o card
      const cardLivro = document.createElement('div');
      cardLivro.classList.add('card-livro');

      // Criar elemento img para a capa do livro
      const img = document.createElement('img');
      img.src = livro.foto_capa;
      img.alt = livro.nome_livro;
      cardLivro.appendChild(img);

      // Criar elemento h2 para o título do livro
      const titulo = document.createElement('h2');
      titulo.textContent = livro.nome_livro;
      cardLivro.appendChild(titulo);

      const autor = document.createElement('h6');
      autor.textContent = `Autor: ${livro.autor}`;
      cardLivro.appendChild(autor);

      // Adicionar o card ao container de livros
      livrosContainer.appendChild(cardLivro);
    });
  } catch (error) {
    console.error('Erro ao carregar os livros:', error);
  }
});