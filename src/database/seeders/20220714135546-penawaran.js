'use strict';
const fs = require('fs')
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync('./data/penawaran.json', 'utf-8'))
    const penawaran = data.map((element) => {
      return {
        produk_id: element.produk_id,
        user_id_seller: element.user_id_seller,
        user_id_buyer: element.user_id_buyer,
        harga_penawaran: element.harga_penawaran,
        status: element.status,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })
    return queryInterface.bulkInsert('Penawarans', penawaran);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Penawarans', null, {
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