"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class attendance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.student, {
        foreignKey: "student_id",
      });
      this.belongsTo(models.ekskul, {
        foreignKey: "ekskul_id",
      });
    }
  }
  attendance.init(
    {
      student_id: DataTypes.INTEGER,
      ekskul_id: DataTypes.INTEGER,
      category: DataTypes.ENUM("hadir", "sakit", "izin", "alpa"),
      date: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "attendance",
    }
  );
  return attendance;
};
