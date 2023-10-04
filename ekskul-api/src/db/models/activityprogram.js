'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class activityProgram extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  activityProgram.init({
    activity: DataTypes.STRING,
    task: DataTypes.STRING,
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'activityProgram',
  });
  return activityProgram;
};