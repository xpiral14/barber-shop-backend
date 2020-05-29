"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("ServiceDurationTimes", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      barberId:{
        type: Sequelize.INTEGER,
        references:{
          model: "Users",
          key: "id"
        },
        allowNull: false
      },
      initialTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      finishTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt:{
        type: Sequelize.DATE
      },
      updatedAt:{
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("ServiceDurationTimes");
  },
};
