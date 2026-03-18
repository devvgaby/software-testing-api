const { criarLivro } = require('../services/livroService');
const Livro = require('../models/Livro');

const criar = (req, res) => {
    const { titulo, autor } = req.body;

    if(!titulo || !autor) return res.status(400).
        json({ erro: 'titulo e autor são obrigatórios' })

    const livro = criarLivro(titulo, autor);
    res.status(201).json(livro);
}

const buscarPorId = async (req, res) => {
  const { id } = req.params;

  const livro = await Livro.findByPk(id);

  if (!livro) return res.status(404).json({ erro: 'Livro não encontrado!' });

  return res.status(200).json(livro);
};

module.exports = { criar, buscarPorId };