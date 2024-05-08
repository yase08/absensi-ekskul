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
      grade: {
        type: DataTypes.ENUM("X", "XI", "XII"),
        allowNull: false,
      },
      day: {
        type: DataTypes.ENUM(
          "SENIN",
          "SELASA",
          "RABU",
          "KAMIS",
          "JUMAT",
          "SABTU",
          "MINGGU"
        ),
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
      startTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      endTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "activity",
    }
  );
  return activity;
};
