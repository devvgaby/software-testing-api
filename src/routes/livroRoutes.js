const { Router } = require('express');
const { criar, buscarPorId, atualizarPorId, deletarPorId } = require('../controllers/livroController');

const router = Router();

router.post('/', criar);
router.get('/:id', buscarPorId);
router.put('/:id', atualizarPorId)
router.delete('/:id', deletarPorId)
    
module.exports = router;