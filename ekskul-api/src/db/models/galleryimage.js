"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class galleryImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.gallery, {
        through: "galleryOnImages",
        foreignKey: "galleryImage_id",
      });
    }
  }
  galleryImage.init(
    {
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "galleryImage",
    }
  );
  return galleryImage;
};
