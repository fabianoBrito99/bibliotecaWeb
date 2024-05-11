//aqui anda tá faltando criar as outras funções, é só um teste
const connection = require("../config/mysql.config");

function show(request, response) {
  const codigo = request.params.codigo;
  if (codigo == undefined) {
    return response.json({ erro: "ocorreu um erro ao buscar o livro" });
  }
  connection.query(
    "SELECT * FROM livros WHERE id = ?;",
  [codigo],
    function (err, resultado) {
      if (err) {
        return response.json({ erro: "erro" });
      }
      if (resultado.length == 0) {
        return response.json({ erro: `o código #${codigo}não foi encontrado` });
      }
      return response.json(resultado[0]);
    }
  );
}
function list(request, response) {
  connection.query("SELECT * FROM livros", function (err, resultado) {
    if (err) {
      return response.json({ erro: "ocorreram erros ao buscar dados" });
    }
    return response.json({ dados: resultado });
  });
}
function create(request, response) {
  const { nome_livro, autor, foto_capa_url, categoria, descricao } = request.body;

  if (!nome_livro || !autor || !foto_capa_url || !categoria || !descricao) {
    return response.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }

  connection.query(
    "INSERT INTO livros (nome_livro, autor, foto_capa, categoria, descricao) VALUES (?, ?, ?, ?, ?)",
    [nome_livro, autor, foto_capa_url, categoria, descricao],
    function (err, resultado) {
      if (err) {
        console.error('Erro ao cadastrar o livro:', err);
        return response.status(500).json({ erro: "Erro ao cadastrar o livro" });
      }

      return response.status(201).json({ message: "Livro cadastrado com sucesso", livro: { nome_livro, autor, foto_capa_url, categoria, descricao } });
    }
  );
}
module.exports = { show, list, create };