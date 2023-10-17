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
          email: "alif@gmail.com",
          mobileNumber: "08978226487",
          rombel_id: 1,
          rayon_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Fadhil",
          nis: "1210007",
          email: "fadhil@gmail.com",
          mobileNumber: "08978226488",
          rombel_id: 1,
          rayon_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Fadhli",
          nis: "1210008",
          email: "fadhli@gmail.com",
          mobileNumber: "08978226489",
          rombel_id: 1,
          rayon_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Rio",
          nis: "1210009",
          email: "rio@gmail.com",
          mobileNumber: "089782264810",
          rombel_id: 1,
          rayon_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Alam",
          nis: "12100010",
          email: "alam@gmail.com",
          mobileNumber: "089782264811",
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