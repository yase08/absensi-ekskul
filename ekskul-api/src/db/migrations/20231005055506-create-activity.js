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
      grade: {
        type: Sequelize.ENUM("X", "XI", "XII"),
        allowNull: false,
      },
      room_id: {
        type: Sequelize.UUID,
        references: {
          model: "rooms",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      ekskul_id: {
        type: Sequelize.UUID,
        references: {
          model: "ekskuls",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      startTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      endTime: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      day: {
        type: Sequelize.ENUM(
          "SENIN",
          "SELASA",
          "RABU",
          "KAMIS",
          "JUMAT",
          "SABTU",
          "MINGGU"
        ),
        allowNull: false,
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
