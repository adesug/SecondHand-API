'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Penawaran extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Penawaran.belongsTo(models.User, {
        foreignKey: 'user_id_buyer',
        as: 'buyer'
      })
      Penawaran.belongsTo(models.User, {
        foreignKey: 'user_id_seller',
        as: 'seller'
      })
      Penawaran.belongsTo(models.Product, {
        foreignKey: 'produk_id',
        as: 'produk'

      })
    }
  }
  Penawaran.init({
    produk_id: DataTypes.INTEGER,
    user_id_buyer: DataTypes.INTEGER,
    user_id_seller: DataTypes.INTEGER,
    harga_penawaran: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM,
      values: ['ditawar', 'diterima', 'ditolak'],
      defaultValue: 'ditawar'
    }
  }, {
    sequelize,
    modelName: 'Penawaran',
  });
  return Penawaran;
};