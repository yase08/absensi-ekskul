"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "rombels",
      [
        {
          name: "PPLG XII-1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "PPLG XII-2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "PPLG XII-3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "PPLG XII-4",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "PPLG XI-1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "PPLG XI-2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "PPLG XI-3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "PPLG XI-4",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "PPLG XI-5",
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
