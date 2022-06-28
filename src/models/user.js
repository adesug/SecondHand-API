'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, {
        foreignKey: 'user_id',
        as: 'user'
      })
      User.hasMany(models.Penawaran, {
        foreignKey: 'user_id_buyer',
        as: 'buyer'
      })
    }
  }
  User.init({
    nama: DataTypes.STRING,
    foto_profil: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    kota: DataTypes.STRING,
    alamat: DataTypes.STRING,
    telp: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};