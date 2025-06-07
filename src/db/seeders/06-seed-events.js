'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('events', [
      {
        // id: 1,
        name: 'Tech Future Conference 2025',
        location: 'Jakarta Convention Center, Indonesia',
        base_points: 50,
        final_points: 150,
        description: 'A global conference bringing together tech leaders to discuss the future of innovation, AI, and sustainability.',
        start_datetime: new Date('2025-07-10T09:00:00Z'),
        end_datetime: new Date('2025-07-10T17:00:00Z'),
        certificate_url: 'https://static.vecteezy.com/system/resources/thumbnails/002/349/754/small_2x/modern-elegant-certificate-template-free-vector.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        creator_id: 1,
        organization_id: 1
      },
      {
        // id: 2,
        name: 'Green Earth Clean-Up Drive',
        location: 'Greenfield Park, Bandung',
        base_points: 30,
        final_points: 90,
        description: 'Join the community for a clean-up initiative to restore the natural beauty of Greenfield Park.',
        start_datetime: new Date('2025-08-05T07:30:00Z'),
        end_datetime: new Date('2025-08-05T12:00:00Z'),
        certificate_url: 'https://static.vecteezy.com/system/resources/thumbnails/002/349/754/small_2x/modern-elegant-certificate-template-free-vector.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        creator_id: 2,
        organization_id: 2,
      },
      {
        // id: 3,
        name: 'Digital Art & NFT Workshop',
        location: 'Creative Hall, Surabaya',
        base_points: 40,
        final_points: 120,
        description: 'Learn the basics of digital art, NFT minting, and blockchain creativity in this hands-on session.',
        start_datetime: new Date('2025-09-12T13:00:00Z'),
        end_datetime: new Date('2025-09-12T17:30:00Z'),
        certificate_url: 'https://static.vecteezy.com/system/resources/thumbnails/002/349/754/small_2x/modern-elegant-certificate-template-free-vector.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        creator_id: 3,
        organization_id: 3,
      },
      {
        // id: 4,
        name: 'Youth Leadership Summit',
        location: 'Youth Center, Yogyakarta',
        base_points: 60,
        final_points: 180,
        description: 'Empowering future leaders through inspiring talks, group activities, and mentorship sessions.',
        start_datetime: new Date('2025-10-01T10:00:00Z'),
        end_datetime: new Date('2025-10-01T18:00:00Z'),
        certificate_url: 'https://static.vecteezy.com/system/resources/thumbnails/002/349/754/small_2x/modern-elegant-certificate-template-free-vector.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        creator_id: 4,
        organization_id: 4,
      },
      {
        // id: 5,
        name: 'Culinary Culture Expo',
        location: 'Expo Hall, Bali',
        base_points: 20,
        final_points: 60,
        description: 'Explore the diverse flavors of Indonesian cuisine and attend live cooking demonstrations from top chefs.',
        start_datetime: new Date('2025-11-20T11:00:00Z'),
        end_datetime: new Date('2025-11-20T15:30:00Z'),
        certificate_url: 'https://static.vecteezy.com/system/resources/thumbnails/002/349/754/small_2x/modern-elegant-certificate-template-free-vector.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        creator_id: 5,
        organization_id: 5,
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('events', null, {});
  }
};
