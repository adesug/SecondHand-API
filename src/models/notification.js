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
      Notification.belongsTo(models.Product, {
        foreignKey: 'produk_id',
        as: 'product',
      })
      Notification.belongsTo(models.Penawaran, {
        foreignKey: 'produk_id',
        as: 'penawaran',
      })
    }
  }
  Notification.init({
    produk_id: DataTypes.INTEGER,
    user_id_buyer: DataTypes.INTEGER,
    user_id_seller: DataTypes.INTEGER,
    status: {
      type: DataTypes.ENUM,
      values: ['terbit', 'penawaran']
    },
    status_baca: {
      type: DataTypes.ENUM,
      values: ['unread', 'read'],
      defaultValue: 'unread'
    },
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};