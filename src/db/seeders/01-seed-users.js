'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        // id: 1,
        name: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        password: await bcrypt.hash('password123', 10),
        bio: 'Adventurer, tech enthusiast, and foodie. Always looking for new experiences.',
        city: 'San Francisco',
        province: 'California',
        country: 'USA',
        total_points: 1250,
        monthly_points: 150,
        usable_points: 500,
        status: 'Active',
        dob: '1990-05-15',
        gender: 'Female',
        img_url: 'https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 2,
        name: 'Bob Williams',
        email: 'bob.williams@example.com',
        password: await bcrypt.hash('bob2021secure', 10),
        bio: 'Musician and traveler. Always up for an impromptu jam session.',
        city: 'Austin',
        province: 'Texas',
        country: 'USA',
        total_points: 950,
        monthly_points: 120,
        usable_points: 350,
        status: 'Active',
        dob: '1985-08-24',
        gender: 'Male',
        img_url: 'https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 3,
        name: 'Charlie Brown',
        email: 'charlie.brown@example.com',
        password: await bcrypt.hash('charliebrown2022', 10),
        bio: 'Sports enthusiast and book lover. I enjoy a good read and an afternoon run.',
        city: 'Vancouver',
        province: 'British Columbia',
        country: 'Canada',
        total_points: 1050,
        monthly_points: 80,
        usable_points: 450,
        status: 'Inactive',
        dob: '1993-12-01',
        gender: 'Male',
        img_url: 'https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 4,
        name: 'Dana Sutherland',
        email: 'dana.sutherland@example.com',
        password: await bcrypt.hash('dana789secure', 10),
        bio: 'Coffee lover and graphic designer. Passionate about creative projects and always learning new skills.',
        city: 'London',
        province: 'England',
        country: 'UK',
        total_points: 980,
        monthly_points: 100,
        usable_points: 400,
        status: 'Active',
        dob: '1988-11-20',
        gender: 'Female',
        img_url: 'https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        // id: 5,
        name: 'Ethan Lee',
        email: 'ethan.lee@example.com',
        password: await bcrypt.hash('ethan2021!secure', 10),
        bio: 'Tech geek and photography enthusiast. Always capturing moments through my lens.',
        city: 'Toronto',
        province: 'Ontario',
        country: 'Canada',
        total_points: 1100,
        monthly_points: 90,
        usable_points: 300,
        status: 'Active',
        dob: '1992-03-10',
        gender: 'Male',
        img_url: 'https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small_2x/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
