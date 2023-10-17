"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "activities",
      [
        {
          schedule_id: 1,
          rombel_id: 1,
          room_id: 1,
          ekskul_id: 1,
          startTime: "16.00",
          endTime: "17.30",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          schedule_id: 2,
          rombel_id: 2,
          room_id: 2,
          ekskul_id: 2,
          startTime: "16.00",
          endTime: "17.30",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          schedule_id: 3,
          rombel_id: 3,
          room_id: 3,
          ekskul_id: 3,
          startTime: "16.00",
          endTime: "17.30",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          schedule_id: 4,
          rombel_id: 4,
          room_id: 4,
          ekskul_id: 4,
          startTime: "16.00",
          endTime: "17.30",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          schedule_id: 5,
          rombel_id: 5,
          room_id: 5,
          ekskul_id: 5,
          startTime: "16.00",
          endTime: "17.30",
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
