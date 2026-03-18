const { Router } = require('express');
const livrosRoutes = require('./livroRoutes');

const router = Router();

router.use('/livros', livrosRoutes)

module.exports = router;