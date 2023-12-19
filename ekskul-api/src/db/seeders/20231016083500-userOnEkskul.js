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
            user_id: "d60c5901-1a9f-4155-8f63-9ed98a99fbb6",
            ekskul_id: "a7e11d7b-931e-407d-a5af-049f9b866f5d",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "d60c5901-1a9f-4155-8f63-9ed98a99fbb6",
            ekskul_id: "aee63308-4416-4ad3-ae40-3291759c833f",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "318494c1-94dd-411e-b95e-597b3115d391",
            ekskul_id: "a7e11d7b-931e-407d-a5af-049f9b866f5d",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "318494c1-94dd-411e-b95e-597b3115d391",
            ekskul_id: "aee63308-4416-4ad3-ae40-3291759c833f",
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
