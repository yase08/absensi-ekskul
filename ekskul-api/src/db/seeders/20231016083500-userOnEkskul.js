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
            user_id: "27ae04b2-5e51-4041-a299-a5387b339d47",
            ekskul_id: "04b80733-09d3-4e7b-a5de-77f098d51efc",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "27ae04b2-5e51-4041-a299-a5387b339d47",
            ekskul_id: "1d691eea-0803-4719-9839-4a4b9a2226af",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "63d0612b-5d36-4c1b-85aa-cb1a5d96f3c6",
            ekskul_id: "04b80733-09d3-4e7b-a5de-77f098d51efc",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "63d0612b-5d36-4c1b-85aa-cb1a5d96f3c6",
            ekskul_id: "1d691eea-0803-4719-9839-4a4b9a2226af",
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
