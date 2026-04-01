const Usuario = require("../models/Usuario");

const criar = async (req, res) => {
  const { nome, email, senha, tipo } = req.body;

  if (!nome || !email || !senha || !tipo) {
    return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
  }

  try {
    const usuario = await Usuario.create({ nome, email, senha, tipo });
    return res.status(201).json(usuario);
  } catch (err) {
    return res.status(400).json({ erro: "Email já cadastrado" });
  }
};

const listar = async (req, res) => {
  const usuarios = await Usuario.findAll();

  return res.status(200).json(usuarios);
};

const buscarPorId = async (req, res) => {
  const { id } = req.params;

  const usuario = await Usuario.findByPk(id);

  if (!usuario) {
    return res.status(404).json({ erro: "Nenhum usuário encontrado!" });
  }

  return res.status(200).json(usuario);
};

const atualizarPorId = async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  const usuario = await Usuario.findByPk(id);

  if (!usuario) {
    return res.status(404).json({ erro: "Usuário não encontrado!" });
  }

  usuario.nome = nome;
  usuario.email = email;
  usuario.senha = senha;

  await usuario.save();

  return res.status(200).json(usuario);
};

const deletarPorId = async (req, res) => {
  const { id } = req.params;

  const usuario = await Usuario.findByPk(id);

  if (!usuario) {
    return res.status(404).json({ erro: "Usuário não encontrado!" });
  }

  await usuario.destroy();

  return res.status(200).json({ mensagem: "Usuário removido" });
};

module.exports = { criar, listar, buscarPorId, atualizarPorId, deletarPorId };
