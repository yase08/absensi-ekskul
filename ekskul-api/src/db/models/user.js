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
        as: "ekskuls",
      });
    }
  }
  user.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      mobileNumber: DataTypes.STRING,
      image: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.ENUM("admin", "instructor"),
      isActive: DataTypes.BOOLEAN,
      refreshToken: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
