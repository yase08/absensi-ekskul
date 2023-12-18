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
          student_id: '2f12fcca-8a08-40be-8176-b3dabd538c68',
          ekskul_id: '61b1fb93-bf74-4ef6-8f07-c70ee78839f3',
          category: "hadir",
          date: "09-09-2023",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: '2f12fcca-8a08-40be-8176-b3dabd538c68',
          ekskul_id: 'dee2f080-5960-4e10-a2c4-5753c1971e25',
          category: "hadir",
          date: "09-09-2023",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: 'a650008d-ca45-4427-a228-9fed72cfed43',
          ekskul_id: '61b1fb93-bf74-4ef6-8f07-c70ee78839f3',
          category: "hadir",
          date: "09-09-2023",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: 'a650008d-ca45-4427-a228-9fed72cfed43',
          ekskul_id: 'dee2f080-5960-4e10-a2c4-5753c1971e25',
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
