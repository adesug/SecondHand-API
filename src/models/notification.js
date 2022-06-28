'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Notification.init({
    produk_id: DataTypes.INTEGER,
    user_id_buyer: DataTypes.INTEGER,
    user_id_seller: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM,
      values: ['terbit', 'penawaran']
    }
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};