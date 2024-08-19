const express = require('express');
const emprestimosController = require('../controllers/emprestimos.controllers');

const router = express.Router();

//router.get('/livro/:codigo', emprestimosController.show);
router.get('/emprestimos', emprestimosController.list);
//router.post('/livro', emprestimosController.create);
//router.get('/categorias', emprestimosController.listCategories);  // Adicionando a nova rota
//router.put('/livro/:codigo', emprestimosController.update);
//router.delete('/livro/:codigo', emprestimosController.destroy);

module.exports = router;
