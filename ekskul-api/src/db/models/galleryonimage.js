'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class galleryOnImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  galleryOnImage.init({
    gallery_id: DataTypes.INTEGER,
    galleryImage_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'galleryOnImage',
  });
  return galleryOnImage;
};