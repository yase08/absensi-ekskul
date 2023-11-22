"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class assessment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The models/index file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.task, {
        foreignKey: "task_id",
      });
      this.belongsTo(models.student, {
        foreignKey: "student_id",
      });
    }
  }
  assessment.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      grade: DataTypes.INTEGER,
      task_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      student_id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "assessment",
    }
  );
  return assessment;
};
