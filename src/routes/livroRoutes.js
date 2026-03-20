const { Router } = require('express');
const { criar, buscarPorId, atualizarPorId } = require('../controllers/livroController');

const router = Router();

router.post('/', criar);
router.get('/:id', buscarPorId);
router.put('/:id', atualizarPorId)
    
module.exports = router;