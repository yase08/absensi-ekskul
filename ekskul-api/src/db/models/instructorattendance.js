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
      instructor_id: DataTypes.INTEGER,
      category: DataTypes.ENUM("hadir", "sakit", "izin", "alpa"),
    },
    {
      sequelize,
      modelName: "instructorAttendance",
    }
  );
  return instructorAttendance;
};
