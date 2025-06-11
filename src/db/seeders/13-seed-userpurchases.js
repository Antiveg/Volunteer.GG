'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('userpurchases', [
      {
        user_id: 1,
        item_id: 3,
        money_price: 200.00,
        point_price: null,
        createdAt: new Date('2025-06-10T14:30:00Z'),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        item_id: 4,
        money_price: null,
        point_price: 500,
        createdAt: new Date('2025-05-15T09:45:00Z'),
        updatedAt: new Date()
      },
      {
        user_id: 3,
        item_id: 1,
        money_price: 150.00,
        point_price: null,
        createdAt: new Date('2025-05-20T17:00:00Z'),
        updatedAt: new Date()
      },
      {
        user_id: 4,
        item_id: 2,
        money_price: null,
        point_price: 250,
        createdAt: new Date('2025-07-01T12:00:00Z'),
        updatedAt: new Date()
      },
      {
        user_id: 5,
        item_id: 5,
        money_price: 300.00,
        point_price: null,
        createdAt: new Date('2025-06-25T10:00:00Z'),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('userpurchases', null, {});
  }
};
