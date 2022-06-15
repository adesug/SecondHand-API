'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      harga: {
        type: Sequelize.INTEGER
      },
      kategori_id: {
        type: Sequelize.INTEGER
      },
      deskripsi: {
        type: Sequelize.STRING
      },
      foto_produk_1: {
        type: Sequelize.STRING
      },
      foto_produk_2: {
        allowNull: true,
        type: Sequelize.STRING
      },
      foto_produk_3: {
        allowNull: true,
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('diterima', 'ditolak', 'menunggu', 'dijual')
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};