"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("CompanyAddresses", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      companyId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Companies",
          key: "id",
        },
      },
      cep: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING(100),
      },
      city: {
        type: Sequelize.STRING(100),
      },
      neighborhood: {
        type: Sequelize.STRING(100),
      },
      street: {
        type: Sequelize.STRING(100),
      },
      number: {
        type: Sequelize.STRING(100),
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("CompanyAddresses")
  },
};