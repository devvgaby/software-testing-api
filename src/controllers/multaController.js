const { Multa } = require("../models");

const formatar = (multa) => ({
  ...multa.toJSON(),
  valor: Number(multa.valor).toFixed(2), // usado para garantir que o valor seja retornado como string com 2 casas decimais, mesmo que seja armazenado como decimal 
});

const criar = async (req, res) => {
  const { valor, pago, emprestimo_id } = req.body;

  if (valor == null || typeof pago !== "boolean" || emprestimo_id == null) {
    return res.status(400).json({ error: "Todos os campos são obrigatórios e válidos" });
  }

  if (valor <= 0) {
    return res.status(400).json({ error: "valor deve ser maior que zero" });
  }

  const multa = await Multa.create({ valor, pago, emprestimo_id });
  return res.status(201).json(formatar(multa));
};

const listar = async (req, res) => {
  const multas = await Multa.findAll();
  return res.status(200).json(multas.map(formatar)); // usado para garantir que cada multa seja formatada corretamente antes de ser retornada na resposta
};

const buscarPorId = async (req, res) => {
  const { id } = req.params;
  const multa = await Multa.findByPk(id);

  if (!multa) {
    return res.status(404).json({ error: "Multa não encontrada" });
  }

  return res.status(200).json(formatar(multa));
};

const atualizarPorId = async (req, res) => {
  const { id } = req.params;
  const { valor, pago, emprestimo_id } = req.body;

  const multa = await Multa.findByPk(id);

  if (!multa) {
    return res.status(404).json({ error: "Multa não encontrada" });
  }

  if (valor != null) {
    if (valor <= 0) {
      return res.status(400).json({ error: "valor deve ser maior que zero" });
    }
    multa.valor = valor;
  }

  if (pago != null) {
    if (typeof pago !== "boolean") {
      return res.status(400).json({ error: "pago deve ser booleano" });
    }
    multa.pago = pago;
  }

  if (emprestimo_id != null) {
    multa.emprestimo_id = emprestimo_id;
  }

  await multa.save();
  return res.status(200).json(formatar(multa));
};

const deletarPorId = async (req, res) => {
  const { id } = req.params;
  const multa = await Multa.findByPk(id);

  if (!multa) {
    return res.status(404).json({ error: "Multa não encontrada" });
  }

  await multa.destroy();
  return res.status(204).send();
};

module.exports = { criar, listar, buscarPorId, atualizarPorId, deletarPorId };