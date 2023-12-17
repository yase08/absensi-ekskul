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
            user_id: "28b63403-d4f5-4e2d-9c24-821991e3fe4b",
            ekskul_id: "56a2680c-9f99-465c-bd2d-9c7318db94da",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "28b63403-d4f5-4e2d-9c24-821991e3fe4b",
            ekskul_id: "db43b9e4-3dac-4cde-8bd6-01b448db88f6",
            createdAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "e9ba6137-7fe7-43bb-a020-c6d0e4fe9cc9",
            ekskul_id: "56a2680c-9f99-465c-bd2d-9c7318db94da",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "e9ba6137-7fe7-43bb-a020-c6d0e4fe9cc9",
            ekskul_id: "db43b9e4-3dac-4cde-8bd6-01b448db88f6",
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
