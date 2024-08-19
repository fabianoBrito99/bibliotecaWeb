document.addEventListener("DOMContentLoaded", async function () {
  const livrosSection = document.getElementById("livros-section");

  // Fetch all books without categorization
  const livrosData = await fetch("http://localhost:4000/livro")
    .then(response => response.json())
    .catch(error => console.error("Erro ao carregar os livros:", error));

  if (livrosData && livrosData.dados) {
    const livros = livrosData.dados;

    livros.forEach(livro => {
      const cardLivro = criarCardLivro(livro);
      livrosSection.appendChild(cardLivro);
    });
  } else {
    console.error("Erro: Dados de livros não foram carregados corretamente.");
  }
});

function criarCardLivro(livro) {
  const cardLivro = document.createElement("div");
  cardLivro.classList.add("card-todos-livros");
  cardLivro.setAttribute("data-id", livro.id);

  const img = document.createElement("img");
  img.src = livro.foto_capa;
  img.alt = livro.nome_livro;
  cardLivro.appendChild(img);

  const titulo = document.createElement("h2");
  titulo.textContent = livro.nome_livro;
  cardLivro.appendChild(titulo);

  const autor = document.createElement("h6");
  autor.textContent = `Autor: ${livro.autor}`;
  cardLivro.appendChild(autor);

  cardLivro.addEventListener("click", () => {
    window.location.href = `consultarLivro.html?id=${livro.id}`;
  });

  return cardLivro;
}
