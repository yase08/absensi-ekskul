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
          mobileNumber: "08977823878",
          ekskul_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "instructor2",
          email: "instructor2@gmail.com",
          password: hashedPassword,
          role: "instructor",
          mobileNumber: "089778238789",
          ekskul_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "instructor3",
          email: "instructor3@gmail.com",
          password: hashedPassword,
          role: "instructor",
          mobileNumber: "089778238787",
          ekskul_id: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "admin",
          email: "admin@gmail.com",
          role: "admin",
          password: hashedPassword,
          mobileNumber: "08977823879",
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
