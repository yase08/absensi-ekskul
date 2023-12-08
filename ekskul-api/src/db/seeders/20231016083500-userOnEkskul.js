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
            user_id: "f6321b53-294f-4bdd-a0b0-59836130ff14",
            ekskul_id: "f0586677-3652-4e29-8820-c9ec8f99e18e",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "f6321b53-294f-4bdd-a0b0-59836130ff14",
            ekskul_id: "d36f4cb5-fa1b-439d-b8a3-a624a9aafab5",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "8890d1f5-1476-4d42-b0d4-f0b98141f326",
            ekskul_id: "f0586677-3652-4e29-8820-c9ec8f99e18e",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "8890d1f5-1476-4d42-b0d4-f0b98141f326",
            ekskul_id: "d36f4cb5-fa1b-439d-b8a3-a624a9aafab5",
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
