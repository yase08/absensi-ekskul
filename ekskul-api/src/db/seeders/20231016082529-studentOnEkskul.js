"use strict";

const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "studentOnEkskuls",
      [
        {
          id: uuidv4(),
          student_id: "3d34a159-1c03-43b4-95e4-6e8b099a4014",
          ekskul_id: "e2ae6dfc-41bf-457d-9eb5-1cea16a02dd1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "3d34a159-1c03-43b4-95e4-6e8b099a4014",
          ekskul_id: "66bdf24d-c954-4e4b-8838-9f23ce4bfd44",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "7c3bd26d-97c1-4f46-857b-ef8a4c01ea0a",
          ekskul_id: "e2ae6dfc-41bf-457d-9eb5-1cea16a02dd1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "7c3bd26d-97c1-4f46-857b-ef8a4c01ea0a",
          ekskul_id: "66bdf24d-c954-4e4b-8838-9f23ce4bfd44",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "81be995b-a403-4383-9749-8238dfc5860e",
          ekskul_id: "35b9c5c7-7283-4be6-b0e8-cfa9b64c8d41",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "81be995b-a403-4383-9749-8238dfc5860e",
          ekskul_id: "e2ae6dfc-41bf-457d-9eb5-1cea16a02dd1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "81be995b-a403-4383-9749-8238dfc5860e",
          ekskul_id: "3d71ffc7-4a57-4e61-82be-5bde41efb056",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "81be995b-a403-4383-9749-8238dfc5860e",
          ekskul_id: "40dd26bd-2e6e-4e04-8aa5-67899bcf85d7",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "7a47053a-4aa2-4ff8-8cf9-5216bd4b237d",
          ekskul_id: "66bdf24d-c954-4e4b-8838-9f23ce4bfd44",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "7a47053a-4aa2-4ff8-8cf9-5216bd4b237d",
          ekskul_id: "e2ae6dfc-41bf-457d-9eb5-1cea16a02dd1",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
