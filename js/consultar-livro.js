document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const livroId = urlParams.get('id');
  const usuarioId = 7; // Defina isso conforme necessário, pode vir de um login ou contexto de usuário

  if (livroId) {
    fetch(`http://localhost:4000/livro/${livroId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro na resposta da API: ' + response.status);
        }
        return response.json();
      })
      .then(data => {
        if (data.erro) {
          alert(data.erro);
          return;
        }

        const capa = document.getElementById('livro-capa');
        const nome = document.getElementById('livro-nome');
        const descricao = document.getElementById('livro-descricao');
        const autor = document.getElementById('livro-autor');
        const categoria = document.getElementById('livro-categoria');
        const botaoReservar = document.getElementById('botao-reservar');

        if (capa) capa.src = data.foto_capa;
        if (nome) nome.textContent = data.nome_livro;
        if (descricao) descricao.textContent = data.descricao;
        if (autor) autor.textContent = `Autor: ${data.autor}`;
        if (categoria) categoria.textContent = `Categoria: ${data.categoria}`;

        if (data.quantidade > 0) {
          botaoReservar.classList.add('botao-reservar');
          botaoReservar.classList.remove('botao-reservado');
          botaoReservar.textContent = 'Reservar';
          botaoReservar.disabled = false;
          botaoReservar.onclick = () => {
            fetch(`http://localhost:4000/api/emprestimos/${livroId}/reservar`, {
              method: 'PUT', // Mudança para PUT conforme as rotas
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ usuarioId: usuarioId })
            })
            .then(response => {
              if (!response.ok) {
                throw new Error('Erro na reserva: ' + response.status);
              }
              return response.json();
            })
            .then(data => {
              if (data.erro) {
                alert(data.erro);
                return;
              }
              alert(data.mensagem);
              botaoReservar.classList.add('botao-reservado');
              botaoReservar.classList.remove('botao-reservar');
              botaoReservar.textContent = 'Indisponível';
              botaoReservar.disabled = true;
            })
            .catch(error => {
              console.error('Erro ao reservar o livro:', error);
              alert('Erro ao reservar o livro: ' + error.message);
            });
          };
        } else {
          botaoReservar.classList.add('botao-reservado');
          botaoReservar.classList.remove('botao-reservar');
          botaoReservar.textContent = 'Indisponível';
          botaoReservar.disabled = true;
          botaoReservar.title = 'Este livro não está disponível no momento.';
        }
      })
      .catch(error => {
        console.error('Erro ao buscar dados do livro:', error);
        alert('Erro ao buscar dados do livro: ' + error.message);
      });
  } else {
    alert('ID do livro não fornecido na URL.');
  }
});