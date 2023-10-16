"use strict";


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "students",
      [
        {
          name: "Ujang",
          nis: "1210002",
          email: "ujang@gmail.com",
          mobileNumber: "08978226483",
          rombel_id: 1,
          rayon_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mamat",
          nis: "1210003",
          email: "mamat@gmail.com",
          mobileNumber: "08978226484",
          rombel_id: 2,
          rayon_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Udin",
          nis: "1210004",
          email: "udin@gmail.com",
          mobileNumber: "08978226485",
          rombel_id: 1,
          rayon_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Budi",
          nis: "1210005",
          email: "budi@gmail.com",
          mobileNumber: "08978226486",
          rombel_id: 1,
          rayon_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Alif",
          nis: "1210006",
          email: "alig@gmail.com",
          mobileNumber: "08978226487",
          rombel_id: 1,
          rayon_id: 1,
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
