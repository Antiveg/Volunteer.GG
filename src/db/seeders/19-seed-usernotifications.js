'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('usernotifications', [
      {
        sender_id: 1,
        receiver_id: 2,
        is_read: false,
        content: 'You have been invited to join the "Green Earth" event!',
        redirect_to: '/events/1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sender_id: null,
        receiver_id: 3,
        is_read: false,
        content: 'Your point balance has been updated.',
        redirect_to: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sender_id: 2,
        receiver_id: 1,
        is_read: true,
        content: 'Your purchase has been confirmed. Thank you!',
        redirect_to: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sender_id: null,
        receiver_id: 4,
        is_read: false,
        content: 'Welcome to the platform! Complete your profile to get started.',
        redirect_to: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        sender_id: 3,
        receiver_id: 1,
        is_read: true,
        content: 'Your event registration has been cancelled.',
        redirect_to: 'events/1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('usernotifications', null, {});
  }
};
