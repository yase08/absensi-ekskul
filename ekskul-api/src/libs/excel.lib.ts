import path from "path";
import fs from "fs/promises";
import ExcelJS from "exceljs";
import { Response } from "express";

export const tai = async (
  filename: string,
  columns: any[],
  rows: any[],
  res: Response
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Absensi", {
      pageSetup: {
        paperSize: 9,
        orientation: "landscape",
        fitToPage: true,
        fitToWidth: 1,
        fitToHeight: 0,
        horizontalCentered: true,
        verticalCentered: true,
      },
    });

    worksheet.mergeCells(`A1:${String.fromCharCode(65 + columns.length - 1)}1`);

    const titleRow = worksheet.addRow([]);
    titleRow.getCell(1).value = "Absensi SMK Wikrama Bogor";
    titleRow.getCell(1).font = { bold: true };
    titleRow.getCell(1).alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    titleRow.height = 50;


    const headerRow = worksheet.addRow([
      "No",
      "Nama",
      "Nis",
      "JK",
      "Rombel",
      "Rayon",
      "Ekstrakurikuler",
    ]);

    headerRow.eachCell((cell, colNumber) => {
      cell.font = { bold: true };
      cell.border = {
        top: { style: "thin", color: { argb: "000000" } },
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });
    headerRow.height = 30;


    worksheet.columns = columns;
    worksheet.addRows(rows);

    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        cell.border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };
        cell.alignment = { vertical: "middle", horizontal: "center" };
      });
    });

    const exportDir = path.join(__dirname, "../public/export/");
    const filePath = path.join(exportDir, filename);

    try {
      await fs.mkdir(exportDir, { recursive: true });
      return await workbook.xlsx.write(res);
    } catch (error) {
      reject(error);
    }
  });
};

export const exportExcel = async (
  filename: string,
  columns: any[],
  rows: any[],
  worksheetName: string,
  res: Response
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(worksheetName, {
      pageSetup: {
        paperSize: 9,
        orientation: "landscape",
        fitToPage: true,
        fitToWidth: 1,
        fitToHeight: 0,
        horizontalCentered: true,
        verticalCentered: true,
      },
    });

    // const titleRow = worksheet.addRow(['bilek']);
    // titleRow.font = { bold: true };
    // titleRow.alignment = { vertical: "middle", horizontal: "center" };
    // titleRow.height = 50;
    // worksheet.mergeCells(`A1:${String.fromCharCode(65 + columns.length - 1)}1`);

    const customHeaderRow = worksheet.addRow(
      columns.map((column) => column.header)
    );
    customHeaderRow.eachCell((cell, colNumber) => {
      cell.font = { bold: true };
      cell.border = {
        top: { style: "thin", color: { argb: "000000" } },
        left: { style: "thin", color: { argb: "000000" } },
        bottom: { style: "thin", color: { argb: "000000" } },
        right: { style: "thin", color: { argb: "000000" } },
      };
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    customHeaderRow.height = 30;

    worksheet.columns = columns;
    worksheet.addRows(rows);

    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        cell.border = {
          top: { style: "thin", color: { argb: "000000" } },
          left: { style: "thin", color: { argb: "000000" } },
          bottom: { style: "thin", color: { argb: "000000" } },
          right: { style: "thin", color: { argb: "000000" } },
        };
        cell.alignment = { vertical: "middle", horizontal: "center" };
      });
    });

    const exportDir = path.join(__dirname, "../public/export/");
    const filePath = path.join(exportDir, filename);

    try {
      await fs.mkdir(exportDir, { recursive: true });
      return await workbook.xlsx.write(res);
    } catch (error) {
      reject(error);
    }
  });
};

