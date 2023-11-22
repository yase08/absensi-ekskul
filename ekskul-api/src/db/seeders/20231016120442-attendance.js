"use strict";

const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "attendances",
      [
        {
          id: uuidv4(),
          student_id: 1,
          ekskul_id: 1,
          category: "hadir",
          date: "09-09-2023",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: 1,
          ekskul_id: 2,
          category: "hadir",
          date: "09-09-2023",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: 2,
          ekskul_id: 1,
          category: "hadir",
          date: "09-09-2023",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: 2,
          ekskul_id: 2,
          category: "hadir",
          date: "09-09-2023",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: 3,
          ekskul_id: 1,
          category: "hadir",
          date: "09-09-2023",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: 3,
          ekskul_id: 3,
          category: "hadir",
          date: "09-09-2023",
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
