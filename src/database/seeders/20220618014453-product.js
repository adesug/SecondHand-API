'use strict';
const fs = require('fs')
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync('./data/product.json','utf-8'))
    const products = data.map((element) => {
      return {
        nama: element.nama,
        user_id: element.user_id,
        harga : element.harga,
        kategori_id_1 : element.kategori_id_1,
        kategori_id_2 : element.kategori_id_2,
        kategori_id_3 : element.kategori_id_3,
        kategori_id_4 : element.kategori_id_4,
        kategori_id_5 : element.kategori_id_5,
        deskripsi : element.deskripsi,
        foto_produk_1 : element.foto_produk_1,
        foto_produk_2 : element.foto_produk_2,
        foto_produk_3: element.foto_produk_3,
        status:element.status,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })
    return queryInterface.bulkInsert('Products',products);
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

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products',null, {truncate: true, restartIdentity: true});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
