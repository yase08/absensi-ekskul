"use strict";

const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.bulkInsert(
        "userOnEkskuls",
        [
          {
            id: uuidv4(),
            user_id: "e74cd9da-904c-46d1-ba01-d2c4458ad5bd",
            ekskul_id: "0b4cfa11-e4b0-43f5-8d4c-37329edd6e46",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "e74cd9da-904c-46d1-ba01-d2c4458ad5bd",
            ekskul_id: "1da42985-bdac-4dab-8f59-e7524cdaad08",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            
            user_id: "90f8c6ea-50dc-43b5-8c0b-aa3849b37682",
            ekskul_id: "0b4cfa11-e4b0-43f5-8d4c-37329edd6e46",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            id: uuidv4(),
            user_id: "90f8c6ea-50dc-43b5-8c0b-aa3849b37682",
            ekskul_id: "1da42985-bdac-4dab-8f59-e7524cdaad08",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    } catch (error) {
      console.error("Seeder Error:", error);
    }
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("users", null, {});
  },
};
