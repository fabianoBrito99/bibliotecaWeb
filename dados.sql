CREATE DATABASE bibliota_web;
use bibliota_web;

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
VALUES ('O Peregrino', 'John Bunyan', './capas-livro/O-peregrino-2.jpg', 'devocional', 'DEPOIS DA BÍBLIA, ESTE É O LIVRO MAIS LIDO EM TODO O MUNDO HÁ MAIS DE TRÊS SÉCULOS. O PEREGRINO, DO INGLÊS JOHN BUNYAN, MANTÉM-SE ATUAL PORQUE TRATA DA ESSÊNCIA DA VIDA HUMANA: A BUSCA DA FELICIDADE Como o leitor perceberá nesta história alegórica, o que o personagem Cristão enfrenta em sua caminhada da Cidade da Destruição para a Cidade Celestial não é diferente do que sempre aconteceu e ainda está presente na trajetória da humanidade: perigos, maldades, traições, mas também boa vontade, sabedoria e esperança. Traduzido em mais de 200 idiomas, O Peregrino cativa ainda pela beleza e simplicidade do texto. Nesta versão atualizada, Claudio Blanc usa a linguagem de hoje, sem deixar escapar nada da riqueza do original. Ele recria nomes de personagens, bons e maus, bem fiéis ao que se vê hoje no Brasil e pelo mundo afora, como Amor-ao-Dinheiro, Bajulação, Caridade, Duas Caras, Glória Mundana, Hipocrisia, Ignorância, Legalidade, Ócio, Piedade, Pretensioso e Vira-Casaca.', 'disponivel'),
('Mere Christianity', 'C.S. Lewis', './capas-livro/mere.jpg', 'devocional', ' a', 'disponivel'),
('O Evangelho Maltrapilho', 'Brennan Manning', './capas-livro/O-evangelho-maltrapilho.png', 'devocional', '"O evangelho maltrapilho" foi escrito para pessoas aniquiladas, derrotadas e exauridas. Pessoas que se acham indignas de receber o amor de Deus. Quem sabe, ignoradas pela comunidade de cristãos por não se encaixarem no perfil de super-homem ou de supermulher que lhes é constantemente exigido. Pessoas cansadas da espiritualidade superficial e consumista. Pessoas que travam inúmeras batalhas interiores por não se sentirem parte de uma comunidade afetiva e acolhedora. É um livro que escrevi para mim mesmo e para quem quer que tenha ficado cansado e desencorajado ao longo do Caminho, confessa o autor. Franco e provocador, o aclamado filósofo e teólogo cristão Brennan Manning estréia em língua portuguesa com sua principal obra, que nos convida a depositar nossa esperança na amplitude da graça, capaz de alcançar pecadores e pobres em espírito, e de resgatar nossa dignidade original. No mínimo, você não ficará indiferente a ela.', 'alugado'),
('A Cabana', 'William P. Young', './capas-livro/a-cabana.webp', 'devocional', ' a', 'disponivel'),
('Em Busca de Deus', 'A.W. Tozer', './capas-livro/em-busca-de-deus.jpg', 'devocional', ' a', 'disponivel'),
('O Poder da Mulher que Ora', 'Stormie Omartian', './capas-livro/o-poder-da-mulher.jpg', 'devocional', ' a', 'disponivel'),
('A Prática do Poder da Presença de Deus', 'Brother Lawrence', './capas-livro/download-a-pratica-da-presenca-de-deus-.jpg', 'devocional', ' a', 'disponivel'),
('O Homem Eterno', 'G.K. Chesterton', './capas-livro/homem-eterno.jpg', 'devocional', ' a', 'disponivel'),
('O Peregrino da Alvorada', 'C.S. Lewis', './capas-livro/Peregrino-da-Alvorada.png', 'devocional', ' a', 'disponivel'),
('o Deus que destroi sonhos', 'rodrigo bibo', './capas-livro/o-deus-que-destroi-sonhos.jpg', 'devocional', ' a', 'disponivel' ),
('o Deus in(visivel)', 'philip yancey', './capas-livro/deus-in(visivel).jpg', 'devocional', ' a', 'disponivel'),
('senhor ensina-me a orar', 'andrew murray', './capas-livro/Ensina-me-a-orar.jpg', 'devocional', ' a', 'disponivel'),
('comprados com sangue', 'derek prince', './capas-livro/comprados-com-sangue.jpg', 'reflexivo', ' a', 'disponivel'),
('Bible','teste', 'https://openlibrary.org/works/OL17732W', 'reflexivo', ' a', 'disponivel');

drop table livros;

