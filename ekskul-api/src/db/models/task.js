'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.ekskul, {
        foreignKey: "ekskul_id",
      });
      this.belongsTo(models.user, {
        foreignKey: "author_id",
      });
    }
  }
  task.init({
    name: DataTypes.STRING,
    ekskul_id: DataTypes.INTEGER,
    author_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'task',
  });
  return task;
};