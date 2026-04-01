const { Router } = require('express');
const livrosRoutes = require('./livroRoutes');
const usuariosRoutes = require('./usuarioRoutes');
const emprestimosRoutes = require('./emprestimoRoutes');

const router = Router();

router.use('/livros', livrosRoutes)
router.use('/usuarios', usuariosRoutes)
router.use('/emprestimos', emprestimosRoutes)

module.exports = router;