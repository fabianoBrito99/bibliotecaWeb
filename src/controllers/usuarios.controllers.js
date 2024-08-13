const connection = require("../config/mysql.config");

function show(request, response) {
  const codigo = request.params.codigo;
  if (!codigo) {
    return response.json({ erro: "Ocorreu um erro ao buscar o usuário" });
  }
  connection.query(
    "SELECT * FROM usuarios WHERE id_user = ?;",
    [codigo],
    function (err, resultado) {
      if (err) {
        return response.json({ erro: "Erro" });
      }
      if (resultado.length === 0) {
        return response.json({ erro: `O código #${codigo} não foi encontrado` });
      }
      return response.json(resultado[0]);
    }
  );
}

function list(request, response) {
  connection.query("SELECT * FROM usuarios", function (err, resultado) {
    if (err) {
      return response.json({ erro: "Ocorreram erros ao buscar dados" });
    }
    return response.json({ dados: resultado });
  });
}

function create(request, response) {
  const { nome_login, email, senha } = request.body;

  if (!nome_login || !email || !senha) {
    return response.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }

  connection.query(
    "INSERT INTO usuarios (nome_login, email, senha) VALUES (?, ?, ?)",
    [nome_login, email, senha],
    function (err, resultado) {
      if (err) {
        console.error('Erro ao cadastrar o usuário:', err);
        return response.status(500).json({ erro: "Erro ao cadastrar o usuário" });
      }

      return response.status(201).json({ message: "Usuário cadastrado com sucesso", usuario: { nome_login, email, senha} });
    }
  );
}

function update(request, response) {
  const codigo = request.params.codigo;
  const { nome_login, email, senha } = request.body;

  if (!nome_login || !email || !senha) {
    return response.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }

  connection.query(
    "UPDATE usuarios SET nome_login = ?, email = ?, senha = ? WHERE id_user = ?",
    [nome_login, email, senha, codigo],
    function (err, resultado) {
      if (err) {
        console.error('Erro ao atualizar o usuário:', err);
        return response.status(500).json({ erro: "Erro ao atualizar o usuário" });
      }

      return response.status(200).json({ message: "Usuário atualizado com sucesso", usuario: { nome_login, email, senha} });
    }
  );
}

function destroy(request, response) {
  const codigo = request.params.codigo;

  connection.query(
    "DELETE FROM usuarios WHERE id_user = ?",
    [codigo],
    function (err, resultado) {
      if (err) {
        console.error('Erro ao deletar o usuário:', err);
        return response.status(500).json({ erro: "Erro ao deletar o usuário" });
      }

      return response.status(200).json({ message: "Usuário deletado com sucesso" });
    }
  );
}

function login(request, response) {
  const { email, senha } = request.body;

  if (!email || !senha) {
    return response.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }

  connection.query(
    "SELECT * FROM usuarios WHERE (email = ? OR nome_login = ?) AND senha = ?",
    [email, email, senha],
    function (err, resultado) {
      if (err) {
        return response.status(500).json({ erro: "Erro ao buscar o usuário" });
      }
      if (resultado.length === 0) {
        return response.status(401).json({ erro: "Email ou senha incorretos" });
      }
      return response.status(200).json({ message: "Login bem-sucedido" });
    }
  );
}

module.exports = { show, list, create, update, destroy, login };
