'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('organizationfollowers', [
      {
        user_id: 1,
        organization_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        organization_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        organization_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 3,
        organization_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        organization_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('organizationfollowers', null, {});
  }
};
