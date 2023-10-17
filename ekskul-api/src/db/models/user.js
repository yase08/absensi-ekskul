"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.ekskul, {
        through: "userOnEkskuls",
        foreignKey: "user_id",
      });
    }
  }
  user.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      mobileNumber: DataTypes.STRING,
      image: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.ENUM("admin", "instructor"),
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
