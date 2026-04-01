const {
  criarUsuario,
  buscarUsuarioPorId,
  listarUsuarios,
  atualizarUsuarioPorId,
  deletarUsuarioPorId,
} = require("../services/usuarioService");

const bcrypt = require("bcrypt");

const criar = async (req, res) => {
  try {
    const { nome, email, senha, tipo } = req.body;

    if (!nome || !email || !senha || !tipo) {
      return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = await criarUsuario(nome, email, senhaHash, tipo);

    return res.status(201).json(usuario);
  } catch (error) {
    return res.status(400).json({ erro: "Email já cadastrado" });
  }
};

const listar = async (req, res) => {
  try {
    const usuarios = await listarUsuarios();

    return res.status(200).json(usuarios);
  } catch (error) {
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
};

const buscarPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await buscarUsuarioPorId(id);

    if (!usuario) {
      return res.status(404).json({ erro: "Nenhum usuário encontrado!" });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
};

const atualizarPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    const usuario = await atualizarUsuarioPorId(id, nome, email, senha);

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado!" });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(400).json({ erro: "Erro ao atualizar usuário" });
  }
};

const deletarPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await deletarUsuarioPorId(id);

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado!" });
    }

    return res.status(200).json({ mensagem: "Usuário removido" });
  } catch (error) {
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
};

module.exports = { criar, listar, buscarPorId, atualizarPorId, deletarPorId };
