'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Wishlist.belongsTo(models.Product, {
        foreignKey: 'produk_id',
        as: 'produk',
      })
    }
  }
  Wishlist.init({
    user_id: DataTypes.INTEGER,
    produk_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Wishlist',
  });
  return Wishlist;
};