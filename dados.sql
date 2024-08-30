CREATE DATABASE bibliota_web;
use bibliota_web;

CREATE TABLE usuarios(
id_user INT PRIMARY KEY AUTO_INCREMENT,
nome_login VARCHAR(100) UNIQUE,
email VARCHAR(255) UNIQUE,
senha VARCHAR(50),
telefone VARCHAR(30),
igrejaLocal VARCHAR(100),
cep VARCHAR(20),
rua VARCHAR(200),
numero VARCHAR(10),
bairro VARCHAR(100)
);

CREATE TABLE livros(
id INT PRIMARY KEY AUTO_INCREMENT,
nome_livro VARCHAR(255) NOT NULL,
autor VARCHAR(255) NOT NULL,
foto_capa LONGBLOB NOT NULL,
categoria VARCHAR(255),
descricao TEXT,
quantidade INT
);

CREATE TABLE emprestimos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  livro_id INT,
  usuario_id INT,
  data_emprestimo DATE,
  data_prevista_devolucao DATE,
  devolucao DATE,
  FOREIGN KEY (livro_id) REFERENCES livros(id),
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id_user)
);


