const { Router } = require('express');
const { criar } = require('../controllers/livroController');
const { buscarPorId } = require('../controllers/livroController');

const router = Router();

router.post('/', criar);
router.get('/:id', buscarPorId);
    
module.exports = router;