"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "schedules",
      [
        {
          day: "Senin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          day: "Selasa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          day: "Rabu",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          day: "Kamis",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          day: "Jumat",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          day: "Sabtu",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};