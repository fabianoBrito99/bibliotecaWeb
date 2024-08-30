document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const usuarioId = urlParams.get("id");

  if (usuarioId) {
    fetch(`http://127.0.0.1:4000/api/usuario/${usuarioId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.erro) {
          alert("Erro ao carregar os detalhes do usuário");
        } else {
          const usuarioDetalhes = document.getElementById("usuario-detalhes");
          const historicoContainer = document.getElementById("historico-container");

          // Exibe os detalhes do usuário
          usuarioDetalhes.innerHTML = `
            <div class="container-usuarios">
              <div class="grid-1-usuarios">
                <h2>Usuário: ${data.usuario.nome_login}</h2>
                <h4>Email: ${data.usuario.email}</h4>
                <h5>Telefone: ${data.usuario.telefone}</h5>
              </div>
              <div class="grid-2-usuarios">
                <h2>Endereço</h2>
                <h5>Rua: ${data.usuario.rua}</h5>
                <h5>Número: ${data.usuario.numero}</h5>
                <h5>Bairro: ${data.usuario.bairro}</h5>
              </div>
            </div>
          `;

          // Exibe o histórico de empréstimos
          data.historico.forEach((emprestimo) => {
            const emprestimoItem = document.createElement("div");
            emprestimoItem.className = "usuario-item";

            // Formata as datas
            const dataEmprestimo = new Date(emprestimo.data_emprestimo);
            const dataDevolucao = new Date(emprestimo.devolucao);

            const dataEmprestimoFormatada = dataEmprestimo.toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            });
            const dataDevolucaoFormatada = dataDevolucao.toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            });

            emprestimoItem.innerHTML = `
            <div class= "container-detalhes-usuarios">
              <img src="${emprestimo.foto_capa}" alt="Capa do livro">
              <h3>Livro: ${emprestimo.nome_livro}</h3>
              <h4>Data de Empréstimo: ${dataEmprestimoFormatada}</h4>
              <h4>Data de Devolução: ${dataDevolucaoFormatada}</h4>
            </div>
            `;
            historicoContainer.appendChild(emprestimoItem);
          });
        }
      })
      .catch((error) =>
        console.error("Erro ao buscar detalhes do usuário:", error)
      );
  } else {
    alert("ID de usuário não fornecido");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  console.log("Script carregado com sucesso");
});
