const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");

const Multa = sequelize.define("Multa", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  pago: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  emprestimo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "emprestimos",
      key: "id",
    },
  },
}, {
  tableName: 'multas',
  timestamps: true,
  underscored: false,
});

module.exports = Multa;
