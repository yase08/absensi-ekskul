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
            user_id: "58dfdd75-b848-490a-a722-e64891bb1940",
            ekskul_id: "0f005dd6-3f96-44bb-a83e-6b821c13e47d",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "58dfdd75-b848-490a-a722-e64891bb1940",
            ekskul_id: "44f2281e-a914-496e-95f7-9c33dc80fc4f",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "b3d2e5cf-6911-4d42-8ec7-c7f4782babde",
            ekskul_id: "0f005dd6-3f96-44bb-a83e-6b821c13e47d",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "b3d2e5cf-6911-4d42-8ec7-c7f4782babde",
            ekskul_id: "44f2281e-a914-496e-95f7-9c33dc80fc4f",
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
