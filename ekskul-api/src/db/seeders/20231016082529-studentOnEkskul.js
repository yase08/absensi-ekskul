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
          student_id: "1b9a4c80-86bc-4f3a-a9ce-498eddd1dc43",
          ekskul_id: "27e86475-b6f9-4fd2-98c1-79be14de1477",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "1b9a4c80-86bc-4f3a-a9ce-498eddd1dc43",
          ekskul_id: "e46d556f-d5b7-48cc-b51f-42c578f2e57c",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "8d4d8c2f-e1a0-4389-ae18-cafb894a46af",
          ekskul_id: "27e86475-b6f9-4fd2-98c1-79be14de1477",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "8d4d8c2f-e1a0-4389-ae18-cafb894a46af",
          ekskul_id: "e46d556f-d5b7-48cc-b51f-42c578f2e57c",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "9ad2163d-6898-4c10-ab26-0fc30595131d",
          ekskul_id: "5fe82b0b-8591-4e37-b146-a57c8e2a18a8",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "9ad2163d-6898-4c10-ab26-0fc30595131d",
          ekskul_id: "27e86475-b6f9-4fd2-98c1-79be14de1477",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "a4090ce7-1b67-4e04-a68b-55d60a392034",
          ekskul_id: "b04ccb08-078a-4779-aae4-50708a6c8dde",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "a4090ce7-1b67-4e04-a68b-55d60a392034",
          ekskul_id: "50b09324-1116-4e23-9dac-5efae5567aba",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "b2d0b72d-5810-420f-9792-bd957a18bf3c",
          ekskul_id: "04273db0-a0f9-4508-a0bf-ff8b8be2e51f",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "b2d0b72d-5810-420f-9792-bd957a18bf3c",
          ekskul_id: "b04ccb08-078a-4779-aae4-50708a6c8dde",
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
