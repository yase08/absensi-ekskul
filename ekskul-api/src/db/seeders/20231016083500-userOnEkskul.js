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
            user_id: "99d20076-1739-420c-8f5a-c186251eb758",
            ekskul_id: "e2ae6dfc-41bf-457d-9eb5-1cea16a02dd1",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "99d20076-1739-420c-8f5a-c186251eb758",
            ekskul_id: "66bdf24d-c954-4e4b-8838-9f23ce4bfd44",
            createdAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "885fb838-63a2-4178-b46a-975e25a5dfc8",
            ekskul_id: "e2ae6dfc-41bf-457d-9eb5-1cea16a02dd1",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "885fb838-63a2-4178-b46a-975e25a5dfc8",
            ekskul_id: "66bdf24d-c954-4e4b-8838-9f23ce4bfd44",
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
