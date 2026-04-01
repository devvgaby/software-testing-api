"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("emprestimos", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },

      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "usuarios",
          key: "id",
        },
        onDelete: "RESTRICT", 
        onUpdate: "CASCADE",
      },

      livro_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "livros",
          key: "id",
        },
        onDelete: "RESTRICT", 
        onUpdate: "CASCADE",
      },

      data_emprestimo: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },

      data_devolucao_prevista: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      data_devolucao_real: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },

      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("emprestimos");
  },
};