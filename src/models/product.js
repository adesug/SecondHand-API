'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      })
      Product.hasMany(models.Penawaran, {
        foreignKey: 'produk_id',
        as: 'product'
      })
      Product.belongsTo(models.Category, {
        through: 'kategori_1',
        foreignKey: 'kategori_id_1'
      })
      Product.belongsTo(models.Category, {
        foreignKey: 'kategori_id_1',
        as: 'kategori_1',
      })
      Product.belongsTo(models.Category, {
        foreignKey: 'kategori_id_2',
        as: 'kategori_2',
      })
      Product.belongsTo(models.Category, {
        foreignKey: 'kategori_id_3',
        as: 'kategori_3',
      })
      Product.belongsTo(models.Category, {
        foreignKey: 'kategori_id_4',
        as: 'kategori_4',
      })
      Product.belongsTo(models.Category, {
        foreignKey: 'kategori_id_5',
        as: 'kategori_5',
      })
      Product.hasMany(models.Notification, {
        foreignKey: 'produk_id',
        as: 'notif'
      })
    }
  }
  Product.init({
    nama: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    harga: DataTypes.INTEGER,
    kategori_id_1: DataTypes.INTEGER,
    kategori_id_2: DataTypes.INTEGER,
    kategori_id_3: DataTypes.INTEGER,
    kategori_id_4: DataTypes.INTEGER,
    kategori_id_5: DataTypes.INTEGER,
    deskripsi: DataTypes.STRING,
    foto_produk_1: DataTypes.STRING,
    foto_produk_2: DataTypes.STRING,
    foto_produk_3: DataTypes.STRING,
    status: {
      type: DataTypes.ENUM,
      values: ['terbit', 'preview', 'terjual'],
      defaultValue: 'terbit'
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};