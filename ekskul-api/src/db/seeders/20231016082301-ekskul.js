"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ekskuls",
      [
        {
          name: "basket",
          category: "umum",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "futsal",
          category: "umum",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "badminton",
          category: "umum",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "voli",
          category: "umum",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "silat",
          category: "umum",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "javascript",
          category: "produktif",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "python",
          category: "produktif",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "iot",
          category: "produktif",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "java",
          category: "produktif",
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