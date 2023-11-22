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
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      schedule_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      rombel_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      room_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      ekskul_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
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
