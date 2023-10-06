"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("galleryOnImages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      gallery_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "galleries",
          key: "id",
        },
      },
      galleryImage_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "galleryImages",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("galleryOnImages");
  },
};
