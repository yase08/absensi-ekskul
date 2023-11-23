"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class instructorAttendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.ekskul, {
        foreignKey: "ekskul_id",
      });
      this.belongsTo(models.user, {
        foreignKey: "instructor_id",
      });
    }
  }
  instructorAttendance.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      instructor_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM("hadir", "sakit", "izin", "alpa"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "instructorAttendance",
    }
  );
  return instructorAttendance;
};
