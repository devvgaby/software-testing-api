const {
  criarLivro,
  buscarLivroPorId,
  atualizarLivroPorId,
  deletarLivroPorId,
  listarLivros,
} = require("../services/livroService");

const criar = async (req, res) => {
  const { titulo, autor } = req.body;

  if (!titulo || !autor)
    return res.status(400).json({ erro: "titulo e autor são obrigatórios" });

  const livro = await criarLivro(titulo, autor);
  res.status(201).json(livro);
};

const listar = async (req, res) => {
  try {
    const livros = await listarLivros();

    if (!livros || livros.length === 0) {
      return res.status(404).json({ erro: "Nenhum livro encontrado" });
    }

    return res.status(200).json(livros);
  } catch (error) {
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
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
  try {
    const { id } = req.params;

    const livro = await deletarLivroPorId(id);

    if (!livro) {
      return res.status(404).json({ erro: "Livro não encontrado" });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
};

module.exports = { criar, buscarPorId, listar, atualizarPorId, deletarPorId };
