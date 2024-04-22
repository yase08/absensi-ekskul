"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class rayon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.student, {
        foreignKey: "rayon_id",
        as: "students",
        onDelete: "NO ACTION",
      });
    }
  }
  rayon.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "rayon",
    }
  );
  return rayon;
};
