"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("attendances", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      ekskul_id: {
        type: Sequelize.UUID,
        references: {
          model: "ekskuls",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      student_id: {
        type: Sequelize.UUID,
        references: {
          model: "students",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      category: {
        type: Sequelize.ENUM("hadir", "sakit", "izin", "alpa"),
        allowNull: false,
      },
      date: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("attendances");
  },
};
