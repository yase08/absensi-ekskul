"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class gallery extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.ekskul, {
        foreignKey: "ekskul_id",
      });
      this.belongsToMany(models.galleryImage, {
        through: "galleryOnImages",
        foreignKey: "gallery_id",
      });
    }
  }
  gallery.init(
    {
      name: DataTypes.STRING,
      date: DataTypes.STRING,
      slug: DataTypes.STRING,
      ekskul_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "gallery",
    }
  );
  return gallery;
};