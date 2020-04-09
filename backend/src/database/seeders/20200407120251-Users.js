'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 1,
          companyId: 1,
          userTypeId: 1,
          genderId: 1,
          name: 'Samuel Reis',
          email: 'sa@gmail.com',
          passwordhash: '$2b$08$P4cfNPFO6m5IKnLPfW8NOeMncEq4E7/daN7ekK9QT9b9Bm28Hv2ty',
        },
        {
          id: 2,
          companyId: 1,
          userTypeId: 2,
          genderId: 1,
          name: 'Ricardo Alves',
          email: 'ricardo@gmail.com',
          passwordhash: '$2b$08$P4cfNPFO6m5IKnLPfW8NOeMncEq4E7/daN7ekK9QT9b9Bm28Hv2ty',
        },
        {
          id: 3,
          companyId: 2,
          userTypeId: 1,
          genderId: 2,
          name: 'Sabrina Reis',
          email: 'sab@gmail.com',
          passwordhash: '$2b$08$P4cfNPFO6m5IKnLPfW8NOeMncEq4E7/daN7ekK9QT9b9Bm28Hv2ty',
        },
        {
          id: 4,
          companyId: 2,
          userTypeId: 2,
          genderId: 2,
          name: 'André Reis',
          email: 'anreis@gmail.com',
          passwordhash: '$2b$08$P4cfNPFO6m5IKnLPfW8NOeMncEq4E7/daN7ekK9QT9b9Bm28Hv2ty',
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
