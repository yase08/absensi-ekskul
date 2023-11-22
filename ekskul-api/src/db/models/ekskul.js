"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ekskul extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.student, {
        through: "studentOnEkskuls",
        foreignKey: "ekskul_id",
      });
      this.belongsToMany(models.user, {
        through: "userOnEkskuls",
        foreignKey: "ekskul_id",
      });
    }
  }
  ekskul.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: DataTypes.STRING,
      category: DataTypes.ENUM("produktif", "umum", "senbud"),
    },
    {
      sequelize,
      modelName: "ekskul",
    }
  );
  return ekskul;
};
