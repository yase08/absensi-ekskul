"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class activity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.schedule, {
        foreignKey: "schedule_id",
      });
      this.belongsTo(models.rombel, {
        foreignKey: "rombel_id",
      });
      this.belongsTo(models.room, {
        foreignKey: "room_id",
      });
      this.belongsTo(models.ekskul, {
        foreignKey: "ekskul_id",
      });
    }
  }
  activity.init(
    {
      schedule_id: DataTypes.INTEGER,
      rombel_id: DataTypes.INTEGER,
      room_id: DataTypes.INTEGER,
      ekskul_id: DataTypes.INTEGER,
      startTime: DataTypes.STRING,
      endTime: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "activity",
    }
  );
  return activity;
};
