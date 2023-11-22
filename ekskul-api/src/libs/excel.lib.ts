import path from "path";
import fs from "fs/promises";
import ExcelJS from "exceljs";

export const exportExcel = async (
  columns: any[],
  rows: any[],
  filename: string
): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Sheet 1");

    // Add custom header row
    const customHeaderRow = worksheet.addRow(["No", "Siswa", "Ekstrakurikuler", "Tanggal", "Keterangan"]);
    customHeaderRow.eachCell((cell, colNumber) => {
      cell.font = { bold: true };
      cell.border = {
        top: { style: "double", color: { argb: "00000000" } },
        left: { style: "double", color: { argb: "00000000" } },
        bottom: { style: "double", color: { argb: "00000000" } },
        right: { style: "double", color: { argb: "00000000" } },
      };
    });

    worksheet.columns = columns;
    worksheet.addRows(rows);

    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
      row.eachCell((cell, colNumber) => {
        cell.border = {
          top: { style: "double", color: { argb: "00000000" } },
          left: { style: "double", color: { argb: "00000000" } },
          bottom: { style: "double", color: { argb: "00000000" } },
          right: { style: "double", color: { argb: "00000000" } },
        };
      });
    });

    const exportDir = path.join(__dirname, "../public/export/");
    const filePath = path.join(exportDir, filename);

    try {
      // Ensure the directory structure exists
      await fs.mkdir(exportDir, { recursive: true });

      // Write the workbook to the file
      await workbook.xlsx.writeFile(filePath);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};