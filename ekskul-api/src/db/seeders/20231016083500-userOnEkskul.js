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
            user_id: "c1962c47-d2ae-49ad-a942-7a480c3bca98",
            ekskul_id: "27e86475-b6f9-4fd2-98c1-79be14de1477",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "c1962c47-d2ae-49ad-a942-7a480c3bca98",
            ekskul_id: "e46d556f-d5b7-48cc-b51f-42c578f2e57c",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "8cdc5b5e-1e97-4525-bc88-16b318b39fb4",
            ekskul_id: "27e86475-b6f9-4fd2-98c1-79be14de1477",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "8cdc5b5e-1e97-4525-bc88-16b318b39fb4",
            ekskul_id: "e46d556f-d5b7-48cc-b51f-42c578f2e57c",
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
