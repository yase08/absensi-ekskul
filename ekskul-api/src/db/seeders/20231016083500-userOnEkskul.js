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
            user_id: "b9c9eb17-8ffb-4075-804d-8bcc363cf551",
            ekskul_id: "74d7766b-72cf-47e7-9f92-2850b2c65f81",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "b9c9eb17-8ffb-4075-804d-8bcc363cf551",
            ekskul_id: "588a7ae2-d086-4f8d-a652-981071d2b253",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "5d73e3ef-53d7-4c99-89fb-a65c6860b153",
            ekskul_id: "74d7766b-72cf-47e7-9f92-2850b2c65f81",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "5d73e3ef-53d7-4c99-89fb-a65c6860b153",
            ekskul_id: "588a7ae2-d086-4f8d-a652-981071d2b253",
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
