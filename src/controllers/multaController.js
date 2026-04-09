const { Multa } = require("../models");

const {
  criarMulta,
  buscarMultaPorId,
  atualizarMultaPorId,
  deletarMultaPorId,
  listarMultas,
} = require("../services/multaService");

const formatar = (multa) => {
  if (!multa) return null;

  const multaRaw = multa.toJSON ? multa.toJSON() : multa;

  return {
    ...multaRaw,
    valor: Number(multaRaw.valor).toFixed(2),
  };
};

const criar = async (req, res) => {
  try {
    const { valor, pago, emprestimo_id } = req.body;

    if (valor == null || typeof pago !== "boolean" || emprestimo_id == null) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios e válidos" });
    }

    if (valor <= 0) {
      return res.status(400).json({ error: "valor deve ser maior que zero" });
    }

  const multa = await Multa.create({ valor, pago, emprestimo_id });
  return res.status(201).json(formatar(multa));
};

const listar = async (req, res) => {
  try {
    const multas = await listarMultas();
    // Garante que só tentará formatar se houver multas
    return res.status(200).json(multas.map(formatar));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao listar multas" });
  }
};

const buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const multa = await buscarMultaPorId(id);

    if (!multa) {
      return res.status(404).json({ error: "Multa não encontrada" });
    }

    return res.status(200).json(formatar(multa));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao buscar multa" });
  }
};

const atualizarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const { valor, pago, emprestimo_id } = req.body;

    const multa = await atualizarMultaPorId(id, valor, pago, emprestimo_id);

    if (!multa) {
      return res.status(404).json({ error: "Multa não encontrada" });
    }

    return res.status(200).json(formatar(multa));
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao atualizar multa" });
  }
};

const deletarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const multa = await deletarMultaPorId(id);

    if (!multa) {
      return res.status(404).json({ error: "Multa não encontrada" });
    }

    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao deletar multa" });
  }
};

module.exports = { criar, listar, buscarPorId, atualizarPorId, deletarPorId };
