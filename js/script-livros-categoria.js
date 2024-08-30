document.addEventListener("DOMContentLoaded", async function () {
  const categoriasSection = document.getElementById("categorias-section");

  // Fetch distinct categories
  const categoriasData = await fetch("http://localhost:4000/categorias")
    .then(response => response.json())
    .catch(error => console.error("Erro ao carregar as categorias:", error));

  if (categoriasData && categoriasData.categorias) {
    for (const categoria of categoriasData.categorias) {
      const categoriaContainer = document.createElement("div");
      categoriaContainer.classList.add("custom-swiper-container");
      categoriaContainer.innerHTML = `
        <h3 class="categoria">${categoria}</h3>
        <div class="swiper custom-swiper mySwiper-${categoria}">
          <div class="swiper-wrapper" id="${categoria}-container"></div>
          <div class="swiper-pagination custom-swiper-pagination"></div>
          <div class="swiper-button-next custom-swiper-button-next"></div>
          <div class="swiper-button-prev custom-swiper-button-prev"></div>
        </div>
      `;
      categoriasSection.appendChild(categoriaContainer);
    }

    // Fetch books and distribute them into their respective categories
    const livrosData = await fetch("http://localhost:4000/livro")
      .then(response => response.json())
      .catch(error => console.error("Erro ao carregar os livros:", error));

    if (livrosData && livrosData.dados) {
      const livros = livrosData.dados;

      livros.forEach(livro => {
        const container = document.getElementById(`${livro.categoria}-container`);
        if (container) {
          const cardLivro = criarCardLivro(livro);
          const swiperSlide = document.createElement("div");
          swiperSlide.classList.add("swiper-slide"); // Usar a classe personalizada
          swiperSlide.appendChild(cardLivro);
          container.appendChild(swiperSlide);
        }
      });

      // Initialize Swiper instances for each category
      categoriasData.categorias.forEach(categoria => {
        new Swiper(`.mySwiper-${categoria}`, {
          slidesPerView: 3,
          spaceBetween: 1, // Ajuste o espaço entre os slides conforme necessário
          navigation: {
            nextEl: `.mySwiper-${categoria} .custom-swiper-button-next`,
            prevEl: `.mySwiper-${categoria} .custom-swiper-button-prev`,
          },
          pagination: {
            el: `.mySwiper-${categoria} .custom-swiper-pagination`,
            clickable: true,
          },
          breakpoints: {
            640: {
              slidesPerView: 1,
              spaceBetween: 1, // Ajustar para telas menores
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 1, // Ajustar para telas médias
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 1, // Ajustar para telas maiores
            },
          },
        });
      });
    } else {
      console.error("Erro: Dados de livros não foram carregados corretamente.");
    }
  } else {
    console.error("Erro: Dados de categorias não foram carregados corretamente.");
  }
});

function criarCardLivro(livro) {
  const cardLivro = document.createElement("div");
  cardLivro.classList.add("card-livro");
  cardLivro.setAttribute("data-id", livro.id);

  const img = document.createElement("img");
  img.src = livro.foto_capa;  // Agora deve funcionar corretamente
  img.alt = livro.nome_livro;
  cardLivro.appendChild(img);

  const titulo = document.createElement("h2");
  titulo.textContent = livro.nome_livro;
  cardLivro.appendChild(titulo);

  const autor = document.createElement("h4");
  autor.textContent = `Autor: ${livro.autor}`;
  cardLivro.appendChild(autor);

  cardLivro.addEventListener("click", () => {
    window.location.href = `consultarLivro.html?id=${livro.id}`;
  });

  return cardLivro;
}