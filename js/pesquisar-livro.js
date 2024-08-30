document.addEventListener("DOMContentLoaded", function () {
  console.log("tá ok");

  const inputPesquisar = document.getElementById("pesquisar");
  if (!inputPesquisar) {
    console.error("Elemento com ID 'pesquisar' não encontrado.");
    return;
  }

  console.log("Elemento com ID 'pesquisar' encontrado");

  const sugestoesContainer = document.getElementById("sugestoes");

  inputPesquisar.addEventListener("input", async function () {
    const query = inputPesquisar.value.trim();

    if (query.length > 0) {
      try {
        const response = await fetch(`http://localhost:4000/pesquisar?q=${query}`);
        const livros = await response.json();

        // Log para verificar o retorno dos livros
        console.log(livros);

        // Limpa as sugestões anteriores
        sugestoesContainer.innerHTML = "";

        if (livros && livros.length > 0) {
          livros.forEach(livro => {
            const sugestao = document.createElement("div");
            sugestao.classList.add("sugestao-item");
            sugestao.textContent = livro.nome_livro;

            sugestao.addEventListener("click", () => {
              window.location.href = `consultarLivro.html?id=${livro.id}`;
            });

            sugestoesContainer.appendChild(sugestao);
          });
        } else {
          const nenhumaSugestao = document.createElement("div");
          nenhumaSugestao.classList.add("sugestao-item");
          nenhumaSugestao.textContent = "Nenhum livro encontrado";
          sugestoesContainer.appendChild(nenhumaSugestao);
        }
      } catch (error) {
        console.error("Erro ao buscar sugestões:", error);
      }
    } else {
      // Limpa as sugestões se a entrada estiver vazia
      sugestoesContainer.innerHTML = "";
    }
  });
});
