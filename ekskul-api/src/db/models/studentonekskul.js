'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class studentOnEkskul extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  studentOnEkskul.init({
    student_id: DataTypes.INTEGER,
    ekskul_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'studentOnEkskul',
  });
  return studentOnEkskul;
};