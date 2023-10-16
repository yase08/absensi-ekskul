"use strict";


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "rayons",
      [
        {
          name: "cibedug 1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "cibedug 2",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "cibedug 3",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "cibedug 4",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "cicurug 1",
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