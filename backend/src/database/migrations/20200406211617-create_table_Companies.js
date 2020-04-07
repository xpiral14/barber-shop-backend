'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.createTable('Companies', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement: true
      },
      fantasyName:{
        type: Sequelize.STRING(100),
        allowNull: false
      },
      logo:{
        type: Sequelize.STRING(200),
      },
      cnpj: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
      },
      email:{
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true
      },
      passwordHash:{
        type: Sequelize.STRING(200),
        allowNull: false
      },
      createdAt:{
        type: Sequelize.DATE
      },
      updatedAt:{
        type: Sequelize.DATE
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Companies') 
  }
};
