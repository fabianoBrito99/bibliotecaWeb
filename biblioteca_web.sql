CREATE DATABASE IF NOT EXISTS bibliota_web;
USE bibliota_web;

CREATE TABLE usuarios(
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    nome_login VARCHAR(100) UNIQUE,
    email VARCHAR(255) UNIQUE,
    senha VARCHAR(50)
);

INSERT INTO usuarios(nome_login, email, senha)
VALUES('fabiano', NULL, '12345678'),
       (NULL, 'fabiano@gmail.com', '12345678');

CREATE TABLE livros(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_livro VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    foto_capa VARCHAR(255) NOT NULL,
    categoria VARCHAR(255),
    descricao TEXT,
    status1 VARCHAR(50)
);

INSERT INTO livros (nome_livro, autor, foto_capa, categoria, descricao, status1) 
VALUES 
('O Peregrino', 'John Bunyan', './capas-livro/O-peregrino-2.jpg', 'devocional', 'DEPOIS DA BÍBLIA, ESTE É O LIVRO MAIS LIDO EM TODO O MUNDO HÁ MAIS DE TRÊS SÉCULOS...', 'disponivel'),
('Mere Christianity', 'C.S. Lewis', './capas-livro/mere.jpg', 'devocional', 'a', 'reservado'),
('O Evangelho Maltrapilho', 'Brennan Manning', './capas-livro/O-evangelho-maltrapilho.png', 'devocional', 'O evangelho maltrapilho foi escrito para pessoas aniquiladas...', 'reservado'),
('A Cabana', 'William P. Young', './capas-livro/a-cabana.webp', 'devocional', 'a', 'disponivel'),
('Em Busca de Deus', 'A.W. Tozer', './capas-livro/em-busca-de-deus.jpg', 'devocional', 'a', 'disponivel'),
('O Poder da Mulher que Ora', 'Stormie Omartian', './capas-livro/o-poder-da-mulher.jpg', 'devocional', 'a', 'disponivel'),
('A Prática do Poder da Presença de Deus', 'Brother Lawrence', './capas-livro/download-a-pratica-da-presenca-de-deus-.jpg', 'devocional', 'a', 'disponivel'),
('O Homem Eterno', 'G.K. Chesterton', './capas-livro/homem-eterno.jpg', 'devocional', 'a', 'disponivel'),
('O Peregrino da Alvorada', 'C.S. Lewis', './capas-livro/Peregrino-da-Alvorada.png', 'devocional', 'a', 'disponivel'),
('o Deus que destroi sonhos', 'Rodrigo Bibo', './capas-livro/o-deus-que-destroi-sonhos.jpg', 'devocional', 'a', 'disponivel'),
('o Deus in(visivel)', 'Philip Yancey', './capas-livro/deus-in(visivel).jpg', 'devocional', 'a', 'disponivel'),
('Senhor, ensina-me a orar', 'Andrew Murray', './capas-livro/Ensina-me-a-orar.jpg', 'devocional', 'a', 'disponivel'),
('Comprados com sangue', 'Derek Prince', './capas-livro/comprados-com-sangue.jpg', 'reflexivo', 'a', 'disponivel'),
('Bible','Teste', 'https://openlibrary.org/works/OL17732W', 'reflexivo', 'a', 'disponivel');

CREATE TABLE emprestimos(
    id_emprestimo INT PRIMARY KEY AUTO_INCREMENT,
    data_imprestimo DATE,
    data_devolucao DATE,
    id_livro INT NOT NULL,
    id_usuarios INT NOT NULL
);

INSERT INTO emprestimos(data_imprestimo, data_devolucao, id_livro, id_usuarios)
VALUES
('2024-08-01', '2024-08-20', 1, 1),
('2024-07-15', '2024-08-01', 2, 2),
('2024-08-10', '2024-09-10', 3, 3),
('2024-07-25', '2024-08-05', 4, 4),
('2024-08-15', '2024-08-25', 5, 5);



ALTER TABLE emprestimos ADD COLUMN status VARCHAR(50) DEFAULT 'disponivel';


SELECT e.id_emprestimo, u.nome_login AS nome_usuario, l.nome_livro AS nome_livro, e.data_devolucao 
FROM emprestimos e 
JOIN usuarios u ON e.id_usuarios = u.id_user 
JOIN livros l ON e.id_livro = l.id;
