'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('items', [
      {
        // id: 1,
        name: 'Gold Trophy',
        description: 'A shining gold trophy awarded for excellence in the annual competition.',
        img_url: 'https://img.freepik.com/free-photo/free-bonus-gift-offer-sample-trial-graphic-concept_53876-124905.jpg?semt=ais_hybrid&w=740',
        type: 'premium',
        money_price: 150.00,
        point_price: 1200,
        count: 25,
        existed_until: new Date('2025-12-31T23:59:59Z'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 2,
        name: 'Exclusive Event T-shirt',
        description: 'A limited edition T-shirt with the event logo and a cool design.',
        img_url: 'https://img.freepik.com/free-photo/free-bonus-gift-offer-sample-trial-graphic-concept_53876-124905.jpg?semt=ais_hybrid&w=740',
        type: 'limited',
        money_price: 30.00,
        point_price: 250,
        count: 100,
        existed_until: new Date('2025-06-30T23:59:59Z'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 3,
        name: 'VIP Lounge Access',
        description: 'Access to the exclusive VIP lounge during the event with free refreshments.',
        img_url: 'https://img.freepik.com/free-photo/free-bonus-gift-offer-sample-trial-graphic-concept_53876-124905.jpg?semt=ais_hybrid&w=740',
        type: 'premium',
        money_price: 200.00,
        point_price: 1500,
        count: 15,
        existed_until: new Date('2025-08-15T23:59:59Z'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 4,
        name: 'Commemorative Medal',
        description: 'A beautiful silver medal to commemorate your participation.',
        img_url: 'https://img.freepik.com/free-photo/free-bonus-gift-offer-sample-trial-graphic-concept_53876-124905.jpg?semt=ais_hybrid&w=740',
        type: 'standard',
        money_price: 50.00,
        point_price: 500,
        count: 200,
        existed_until: new Date('2025-12-31T23:59:59Z'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 5,
        name: 'Exclusive VIP Pass',
        description: 'A pass that allows priority seating and backstage access at any event.',
        img_url: 'https://img.freepik.com/free-photo/free-bonus-gift-offer-sample-trial-graphic-concept_53876-124905.jpg?semt=ais_hybrid&w=740',
        type: 'limited',
        money_price: 300.00,
        point_price: 2500,
        count: 10,
        existed_until: new Date('2025-07-01T23:59:59Z'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('items', null, {});
  }
};
