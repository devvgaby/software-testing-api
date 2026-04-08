const { Router } = require('express');
const { criar, listar, buscarPorId, atualizarPorId, deletarPorId } = require('../controllers/multaController');

const router = Router();

router.post('/', criar);
router.get('/', listar);
router.get('/:id', buscarPorId);
router.put('/:id', atualizarPorId);
router.delete('/:id', deletarPorId);


module.exports = router;