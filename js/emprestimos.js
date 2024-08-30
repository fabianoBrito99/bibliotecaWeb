document.addEventListener('DOMContentLoaded', function() {
  function calcularDiasRestantes(dataPrevistaDevolucao) {
    const hoje = new Date();
    const devolucao = new Date(dataPrevistaDevolucao);
    const diferenca = devolucao - hoje;
    const diasRestantes = Math.ceil(diferenca / (1000 * 60 * 60 * 24));
    return diasRestantes;
  }

  function obterClasseCor(diasRestantes) {
    if (diasRestantes > 10) {
      return 'green';
    } else if (diasRestantes >= 0) {
      return 'yellow';
    } else {
      return 'red';
    }
  }

  function renderizarEmprestimos(emprestimos) {
    const container = document.getElementById('emprestimos-container');
    container.innerHTML = '';

    emprestimos.forEach(emprestimo => {
      const diasRestantes = calcularDiasRestantes(emprestimo.data_prevista_devolucao);
      const classeCor = obterClasseCor(diasRestantes);

      const dataDevolucaoFormatada = new Date(emprestimo.data_prevista_devolucao).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

      const card = document.createElement('div');
      card.className = `emprestimo-card ${classeCor}`;
      card.style.display = 'grid';
      card.style.gridTemplateColumns = '1fr 1fr 1fr 1fr';
      card.style.gap = '10px';

      card.addEventListener('click', function() {
        window.location.href = `detalhes-emprestimo.html?id=${emprestimo.id}`;
      });

      const fotoLivroDiv = document.createElement('div');
      fotoLivroDiv.className = 'foto-livro';
      fotoLivroDiv.innerHTML = `<img src="${emprestimo.foto_capa}" alt="Foto do Livro" style="width: 100px; height: auto;">`;

      const usuarioDiv = document.createElement('div');
      usuarioDiv.className = 'usuario-emprestimo';
      usuarioDiv.innerHTML = `<h2>Usuário: ${emprestimo.nome_usuario}</h2>`;

      const livroDiv = document.createElement('div');
      livroDiv.className = 'livro-emprestimo';
      livroDiv.innerHTML = `<h3><strong>Livro:</strong> ${emprestimo.nome_livro}</h3>`;

      const dataDevolucaoDiv = document.createElement('div');
      dataDevolucaoDiv.className = 'data_devolucao-emprestimo';
      dataDevolucaoDiv.innerHTML = `<h4><strong>Data de Vencimento:</strong> ${dataDevolucaoFormatada}</h4>`;

      const diasRestantesDiv = document.createElement('div');
      diasRestantesDiv.className = 'dias_restantes-emprestimo';
      diasRestantesDiv.innerHTML = `<h5><strong>Dias Restantes:</strong> ${diasRestantes}</h5>`;

      card.appendChild(fotoLivroDiv);
      card.appendChild(usuarioDiv);
      card.appendChild(livroDiv);
      card.appendChild(dataDevolucaoDiv);
      card.appendChild(diasRestantesDiv);

      container.appendChild(card);
    });
  }

  function carregarEmprestimos() {
    fetch('http://localhost:4000/api/emprestimos')
      .then(response => response.json())
      .then(data => renderizarEmprestimos(data.dados))
      .catch(error => console.error('Erro ao carregar os empréstimos:', error));
  }

  carregarEmprestimos();
});
