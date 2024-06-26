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
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      student_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      ekskul_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM("hadir", "sakit", "izin", "alpa"),
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      semester: {
        type: DataTypes.ENUM("odd", "even"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "attendance",
    }
  );
  return attendance;
};
