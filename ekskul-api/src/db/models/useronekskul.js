"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userOnEkskul extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      userOnEkskul.belongsTo(models.user, {
        foreignKey: "user_id",
        as: "user",
      });

      userOnEkskul.belongsTo(models.ekskul, {
        foreignKey: "ekskul_id",
        as: "ekskul",
      });
    }
  }
  userOnEkskul.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      ekskul_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "userOnEkskul",
    }
  );
  return userOnEkskul;
};
