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
            user_id: "a16c6dc6-4817-4003-9a81-8bbdc1d7dca0",
            ekskul_id: "445f2f02-6ee4-4dd8-b4d1-4bbbfa34970e",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "a16c6dc6-4817-4003-9a81-8bbdc1d7dca0",
            ekskul_id: "adaa6f9a-a348-4e78-858b-0df67c886318",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "716004de-63d9-444f-837d-6229bfaa6946",
            ekskul_id: "445f2f02-6ee4-4dd8-b4d1-4bbbfa34970e",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "716004de-63d9-444f-837d-6229bfaa6946",
            ekskul_id: "adaa6f9a-a348-4e78-858b-0df67c886318",
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
