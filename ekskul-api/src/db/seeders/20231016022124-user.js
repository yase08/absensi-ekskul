"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("password", 10);
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "instructor",
          email: "instructor@gmail.com",
          password: hashedPassword,
          role: "instructor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "admin",
          email: "admin@gmail.com",
          role: "admin",
          password: hashedPassword,
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
