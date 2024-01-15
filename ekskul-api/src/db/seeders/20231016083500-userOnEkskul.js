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
            user_id: "578c9230-4cfc-4597-9e19-87c984832986",
            ekskul_id: "13d7e530-eaa8-4000-a308-18fab4ac3e68",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "578c9230-4cfc-4597-9e19-87c984832986",
            ekskul_id: "3f8bc56a-ee48-422b-b47a-fac6d39af326",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "fe288a46-ed27-499e-abd2-9c7cd2e77324",
            ekskul_id: "13d7e530-eaa8-4000-a308-18fab4ac3e68",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "fe288a46-ed27-499e-abd2-9c7cd2e77324",
            ekskul_id: "3f8bc56a-ee48-422b-b47a-fac6d39af326",
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
