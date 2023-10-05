import ExcelJS from 'exceljs';

export const exportExcel = async (columns: any[], rows: any[], filename: string): Promise<any> => {
  return new Promise(async (resolve, reject) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Sheet 1');

  worksheet.columns = columns;
  worksheet.addRows(rows);

  worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      cell.border = {
        top: { style: 'double', color: { argb: 'FF00FF00' } },
        left: { style: 'double', color: { argb: 'FF00FF00' } },
        bottom: { style: 'double', color: { argb: 'FF00FF00' } },
        right: { style: 'double', color: { argb: 'FF00FF00' } },
      };
    });
  });

  const filePath = `../ekskul-api/public/export/${filename}`;

  try {
    await workbook.xlsx.writeFile(filePath);
    resolve(true);
  } catch (error) {
    reject(error);
  }
  })
}
