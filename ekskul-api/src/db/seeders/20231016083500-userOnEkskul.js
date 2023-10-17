"use strict";


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "userOnEkskuls",
      [
        {
          user_id: 1,
          ekskul_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          ekskul_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2,
          ekskul_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 2,
          ekskul_id: 4,
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