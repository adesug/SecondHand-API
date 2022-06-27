'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Product,{ foreignKey:"kategori_id_1", as : "kategori_1" })
      Category.hasMany(models.Product,{ foreignKey:"kategori_id_2", as : "kategori_2" })
      Category.hasMany(models.Product,{ foreignKey:"kategori_id_3", as : "kategori_3" })
      Category.hasMany(models.Product,{ foreignKey:"kategori_id_4", as : "kategori_4" })
      Category.hasMany(models.Product,{ foreignKey:"kategori_id_5", as : "kategori_5" })





    }
  }
  Category.init({
    nama: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};