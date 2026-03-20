const {
  criarLivro,
  buscarLivroPorId,
  atualizarLivroPorId,
} = require("../services/livroService");

const { Livro } = require ("../models");

const criar = async (req, res) => {
  const { titulo, autor } = req.body;

  if (!titulo || !autor)
    return res.status(400).json({ erro: "titulo e autor são obrigatórios" });

  const livro = await criarLivro(titulo, autor);
  res.status(201).json(livro);
};

const buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const livro = await buscarLivroPorId(id);

    if (!livro) return res.status(404).json({ erro: "Livro não encontrado!" });

    return res.status(200).json(livro);
  } catch (error) {
    return res.status(500).json({ erro: "Erro" });
  }
};

const atualizarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, autor } = req.body;

    const livro = await atualizarLivroPorId(id, titulo, autor);

    if (!livro) {
      return res.status(404).json({ erro: "Livro não encontrado" });
    }

    return res.status(200).json(livro);
  } catch (error) {
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
};

const deletarPorId = async (req, res) => {
  const { id } = req.params;

  const livro = await Livro.findByPk(id);

  if (!livro) {
    return res.status(404).json({ erro: "Livro não encontrado" });
  }

  await livro.destroy();

  return res.status(204).send();
};


module.exports = { criar, buscarPorId, atualizarPorId, deletarPorId  };
