async function cadastrarLivro() {
  const livroForm = document.getElementById('livroForm');
  const formData = new FormData(livroForm);

  const livroData = {
    nome_livro: formData.get('nome_livro'),
    autor: formData.get('autor'),
    categoria: formData.get('categoria'),
    foto_capa: formData.get('foto_capa'),
    descricao: formData.get('descricao')
  };

  try {
    const response = await fetch('http://localhost:4000/livro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(livroData)
    });

    if (response.ok) {
      alert('Livro cadastrado com sucesso!');
      window.location.href = 'outra_pagina.html';
    } else {
      throw new Error('Erro ao cadastrar o livro');
    }
  } catch (error) {
    console.error('Erro ao cadastrar o livro:', error);
    alert('Erro ao cadastrar o livro. Verifique o console para mais informações.');
  }
}
