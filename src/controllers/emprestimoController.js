const { Emprestimo } = require('../models');

const criar = async (req, res) => {
  const {
    usuario_id,
    livro_id,
    data_emprestimo,
    data_devolucao_prevista,
  } = req.body;

  if (!usuario_id || !livro_id || !data_emprestimo || !data_devolucao_prevista) {
    return res.status(400).json({ erro: "Campos obrigatórios faltando!" });
  }

  const emprestimo = await Emprestimo.create({
    usuario_id,
    livro_id,
    data_emprestimo,
    data_devolucao_prevista,
    data_devolucao_real: null, 
  });

  return res.status(201).json(emprestimo);
};

const listar = async (req, res) => {
  const emprestimos = await Emprestimo.findAll();

  return res.status(200).json(emprestimos);
};

const buscarPorId = async (req, res) => {
  const { id } = req.params;

  const emprestimo = await Emprestimo.findByPk(id);

  if (!emprestimo) {
    return res.status(404).json({ erro: "Empréstimo não encontrado." });
  }

  return res.status(200).json(emprestimo);
};

const atualizarPorId = async (req, res) => {
  const { id } = req.params;

  const emprestimo = await Emprestimo.findByPk(id);

  if (!emprestimo) {
    return res.status(404).json({ erro: "Empréstimo não encontrado." });
  }

  const {
    usuario_id,
    livro_id,
    data_emprestimo,
    data_devolucao_prevista,
    data_devolucao_real,
  } = req.body;

  await emprestimo.update({
    usuario_id,
    livro_id,
    data_emprestimo,
    data_devolucao_prevista,
    data_devolucao_real,
  });

  return res.status(200).json(emprestimo);
};

const deletarPorId = async (req, res) => {
  const { id } = req.params;

  const emprestimo = await Emprestimo.findByPk(id);

  if (!emprestimo) {
    return res.status(404).json({ erro: "Empréstimo não encontrado." });
  }

  await emprestimo.destroy();

  return res.status(200).json({ mensagem: "Empréstimo removido" });
};

module.exports = {
  criar,
  listar,
  buscarPorId,
  atualizarPorId,
  deletarPorId,
};