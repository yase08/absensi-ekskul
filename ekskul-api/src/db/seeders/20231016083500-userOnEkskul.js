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
            user_id: "337ac31e-976c-4f6f-af3b-67247edcf526",
            ekskul_id: "0dbd842e-b748-4c26-b33c-467bf8c34659",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "337ac31e-976c-4f6f-af3b-67247edcf526",
            ekskul_id: "23cdb8db-91b8-499c-8bc4-c7b12045a4bd",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "034b540f-e04d-4c26-b861-6b5a54c37c59",
            ekskul_id: "0dbd842e-b748-4c26-b33c-467bf8c34659",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "034b540f-e04d-4c26-b861-6b5a54c37c59",
            ekskul_id: "23cdb8db-91b8-499c-8bc4-c7b12045a4bd",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "fb27710c-6295-4a33-bac9-a241b3dda268",
            ekskul_id: "3012ad87-439b-4e18-a845-f52cc392957d",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "fb27710c-6295-4a33-bac9-a241b3dda268",
            ekskul_id: "41f7599e-a888-435f-852d-97f7923ab360",
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
