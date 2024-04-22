"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.schedule, {
        foreignKey: "room_id",
        as: "schedules",
        onDelete: "CASCADE",
      });
      this.hasMany(models.activity, {
        foreignKey: "room_id",
        as: "activities",
        onDelete: "CASCADE",
      });
    }
  }
  room.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "room",
    }
  );
  return room;
};
