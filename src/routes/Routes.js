const { Router } = require('express');
const livrosRoutes = require('./livroRoutes');
const usuariosRoutes = require('./usuarioRoutes');

const router = Router();

router.use('/livros', livrosRoutes)
router.use('/usuarios', usuariosRoutes)

module.exports = router;