"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "studentOnEkskuls",
      [
        {
          student_id: 1,
          ekskul_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          student_id: 1,
          ekskul_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          student_id: 2,
          ekskul_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          student_id: 2,
          ekskul_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          student_id: 3,
          ekskul_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          student_id: 3,
          ekskul_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          student_id: 4,
          ekskul_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          student_id: 4,
          ekskul_id: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          student_id: 5,
          ekskul_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          student_id: 5,
          ekskul_id: 3,
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
