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
            user_id: "81104dbd-60b0-432c-9417-0db7b59f0387",
            ekskul_id: "0c4cc585-f563-4809-b79a-87c012f5d68c",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "81104dbd-60b0-432c-9417-0db7b59f0387",
            ekskul_id: "cff1ab3e-3b91-40d7-8fcc-cc3e254553fb",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "0188412e-1eaa-45a8-83d5-5797987e6c8e",
            ekskul_id: "0c4cc585-f563-4809-b79a-87c012f5d68c",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "0188412e-1eaa-45a8-83d5-5797987e6c8e",
            ekskul_id: "cff1ab3e-3b91-40d7-8fcc-cc3e254553fb",
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
