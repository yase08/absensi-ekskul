"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class historyAttendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.ekskul, {
        foreignKey: "ekskul_id",
      });
    }
  }
  historyAttendance.init(
    {
      totalAttendance: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      ekskul_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "historyAttendance",
    }
  );
  return historyAttendance;
};
