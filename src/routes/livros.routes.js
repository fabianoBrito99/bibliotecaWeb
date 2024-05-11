const express = require('express');
const livrosController =require('../controllers/livros.controllers');

const router = express.Router();

router.get('/livro/:codigo', livrosController.show);
router.get('/livro', livrosController.list);
router.post('/livro', livrosController.create);
//router.put('/livro/:codigo', livrosController.update);
//router.delete('/livro/:codigo', livrosController.destroy);
module.exports = router;