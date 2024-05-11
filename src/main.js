const express = require('express');
const cors = require('cors');
const app = express();
const livrosRouter = require('./routes/livros.routes');


app.use(cors({
  origin: 'http://127.0.0.1:5501', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

app.use(livrosRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`API iniciada na porta: ${PORT}`);
});



