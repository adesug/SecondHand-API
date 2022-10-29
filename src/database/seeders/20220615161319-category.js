'use strict';
const fs = require('fs')
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync('./data/category.json', 'utf-8'))
    const categories = data.map((element) => {
      return {
        nama: element.name,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })
    return queryInterface.bulkInsert('Categories', categories);
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
    await queryInterface.bulkDelete('Categories', null, { truncate: true, restartIdentity: true });
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
