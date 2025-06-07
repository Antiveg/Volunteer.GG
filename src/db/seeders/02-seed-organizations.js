'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('organizations', [
      {
        // id: 1,
        name: 'Green Earth Foundation',
        description: 'Dedicated to environmental sustainability and awareness campaigns worldwide.',
        avg_rating: 4.7,
        credibility: 'Trusted',
        logo_url: 'https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?semt=ais_hybrid&w=740',
        active_time: '2010-present',
        location: 'Global',
        phone: '+1234567890',
        instagram: '@greenearth',
        twitter: '@greenearth_org',
        discord: 'discord.gg/greenearth',
        other: 'greenearth.org',
        creator_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 2,
        name: 'Future Coders Initiative',
        description: 'Empowering underrepresented communities with programming and tech education.',
        avg_rating: 4.2,
        credibility: 'Good',
        logo_url: 'https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?semt=ais_hybrid&w=740',
        active_time: '2015-present',
        location: 'USA',
        phone: '+1987654321',
        instagram: '@futurecoders',
        twitter: '@futurecoders_io',
        discord: 'discord.gg/futurecoders',
        other: 'futurecoders.org',
        creator_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 3,
        name: 'Wellness for All',
        description: 'Promoting mental and physical wellness through accessible community programs.',
        avg_rating: 3.5,
        credibility: 'Neutral',
        logo_url: 'https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?semt=ais_hybrid&w=740',
        active_time: '2012-present',
        location: 'Canada',
        phone: '+1122334455',
        instagram: '@wellforall',
        twitter: '@wellforall',
        discord: null,
        other: 'wellforall.org',
        creator_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 4,
        name: 'Open Aid Network',
        description: 'Connecting donors with verified small-scale humanitarian projects across the globe.',
        avg_rating: 4.9,
        credibility: 'Trusted',
        logo_url: 'https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?semt=ais_hybrid&w=740',
        active_time: '2008-present',
        location: 'Worldwide',
        phone: '+1098765432',
        instagram: '@openaidnet',
        twitter: '@openaidnet',
        discord: 'discord.gg/openaid',
        other: 'openaid.org',
        creator_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 5,
        name: 'Urban Youth Alliance',
        description: 'Working to improve opportunities for inner-city youth through education and mentorship.',
        avg_rating: 2.8,
        credibility: 'Suspicious',
        logo_url: 'https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?semt=ais_hybrid&w=740',
        active_time: 'Unknown',
        location: 'New York City',
        phone: 'Unknown',
        instagram: 'Unknown',
        twitter: '@urbanyouthny',
        discord: null,
        other: null,
        creator_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('organizations', null, {});
  }
};
