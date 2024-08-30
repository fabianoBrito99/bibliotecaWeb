document.addEventListener("DOMContentLoaded", function() {
  const form = document.getElementById('livroForm');
  const fileInput = document.getElementById('imagem_capa');
  const imgPreview = document.querySelector('.img-cad'); // Elemento de visualização da imagem

  // Atualiza a imagem de pré-visualização
  fileInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        imgPreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      imgPreview.src = './img/image.png'; // Caminho padrão da imagem
    }
  });

  // Carrega categorias do banco de dados
  fetch("http://127.0.0.1:4000/categorias") 
    .then(response => response.json())
    .then(data => {
      const datalist = document.getElementById("listCategories");
      datalist.innerHTML = ''; // Limpa o datalist antes de adicionar novas opções
      data.categorias.forEach(categoria => {
        const option = document.createElement("option");
        option.value = categoria; // Ajuste conforme o formato da resposta
        datalist.appendChild(option);
      });
    })
    .catch(error => console.error("Erro ao carregar categorias:", error));

  // Envia o formulário
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Captura os valores dos campos
    const nomeLivro = document.querySelector('input[name="nome_livro"]').value;
    const autor = document.querySelector('input[name="autor"]').value;
    const categoria = document.querySelector('input[name="categoria"]').value;
    const descricao = document.querySelector('textarea[name="descricao"]').value;
    const quantidade = document.querySelector('input[name="quantidade"]').value;
    const imagemCapa = fileInput.files[0]; // Captura o arquivo de imagem

    // Log dos dados capturados
    console.log('Dados do formulário:', {
      nomeLivro,
      autor,
      categoria,
      descricao,
      quantidade,
      imagemCapa: imagemCapa ? imagemCapa.name : 'Nenhuma imagem selecionada'
    });

    // Validação básica
    if (!nomeLivro || !autor || !categoria || !descricao || !quantidade || !imagemCapa) {
      alert('Todos os campos são obrigatórios!');
      return;
    }

    // Cria um objeto de dados para enviar ao backend
    const formData = new FormData();
    formData.append('nome_livro', nomeLivro);
    formData.append('autor', autor);
    formData.append('categoria', categoria);
    formData.append('descricao', descricao);
    formData.append('quantidade', quantidade);
    formData.append('imagem_capa', imagemCapa);

    // Envia os dados para o backend
    fetch("http://127.0.0.1:4000/livro", {
      method: 'POST',
      body: formData // Envia o FormData contendo todos os dados, incluindo a imagem
    })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => {
          console.error('Erro de resposta do servidor:', err);
          throw new Error(err.erro || 'Erro ao cadastrar livro');
        });
      }
      return response.json();
    })
    .then(result => {
      console.log('Livro cadastrado:', result);
      alert('Livro cadastrado com sucesso!');
      form.reset();
      imgPreview.src = './img/image.png'; // Caminho padrão da imagem
    })
    .catch(error => console.error('Erro ao cadastrar livro:', error));
  });  
});
