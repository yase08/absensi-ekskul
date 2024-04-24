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
            user_id: "ee2d4c6c-70eb-4d86-94f5-6688fc3051b8",
            ekskul_id: "47dee5e1-3455-4435-a88e-6464678ffc63",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "ee2d4c6c-70eb-4d86-94f5-6688fc3051b8",
            ekskul_id: "5032f733-9738-4c2f-9b84-be7d1b4eff52",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "db16233b-f332-48de-a226-e0ac09c3a8e8",
            ekskul_id: "47dee5e1-3455-4435-a88e-6464678ffc63",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "db16233b-f332-48de-a226-e0ac09c3a8e8",
            ekskul_id: "5032f733-9738-4c2f-9b84-be7d1b4eff52",
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
