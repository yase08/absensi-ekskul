"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class schedule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  schedule.init(
    {
      day: DataTypes.STRING,
      startDate: DataTypes.STRING,
      endDate: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "schedule",
    }
  );
  return schedule;
};
