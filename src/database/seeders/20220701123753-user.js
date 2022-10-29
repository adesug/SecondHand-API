'use strict';
const fs = require('fs')
const bcrypt = require('bcryptjs')
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync('./data/user.json', 'utf-8'))
    const salt = bcrypt.genSaltSync(10)
    const users = data.map((element) => {
      return {
        nama: element.nama,
        email:element.email,
        password: bcrypt.hashSync(element.password, salt),
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })
    return queryInterface.bulkInsert('Users', users);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {
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