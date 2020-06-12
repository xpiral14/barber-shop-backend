'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Services',
      [
        {
          id: 1,
          companyId: 1,
          name: 'Corte Masculino',
          price: 20,
        },
        {
          id: 2,
          companyId: 1,
          name: 'Barba',
          price: 15,
        },
        {
          id: 3,
          companyId: 1,
          name: 'Progressiva',
          price: 25,
        },
        {
          id: 4,
          companyId: 1,
          name: 'Manutenção',
          price: 10,
        },
        {
          id: 5,
          companyId: 1,
          name: 'Selagem',
          price: 35,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  },
};
