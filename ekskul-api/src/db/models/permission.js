"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class permission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.role, {
        through: "roleOnPermissions",
        foreignKey: "permission_id",
      });
    }
  }
  permission.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "permission",
    }
  );
  return permission;
};
