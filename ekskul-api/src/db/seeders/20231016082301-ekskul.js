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
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};