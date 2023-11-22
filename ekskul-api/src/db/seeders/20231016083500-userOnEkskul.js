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
            user_id: "398978b3-dd20-44d0-b10b-c598653e655e",
            ekskul_id: "12b3bac3-8446-4c4a-a8e0-78700d611aa1",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "398978b3-dd20-44d0-b10b-c598653e655e",
            ekskul_id: "47504697-880b-4d2d-8754-d030568eaa43",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "e26e2554-8886-48c0-b481-f80758e39887",
            ekskul_id: "12b3bac3-8446-4c4a-a8e0-78700d611aa1",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "e26e2554-8886-48c0-b481-f80758e39887",
            ekskul_id: "47504697-880b-4d2d-8754-d030568eaa43",
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
