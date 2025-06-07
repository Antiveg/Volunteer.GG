'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('userhistories', [
      {
        point_change: 50,
        content: 'User attended a community event.',
        history_origin: 'event',
        event_id: 1,
        purchase_id: null,
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        point_change: -20,
        content: 'User redeemed points for merchandise.',
        history_origin: 'purchase',
        event_id: null,
        purchase_id: 2,
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        point_change: 100,
        content: 'User completed a milestone challenge.',
        history_origin: 'system',
        event_id: null,
        purchase_id: null,
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        point_change: -10,
        content: 'Late check-in penalty at an event.',
        history_origin: 'event',
        event_id: 3,
        purchase_id: null,
        user_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        point_change: 25,
        content: 'Referral bonus for inviting a friend.',
        history_origin: 'system',
        event_id: null,
        purchase_id: null,
        user_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('userhistories', null, {});
  }
};
