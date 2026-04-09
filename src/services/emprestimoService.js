const { Emprestimo } = require("../models");

const criarEmprestimo = async (
  usuario_id,
  livro_id,
  data_emprestimo,
  data_devolucao_prevista,
) => {
  const emprestimo = await Emprestimo.create({
    usuario_id,
    livro_id,
    data_emprestimo,
    data_devolucao_prevista,
    data_devolucao_real: null,
  });

  return {
    id: emprestimo.id,
    usuario_id: emprestimo.usuario_id,
    livro_id: emprestimo.livro_id,
    data_emprestimo: emprestimo.data_emprestimo,
    data_devolucao_prevista: emprestimo.data_devolucao_prevista,
    data_devolucao_real: emprestimo.data_devolucao_real,
  };
};

const listarEmprestimos = async () => {
  return await Emprestimo.findAll();
};

const buscarEmprestimoPorId = async (id) => {
  return await Emprestimo.findByPk(id);
};

const atualizarEmprestimoPorId = async (
  id,
  usuario_id,
  livro_id,
  data_emprestimo,
  data_devolucao_prevista,
  data_devolucao_real,
) => {
  const emprestimo = await Emprestimo.findByPk(id);

  if (!emprestimo) return null;

  if (usuario_id) emprestimo.usuario_id = usuario_id;
  if (livro_id) emprestimo.livro_id = livro_id;
  if (data_emprestimo) emprestimo.data_emprestimo = data_emprestimo;
  if (data_devolucao_prevista) emprestimo.data_devolucao_prevista = data_devolucao_prevista;
  if (data_devolucao_real) emprestimo.data_devolucao_real = data_devolucao_real;

  await emprestimo.save();

  return emprestimo;
};

const deletarEmprestimoPorId = async (id) => {
  const emprestimo = await Emprestimo.findByPk(id);

    if (!emprestimo) return null;

    await emprestimo.destroy();

    return true;

};

module.exports = {
  criarEmprestimo,
  listarEmprestimos,
  buscarEmprestimoPorId,
  atualizarEmprestimoPorId,
  deletarEmprestimoPorId
};
