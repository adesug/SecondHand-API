'use strict';
const fs = require('fs')
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync('./data/notifications.json', 'utf-8'))
    const notifications = data.map((element) => {
      return {
        produk_id: element.produk_id,
        user_id_seller: element.user_id_seller,
        user_id_buyer: element.user_id_buyer,
        status: element.status,
        status_baca: element.status_baca,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })
    return queryInterface.bulkInsert('Notifications', notifications);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notifications', null, {
      truncate: true,
      restartIdentity: true
    });
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};