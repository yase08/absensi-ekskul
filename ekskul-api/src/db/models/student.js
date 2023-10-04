"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.ekskul, {
        through: "studentOnEkskuls",
        foreignKey: "student_id",
      });
      this.belongsTo(models.rombel, {
        foreignKey: "rombel_id",
      });
      this.belongsTo(models.rayon, {
        foreignKey: "rayon_id",
      });
    }
  }
  student.init(
    {
      name: DataTypes.STRING,
      nis: DataTypes.STRING,
      email: DataTypes.STRING,
      mobileNumber: DataTypes.STRING,
      rombel_id: DataTypes.INTEGER,
      rayon_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "student",
    }
  );
  return student;
};
