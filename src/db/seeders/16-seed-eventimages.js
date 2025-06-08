'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('eventimages', [
      { event_id: 1, img_url: 'https://wallpapers.com/images/featured/free-background-9yo0cfxevhv8jmhq.jpg', createdAt: new Date(), updatedAt: new Date() },
      { event_id: 1, img_url: 'https://fps.cdnpk.net/photos/home/cover_v3.webp?im=AspectCrop=(640,480),xPosition=0.5', createdAt: new Date(), updatedAt: new Date() },
      { event_id: 2, img_url: 'https://wallpapers.com/images/featured/free-background-9yo0cfxevhv8jmhq.jpg', createdAt: new Date(), updatedAt: new Date() },
      { event_id: 3, img_url: 'https://fps.cdnpk.net/photos/home/cover_v3.webp?im=AspectCrop=(640,480),xPosition=0.5', createdAt: new Date(), updatedAt: new Date() },
      { event_id: 4, img_url: 'https://wallpapers.com/images/featured/free-background-9yo0cfxevhv8jmhq.jpg', createdAt: new Date(), updatedAt: new Date() },
      { event_id: 5, img_url: 'https://fps.cdnpk.net/photos/home/cover_v3.webp?im=AspectCrop=(640,480),xPosition=0.5', createdAt: new Date(), updatedAt: new Date() },
      { event_id: 5, img_url: 'https://wallpapers.com/images/featured/free-background-9yo0cfxevhv8jmhq.jpg', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('eventimages', null, {});
  }
};
