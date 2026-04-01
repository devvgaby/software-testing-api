const { 
  criarEmprestimo, 
  listarEmprestimos, 
  buscarEmprestimoPorId, 
  atualizarEmprestimoPorId, 
  deletarEmprestimoPorId 
} = require("../services/emprestimoService");

const criar = async (req, res) => {
  try {
    const { usuario_id, livro_id, data_emprestimo, data_devolucao_prevista } = req.body;

    if (!usuario_id || !livro_id || !data_emprestimo || !data_devolucao_prevista) {
      return res.status(400).json({ erro: "Campos obrigatórios faltando!" });
    }

    const emprestimo = await criarEmprestimo(usuario_id, livro_id, data_emprestimo, data_devolucao_prevista);
    return res.status(201).json(emprestimo);
  } catch (error) {
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
};

const listar = async (req, res) => {
  try {
    const emprestimos = await listarEmprestimos();
    return res.status(200).json(emprestimos);
  } catch (error) {
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
};

const buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const emprestimo = await buscarEmprestimoPorId(id);
    if (!emprestimo) return res.status(404).json({ erro: "Empréstimo não encontrado." });
    return res.status(200).json(emprestimo);
  } catch (error) {
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
};

const atualizarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuario_id, livro_id, data_emprestimo, data_devolucao_prevista, data_devolucao_real } = req.body;

    const emprestimo = await atualizarEmprestimoPorId(id, usuario_id, livro_id, data_emprestimo, data_devolucao_prevista, data_devolucao_real);

    if (!emprestimo) return res.status(404).json({ erro: "Empréstimo não encontrado." });
    return res.status(200).json(emprestimo);
  } catch (error) {
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
};

const deletarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const deletado = await deletarEmprestimoPorId(id);

    if (!deletado) return res.status(404).json({ erro: "Empréstimo não encontrado." });
    return res.status(200).json({ mensagem: "Empréstimo removido" });
  } catch (error) {
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
};

module.exports = {
  criar,
  listar,
  buscarPorId,
  atualizarPorId,
  deletarPorId,
};