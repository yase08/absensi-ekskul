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
