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
          student_id: "2017ba34-4703-4566-b362-3fb6c11b098d",
          ekskul_id: "56a2680c-9f99-465c-bd2d-9c7318db94da",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "2017ba34-4703-4566-b362-3fb6c11b098d",
          ekskul_id: "db43b9e4-3dac-4cde-8bd6-01b448db88f6",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "7d81ef12-2ffb-4928-8d20-ab86f8c5f06f",
          ekskul_id: "56a2680c-9f99-465c-bd2d-9c7318db94da",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "7d81ef12-2ffb-4928-8d20-ab86f8c5f06f",
          ekskul_id: "db43b9e4-3dac-4cde-8bd6-01b448db88f6",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "2017ba34-4703-4566-b362-3fb6c11b098d",
          ekskul_id: "56a2680c-9f99-465c-bd2d-9c7318db94da",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "2017ba34-4703-4566-b362-3fb6c11b098d",
          ekskul_id: "26f1c72a-1e14-48ee-8ee5-1da52dfe655a",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "ba9e3b86-0fca-47dc-afb6-ccc81b5feb6b",
          ekskul_id: "56a2680c-9f99-465c-bd2d-9c7318db94da",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "ba9e3b86-0fca-47dc-afb6-ccc81b5feb6b",
          ekskul_id: "56a2680c-9f99-465c-bd2d-9c7318db94da",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "a365460e-511e-46ce-9374-4f1de967b258",
          ekskul_id: "bdeffe70-7aac-43ad-ba62-9cc275a569f4",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "a365460e-511e-46ce-9374-4f1de967b258",
          ekskul_id: "d0b00055-7192-459d-b98c-2b65446f81ef",
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
