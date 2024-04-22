"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("historyAttendances", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      totalAttendance: {
        type: Sequelize.INTEGER,
      },
      weekNumber: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      year: {
        type: Sequelize.STRING,
      },
      ekskul_id: {
        type: Sequelize.UUID,
        references: {
          model: "ekskuls",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("historyAttendances");
  },
};
