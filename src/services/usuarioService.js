const { Usuario } = require("../models");

const criarUsuario = async (nome, email, senha, tipo) => {
  const usuario = await Usuario.create({ nome, email, senha, tipo });

  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    tipo: usuario.tipo,
  };
};

const buscarUsuarioPorId = async (id) => {
  return await Usuario.findByPk(id);
};

const listarUsuarios = async () => {
  return await Usuario.findAll();
};

const atualizarUsuarioPorId = async (id, nome, email, senha, tipo) => {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) return null;

    if (nome) usuario.nome = nome;
    if (email) usuario.email = email;
    if (senha) usuario.senha = senha;
    if (tipo) usuario.tipo = tipo;

    await usuario.save();
    return usuario;
};
const deletarUsuarioPorId = async (id) => {
  const usuario = await Usuario.findByPk(id);

  if (!usuario) return null;

  await usuario.destroy();

   return true;
};

module.exports = {
  criarUsuario,
  buscarUsuarioPorId,
  atualizarUsuarioPorId,
  deletarUsuarioPorId,
  listarUsuarios,
};
