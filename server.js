// server.js

const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 5501;

// Conectar ao banco de dados SQLite
const db = new sqlite3.Database('./bd-ok/bancoDeDados.sql'); // Use seu arquivo de banco de dados aqui

// Rota para obter todos os livros
app.get('/livros', (req, res) => {
  db.all('SELECT * FROM livros', (err, rows) => {
    if (err) {
      res.status(500).send('Erro ao buscar livros do banco de dados');
    } else {
      res.json(rows);
    }
  });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor backend rodando em http://localhost:${port}`);
});
