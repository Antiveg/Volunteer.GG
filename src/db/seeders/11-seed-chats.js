'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('chats', [
      { sender_id: 1, receiver_id: 2, chat: 'Hey Bob! How was your weekend?', is_read: false, createdAt: new Date(), updatedAt: new Date() },
      { sender_id: 1, receiver_id: 3, chat: 'Hey Charlie, are you up for a hike this weekend?', is_read: false, createdAt: new Date(), updatedAt: new Date() },
      { sender_id: 2, receiver_id: 4, chat: 'Dana, do you have the design files for the project?', is_read: false, createdAt: new Date(), updatedAt: new Date() },
      { sender_id: 3, receiver_id: 5, chat: 'Ethan, can you send me the link to the tech talk?', is_read: false, createdAt: new Date(), updatedAt: new Date() },
      { sender_id: 4, receiver_id: 2, chat: 'Bob, I was thinking about your idea for the event. It sounds great!', is_read: false, createdAt: new Date(), updatedAt: new Date() },
      { sender_id: 5, receiver_id: 1, chat: 'Alice, I saw that amazing picture you posted from the trail last weekend!', is_read: false, createdAt: new Date(), updatedAt: new Date() },
      { sender_id: 2, receiver_id: 5, chat: 'Ethan, do you want to join a photography meetup next month?', is_read: false, createdAt: new Date(), updatedAt: new Date() },
      { sender_id: 3, receiver_id: 4, chat: 'Dana, we should plan something fun for the upcoming long weekend!', is_read: false, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('chats', null, {});
  }
};
