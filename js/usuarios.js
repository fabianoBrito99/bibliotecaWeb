

document.addEventListener('DOMContentLoaded', function() {
  const inputPesquisar = document.getElementById('pesquisar');
  const sugestoesContainer = document.getElementById('sugestoes');

  inputPesquisar.addEventListener('input', function() {
      const query = inputPesquisar.value.toLowerCase();
      if (query.length > 0) {
          fetch(`http://127.0.0.1:4000/api/usuario`)
              .then(response => response.json())
              .then(data => {
                  const usuariosFiltrados = data.dados.filter(usuario => 
                      usuario.nome_login.toLowerCase().includes(query)
                  );
                  
                  sugestoesContainer.innerHTML = ''; // Limpa as sugestões anteriores
                  usuariosFiltrados.forEach(usuario => {
                      const sugestao = document.createElement('div');
                      sugestao.className = 'sugestao-item';
                      sugestao.textContent = usuario.nome_login;
                      sugestao.addEventListener('click', () => openUsuarioDetails(usuario.id_user));
                      sugestoesContainer.appendChild(sugestao);
                  });
              })
              .catch(error => console.error('Erro ao carregar os usuários:', error));
      } else {
          sugestoesContainer.innerHTML = ''; // Limpa as sugestões se o campo de pesquisa estiver vazio
      }
  });

  function openUsuarioDetails(codigo) {
      // Redireciona para a página de detalhes do usuário com o ID na URL
      window.location.href = `usuarios-detalhes.html?id=${codigo}`;
  }

  fetchUsuarios();
  
    function fetchUsuarios() {
        fetch('http://127.0.0.1:4000/api/usuario')
          .then(response => response.json())
          .then(data => {
            const usuariosContainer = document.getElementById('usuarios-container');
            usuariosContainer.innerHTML = ''; // Limpa o container
      
            data.dados.forEach(usuario => {
              const card = document.createElement('div');
              card.className = 'usuario-card';
              card.innerHTML = `
                <h2>${usuario.nome_login}</h2>
                <h4>Email: ${usuario.email}</h4>
              `;
              card.addEventListener('click', () => openUsuarioDetails(usuario.id_user));
              usuariosContainer.appendChild(card);
            });
          })
          .catch(error => console.error('Erro ao carregar os usuários:', error));
      }
  
      function openUsuarioDetails(codigo) {
        // Redireciona para a página de detalhes do usuário com o ID na URL
        window.location.href = `usuarios-detalhes.html?id=${codigo}`;
      }
  });
  