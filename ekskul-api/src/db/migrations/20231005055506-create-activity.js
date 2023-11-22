"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("activities", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      schedule_id: {
        type: Sequelize.UUID,
        references: {
          model: "schedules",
          key: "id",
        },
      },
      rombel_id: {
        type: Sequelize.UUID,
        references: {
          model: "rombels",
          key: "id",
        },
      },
      room_id: {
        type: Sequelize.UUID,
        references: {
          model: "rooms",
          key: "id",
        },
      },
      ekskul_id: {
        type: Sequelize.UUID,
        references: {
          model: "ekskuls",
          key: "id",
        },
      },
      startTime: {
        type: Sequelize.STRING,
      },
      endTime: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("activities");
  },
};
