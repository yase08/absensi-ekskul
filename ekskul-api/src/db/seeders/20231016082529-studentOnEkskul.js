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
          student_id: "3b0185cd-b0fc-4cc0-b8ab-825c6b5c2559",
          ekskul_id: "56dd425a-8880-44e5-81df-01ad89d73c3e",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "3b0185cd-b0fc-4cc0-b8ab-825c6b5c2559",
          ekskul_id: "84e40534-16d3-4f5a-9e05-a1a305743215",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "51629cd1-0b6c-479e-857d-952ceec53a82",
          ekskul_id: "56dd425a-8880-44e5-81df-01ad89d73c3e",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          student_id: "51629cd1-0b6c-479e-857d-952ceec53a82",
          ekskul_id: "84e40534-16d3-4f5a-9e05-a1a305743215",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // {
        //   id: uuidv4(),
        //   student_id: "d0ad5ba3-5042-4ec9-a5aa-1410dab51ff4",
        //   ekskul_id: "81f2fe31-9497-4049-bc32-3ec22842398f",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   id: uuidv4(),
        //   student_id: "d0ad5ba3-5042-4ec9-a5aa-1410dab51ff4",
        //   ekskul_id: "a7e11d7b-931e-407d-a5af-049f9b866f5d",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   id: uuidv4(),
        //   student_id: "d32e7bfb-62e1-4738-9708-af19de39cf89",
        //   ekskul_id: "329e030e-c032-46bd-9b5a-f7bd67ec0711",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   id: uuidv4(),
        //   student_id: "d32e7bfb-62e1-4738-9708-af19de39cf89",
        //   ekskul_id: "20e5fbc6-6961-456e-a10a-43d8e41bf5a1",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   id: uuidv4(),
        //   student_id: "dab80398-1c75-469c-894a-5f80f68104b9",
        //   ekskul_id: "c5172d16-75f6-45d7-808c-a1c6cb8fe3bc",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
        // {
        //   id: uuidv4(),
        //   student_id: "dab80398-1c75-469c-894a-5f80f68104b9",
        //   ekskul_id: "329e030e-c032-46bd-9b5a-f7bd67ec0711",
        //   createdAt: new Date(),
        //   updatedAt: new Date(),
        // },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
