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
      Product.belongsTo(models.User, {through: 'user', foreignKey: 'user_id'})
    }
  }
  Product.init({
    nama: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    harga: DataTypes.INTEGER,
    kategori_id: DataTypes.INTEGER,
    deskripsi: DataTypes.STRING,
    foto_produk_1: DataTypes.STRING,
    foto_produk_2: DataTypes.STRING,
    foto_produk_3: DataTypes.STRING,
    status:    {
      type : DataTypes.ENUM,
      values: ['diterima','ditolak', 'dijual', 'menunggu'],
      defaultValue: 'dijual'
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};