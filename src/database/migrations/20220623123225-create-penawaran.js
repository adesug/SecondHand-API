'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Penawarans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      produk_id: {
        type: Sequelize.INTEGER
      },
      user_id_buyer: {
        type: Sequelize.INTEGER
      },
      user_id_seller: {
        type: Sequelize.INTEGER
      },
      harga_penawaran: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM('ditawar', 'diterima', 'ditolak'),
        defaultValue: 'ditawar',
        //ditawar sama dengan menunggu
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
    await queryInterface.dropTable('Penawarans');
  }
};