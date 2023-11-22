"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class activityProgram extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  activityProgram.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      activity: DataTypes.STRING,
      task: DataTypes.STRING,
      startDate: DataTypes.STRING,
      endDate: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "activityProgram",
    }
  );
  return activityProgram;
};
