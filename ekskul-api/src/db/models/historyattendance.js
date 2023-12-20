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
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      weekNumber: DataTypes.INTEGER,
      year: DataTypes.DATE,
      totalAttendance: DataTypes.INTEGER,
      ekskul_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "historyAttendance",
    }
  );
  return historyAttendance;
};
