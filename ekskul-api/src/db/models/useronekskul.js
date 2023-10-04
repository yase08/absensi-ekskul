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
      // define association here
    }
  }
  userOnEkskul.init(
    {
      user_id: DataTypes.INTEGER,
      ekskul_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "userOnEkskul",
    }
  );
  return userOnEkskul;
};
