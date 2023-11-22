"use strict";

const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("password", 10);
    await queryInterface.bulkInsert(
      "users",
      [
        {
          id: uuidv4(),
          name: "instructor",
          email: "instructor@gmail.com",
          password: hashedPassword,
          role: "instructor",
          mobileNumber: "08977823878",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: "instructor2",
          email: "instructor2@gmail.com",
          password: hashedPassword,
          role: "instructor",
          mobileNumber: "089778238789",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          name: "instructor3",
          email: "instructor3@gmail.com",
          password: hashedPassword,
          role: "instructor",
          mobileNumber: "089778238787",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
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
