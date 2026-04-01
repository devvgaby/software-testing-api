const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

const Emprestimo = sequelize.define('Emprestimo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  usuario_id: {   
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios',
      key: 'id',
    },
  },

  livro_id: {  
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'livros',
      key: 'id',
    },
  },

  data_emprestimo: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },

  data_devolucao_prevista: {
    type: DataTypes.DATE,
    allowNull: false,  
  },

  data_devolucao_real: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  }

}, {
  tableName: 'emprestimos',  
  timestamps: true,  
});

module.exports = Emprestimo;