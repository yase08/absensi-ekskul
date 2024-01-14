"use strict";

const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert(
        "userOnEkskuls",
        [
          {
            id: uuidv4(),
            user_id: "fd1ddbd0-3c7b-4ad7-86a7-dd2cd89409e2",
            ekskul_id: "56dd425a-8880-44e5-81df-01ad89d73c3e",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "fd1ddbd0-3c7b-4ad7-86a7-dd2cd89409e2",
            ekskul_id: "84e40534-16d3-4f5a-9e05-a1a305743215",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "abf1d2f5-05f3-4692-9223-e1c5e48844d1",
            ekskul_id: "56dd425a-8880-44e5-81df-01ad89d73c3e",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "abf1d2f5-05f3-4692-9223-e1c5e48844d1",
            ekskul_id: "84e40534-16d3-4f5a-9e05-a1a305743215",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    } catch (error) {
      console.error("Seeder Error:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
