"use strict";

const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "activities",
      [
        {
          id: uuidv4(),
          schedule_id: 1,
          rombel_id: 1,
          room_id: 1,
          ekskul_id: 1,
          startTime: "08:30:00",
          endTime: "15:45:30",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          schedule_id: 2,
          rombel_id: 2,
          room_id: 2,
          ekskul_id: 2,
          startTime: "08:30:00",
          endTime: "15:45:30",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          schedule_id: 3,
          rombel_id: 3,
          room_id: 3,
          ekskul_id: 3,
          startTime: "08:30:00",
          endTime: "15:45:30",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          schedule_id: 4,
          rombel_id: 4,
          room_id: 4,
          ekskul_id: 4,
          startTime: "08:30:00",
          endTime: "15:45:30",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          schedule_id: 5,
          rombel_id: 5,
          room_id: 5,
          ekskul_id: 5,
          startTime: "08:30:00",
          endTime: "15:45:30",
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
