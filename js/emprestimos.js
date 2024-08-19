document.addEventListener('DOMContentLoaded', function() {
  // Função para calcular os dias restantes até a data de vencimento
  function calcularDiasRestantes(dataDevolucao) {
      const hoje = new Date();
      const devolucao = new Date(dataDevolucao);
      const diferenca = devolucao - hoje;
      const diasRestantes = Math.ceil(diferenca / (1000 * 60 * 60 * 24));
      return diasRestantes;
  }

  // Função para definir a classe de cor baseada nos dias restantes
  function obterClasseCor(diasRestantes) {
      if (diasRestantes > 10) {
          return 'green';
      } else if (diasRestantes >= 0) {
          return 'yellow';
      } else {
          return 'red';
      }
  }

  // Função para renderizar os empréstimos na tela
  function renderizarEmprestimos(emprestimos) {
      const container = document.getElementById('emprestimos-container');
      container.innerHTML = '';

      emprestimos.forEach(emprestimo => {
          const diasRestantes = calcularDiasRestantes(emprestimo.data_devolucao);
          const classeCor = obterClasseCor(diasRestantes);

          // Formatar a data para o formato dia/mês/ano
          const dataDevolucaoFormatada = new Date(emprestimo.data_devolucao).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
          });

          const card = document.createElement('div');
          card.className = `emprestimo-card ${classeCor}`;
          card.style.display = 'grid';
          card.style.gridTemplateColumns = '1fr 1fr 1fr 1fr';
          card.style.gap = '10px';

          const usuarioDiv = document.createElement('div');
          usuarioDiv.className = 'usuario-emprestimo';
          usuarioDiv.innerHTML = `<h2>Usuário: ${emprestimo.nome_usuario}</h2>`;

          const livroDiv = document.createElement('div');
          livroDiv.className = 'livro-emprestimo';
          livroDiv.innerHTML = `<p><strong>Livro:</strong> ${emprestimo.nome_livro}</p>`;

          const dataDevolucaoDiv = document.createElement('div');
          dataDevolucaoDiv.className = 'data_devolucao-emprestimo';
          dataDevolucaoDiv.innerHTML = `<p><strong>Data de Vencimento:</strong> ${dataDevolucaoFormatada}</p>`;

          const diasRestantesDiv = document.createElement('div');
          diasRestantesDiv.className = 'dias_restantes-emprestimo';
          diasRestantesDiv.innerHTML = `<p><strong>Dias Restantes:</strong> ${diasRestantes}</p>`;

          card.appendChild(usuarioDiv);
          card.appendChild(livroDiv);
          card.appendChild(dataDevolucaoDiv);
          card.appendChild(diasRestantesDiv);

          container.appendChild(card);
      });
  }

  // Função para buscar os dados da API
  function carregarEmprestimos() {
      fetch('http://localhost:4000/api/emprestimos')
          .then(response => response.json())
          .then(data => renderizarEmprestimos(data.dados))
          .catch(error => console.error('Erro ao carregar os empréstimos:', error));
  }

  // Carrega os empréstimos ao carregar a página
  carregarEmprestimos();
});
