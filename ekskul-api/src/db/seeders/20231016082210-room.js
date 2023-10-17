"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "rooms",
      [
        {
          name: "203",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "305",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "322",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "321",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "320",
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
