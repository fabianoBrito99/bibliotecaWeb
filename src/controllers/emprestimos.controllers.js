const connection = require("../config/mysql.config");

function list(request, response) {
  connection.query("SELECT e.id_emprestimo, u.nome_login AS nome_usuario, l.nome_livro AS nome_livro, e.data_devolucao FROM emprestimos e JOIN usuarios u ON e.id_usuarios = u.id_user JOIN livros l ON e.id_livro = l.id", function (err, resultado) {
      if (err) {
          return response.json({ erro: "Ocorreu um erro ao buscar os dados" });
      }
      return response.json({ dados: resultado });
  });
}

module.exports = { list};
