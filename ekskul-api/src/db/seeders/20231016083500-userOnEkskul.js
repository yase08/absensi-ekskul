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
            user_id: "e74b350a-0ea8-4997-93c3-cf72dfafc6f2",
            ekskul_id: "0fbe33aa-2630-4fbf-adc7-eb63e0c21d2a",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "e74b350a-0ea8-4997-93c3-cf72dfafc6f2",
            ekskul_id: "1b2ef4af-41c3-4c1d-aeba-436c5cf275dd",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "5e3bf428-b688-446d-b5c4-5571625da04c",
            ekskul_id: "0fbe33aa-2630-4fbf-adc7-eb63e0c21d2a",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "5e3bf428-b688-446d-b5c4-5571625da04c",
            ekskul_id: "1b2ef4af-41c3-4c1d-aeba-436c5cf275dd",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "fc0d9207-a85e-459a-88a9-b7052541feed",
            ekskul_id: "8584d7d0-c814-40c1-b70d-2d9ee96c6343",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "fc0d9207-a85e-459a-88a9-b7052541feed",
            ekskul_id: "97f31099-b5d1-4358-94a2-df6bc30b69b2",
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
