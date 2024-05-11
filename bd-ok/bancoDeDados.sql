CREATE DATABASE bibliota_web;
use bibliota_web;

CREATE TABLE livros(
id INT PRIMARY KEY AUTO_INCREMENT,
nome_livro VARCHAR(255) NOT NULL,
autor VARCHAR(255) NOT NULL,
foto_capa VARCHAR(255) NOT NULL
);

INSERT INTO livros (nome_livro, autor, foto_capa) 
VALUES ('O Peregrino', 'John Bunyan', './capas-livro/O-peregrino-2.jpg'),
('Mere Christianity', 'C.S. Lewis', './capas-livro/mere.jpg'),
('O Evangelho Maltrapilho', 'Brennan Manning', './capas-livro/O-evangelho-maltrapilho.png'),
('A Cabana', 'William P. Young', './capas-livro/a-cabana.webp'),
('Em Busca de Deus', 'A.W. Tozer', './capas-livro/em-busca-de-deus.jpg'),
('O Poder da Mulher que Ora', 'Stormie Omartian', './capas-livro/o-poder-da-mulher.jpg'),
('A Prática do Poder da Presença de Deus', 'Brother Lawrence', './capas-livro/download-a-pratica-da-presenca-de-deus-.jpg'),
('O Homem Eterno', 'G.K. Chesterton', './capas-livro/homem-eterno.jpg'),
('O Peregrino da Alvorada', 'C.S. Lewis', './capas-livro/Peregrino-da-Alvorada.png'),
('o Deus que destroi sonhos', 'rodrigo bibo', './capas-livro/o-deus-que-destroi-sonhos.jpg' ),
('o Deus in(visivel)', 'philip yancey', './capas-livro/deus-in(visivel).jpg'),
('senhor ensina-me a orar', 'andrew murray', './capas-livro/Ensina-me-a-orar.jpg' ),
('comprados com sangue', 'derek prince', './capas-livro/comprados-com-sangue.jpg');



drop table livros;

