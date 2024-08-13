const express = require('express');
const livrosController = require('../controllers/livros.controllers');

const router = express.Router();

router.get('/livro/:codigo', livrosController.show);
router.get('/livro', livrosController.list);
router.post('/livro', livrosController.create);
router.get('/categorias', livrosController.listCategories);  // Adicionando a nova rota
//router.put('/livro/:codigo', livrosController.update);
//router.delete('/livro/:codigo', livrosController.destroy);

module.exports = router;
