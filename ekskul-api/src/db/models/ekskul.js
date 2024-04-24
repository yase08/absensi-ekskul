"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ekskul extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.student, {
        through: "studentOnEkskuls",
        foreignKey: "ekskul_id",
        onDelete: "CASCADE",
      });
      this.belongsToMany(models.user, {
        through: "userOnEkskuls",
        foreignKey: "ekskul_id",
        onDelete: "CASCADE",
      });
      this.hasMany(models.activity, {
        foreignKey: "ekskul_id",
        as: "activities",
        onDelete: "CASCADE",
      });
      this.hasMany(models.attendance, {
        foreignKey: "ekskul_id",
        as: "attendances",
        onDelete: "CASCADE",
      });
      this.hasMany(models.instructorAttendance, {
        foreignKey: "ekskul_id",
        as: "instructorAttendances",
        onDelete: "CASCADE",
      });
      this.hasMany(models.gallery, {
        foreignKey: "ekskul_id",
        as: "galleries",
        onDelete: "CASCADE",
      });
      this.hasMany(models.historyAttendance, {
        foreignKey: "ekskul_id",
        as: "historyAttendances",
        onDelete: "CASCADE",
      });
    }
  }
  ekskul.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      category: {
        type: DataTypes.ENUM("produktif", "umum", "senbud"),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ekskul",
    }
  );
  return ekskul;
};
