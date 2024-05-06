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
          student_id: "170efa5a-d6f6-472f-9d73-98c55ceb5634",
          ekskul_id: "74d7766b-72cf-47e7-9f92-2850b2c65f81",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "170efa5a-d6f6-472f-9d73-98c55ceb5634",
          ekskul_id: "588a7ae2-d086-4f8d-a652-981071d2b253",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "ad6a94f3-0548-4f17-901c-d3075ae85976",
          ekskul_id: "74d7766b-72cf-47e7-9f92-2850b2c65f81",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "ad6a94f3-0548-4f17-901c-d3075ae85976",
          ekskul_id: "588a7ae2-d086-4f8d-a652-981071d2b253",
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
