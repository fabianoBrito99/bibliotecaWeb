const express = require('express');
const cors = require('cors');
const path = require('path');
const livrosRouter = require('./routes/livros.routes');

const app = express();

app.use(cors({
  origin: 'http://127.0.0.1:5501',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.use(livrosRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`API iniciada na porta: ${PORT}`);
});
