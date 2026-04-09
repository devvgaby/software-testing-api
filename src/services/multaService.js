const { Multa } = require('../models');

const criarMulta = async ({ valor, pago, emprestimo_id }) => {
    const multa = await Multa.create({ valor, pago, emprestimo_id });

    return {
        id: multa.id,
        valor: multa.valor,
        pago: multa.pago,
        emprestimo_id: multa.emprestimo_id,
    };  
};

const buscarMultaPorId = async (id) => {
    return await Multa.findByPk(id);
};

const listarMultas = async () => {
    return await Multa.findAll();
};

const atualizarMultaPorId = async (id, valor, pago, emprestimo_id) => {
  const multa = await Multa.findByPk(id);
  if (!multa) return null;

  if (valor !== undefined) multa.valor = valor;
  if (pago !== undefined) multa.pago = pago;
  if (emprestimo_id !== undefined) multa.emprestimo_id = emprestimo_id;

  await multa.save();
  return multa;
};

const deletarMultaPorId = async (id) => {
    const multa = await Multa.findByPk(id);

    if (!multa) return null;

    await multa.destroy();
    return true;
};

module.exports = {
    criarMulta,
    buscarMultaPorId,
    atualizarMultaPorId,
    deletarMultaPorId,
    listarMultas
}