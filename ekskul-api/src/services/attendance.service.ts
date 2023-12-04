import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { exportExcel } from "../libs/excel.lib";
import { formatDate, getWeekNumberAndYear, getMonthAndYear } from "../libs/date.lib";
import { ISession } from "../interfaces/user.interface";
import { Op } from "sequelize";
import * as cron from "node-cron";

const db = require("../db/models");

function getStartAndEndWeek(date) {
  const currentDate = date || new Date();

  const options = { timeZone: "Asia/Jakarta" };
  const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);

  const currentDay = currentDate.getDay();
  const startDate = new Date(currentDate);
  const endDate = new Date(currentDate);

  startDate.setDate(
    startDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1)
  );

  endDate.setDate(endDate.getDate() - currentDay + (currentDay === 0 ? 0 : 7));

  const start = dateTimeFormat.format(startDate);
  const end = dateTimeFormat.format(endDate);

  return {
    start,
    end,
  };
}

const getWeekNumber = (date) => {
  const currentDate: any = Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
  }).format(new Date(date));

  currentDate.setDate(
    currentDate.getDate() -
      currentDate.getDay() +
      (currentDate.getDay() === 0 ? 1 : -currentDate.getDay() + 1)
  );

  const yearStart: any = new Date(currentDate.getFullYear(), 0, 1);

  const weekNumber = Math.ceil(((currentDate - yearStart) / 86400000 + 1) / 7);

  return weekNumber;
};

const countAttendancePerWeekService = async () => {
  try {
    const { start, end } = getStartAndEndWeek(new Date());
    const ekskuls = await db.ekskul.findAll({
      attributes: ["id"],
    });

    const totalAttendance = await Promise.all(
      ekskuls.map(async (ekskul) => {
        try {
          const attendance = await db.attendance.count({
            where: {
              date: {
                [Op.between]: [start, end],
              },
              ekskul_id: ekskul.id,
            },
          });
          return attendance;
        } catch (error) {
          console.error(
            `Error counting attendance for ekskul ${ekskul.id}:`,
            error
          );
          return 0;
        }
      })
    );

    if (!totalAttendance)
      throw apiResponse(status.NOT_FOUND, "No attendance found");

    const createHistoryAttendance = await Promise.all(
      totalAttendance.map(async (ekskulCount, index) => {
        try {
          const weekNumber = getWeekNumber(
            Intl.DateTimeFormat("en-US", {
              timeZone: "Asia/Jakarta",
            }).format(new Date())
          );
          const historyAttendance = await db.historyAttendance.create({
            ekskul_id: ekskuls[index].id,
            totalAttendance: ekskulCount,
            type: "week",
            year: new Date().getFullYear(),
            name: `week-${weekNumber}`,
            startDate: start,
            endDate: end,
          });
          return historyAttendance;
        } catch (error) {
          console.error(
            `Error creating history attendance for ekskul ${ekskuls[index].id}:`,
            error
          );
          return null;
        }
      })
    );
  } catch (error: any) {
    return Promise.reject(
      apiResponse(
        error.statusCode || status.INTERNAL_SERVER_ERROR,
        error.statusMessage,
        error.message
      )
    );
  }
};

function getStartAndEndMonth(date) {
  const currentDate = date || new Date();

  const options = { timeZone: "Asia/Jakarta" };
  const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);

  const startDate = new Date(currentDate);
  const endDate = new Date(currentDate);

  startDate.setDate(1);

  endDate.setMonth(endDate.getMonth() + 1);
  endDate.setDate(0);

  const start = dateTimeFormat.format(startDate);
  const end = dateTimeFormat.format(endDate);

  return {
    start,
    end,
  };
}

const countAttendancePerMonthService = async () => {
  try {
    const { start, end } = getStartAndEndMonth(new Date());
    const ekskuls = await db.ekskul.findAll({
      attributes: ["id"],
    });

    const totalAttendance = await Promise.all(
      ekskuls.map(async (ekskul) => {
        try {
          const attendance = await db.attendance.count({
            where: {
              date: {
                [Op.between]: [start, end],
              },
              ekskul_id: ekskul.id,
            },
          });
          return attendance;
        } catch (error) {
          console.error(
            `Error counting attendance for ekskul ${ekskul.id}:`,
            error
          );
          return 0;
        }
      })
    );

    if (!totalAttendance)
      throw apiResponse(status.NOT_FOUND, "No attendance found");

    const createHistoryAttendance = await Promise.all(
      totalAttendance.map(async (ekskulCount, index) => {
        try {
          const monthName = new Date().getMonth();
          const historyAttendance = await db.historyAttendance.create({
            ekskul_id: ekskuls[index].id,
            totalAttendance: ekskulCount,
            startDate: start,
            endDate: end,
            type: "month",
            year: new Date().getFullYear(),
            name: `${monthName}`,
          });
          return historyAttendance;
        } catch (error) {
          console.error(
            `Error creating history attendance for ekskul ${ekskuls[index].id}:`,
            error
          );
          return null;
        }
      })
    );
  } catch (error: any) {
    return Promise.reject(
      apiResponse(
        error.statusCode || status.INTERNAL_SERVER_ERROR,
        error.statusMessage,
        error.message
      )
    );
  }
};

// cron.schedule("0 0 * * 0", () => {
//   countAttendancePerWeekService();
// });

// cron.schedule("0 0 1 * *", () => {
//   countAttendancePerMonthService();
// });

// cron.schedule("* * * * *", () => {
//   countAttendancePerWeekService();
// });

// cron.schedule("* * * * *", () => {
//   countAttendancePerMonthService();
// });

export class AttendanceService {
  async createAttendanceService(req: Request): Promise<any> {
    try {
      const ekskuls = (req.session as ISession).user.ekskul;
      const selectedEkskulId = req.query.ekskul_id as string;

      if (ekskuls.includes(selectedEkskulId)) {
        const createAttendancePromises = [];

        for (const attendance of req.body) {
          const studentId = attendance.student_id;
          const studentOnEkskul = await db.studentOnEkskul.findOne({
            where: { student_id: studentId, ekskul_id: selectedEkskulId },
          });

          if (studentOnEkskul) {
            const createAttendance = db.attendance.create({
              ...attendance,
              ekskul_id: selectedEkskulId,
            });
            createAttendancePromises.push(createAttendance);
          } else {
            throw apiResponse(
              status.FORBIDDEN,
              `Student with ID ${studentId} is not associated with the selected ekskul`
            );
          }
        }

        const createdAttendances = await Promise.all(createAttendancePromises);

        if (!createdAttendances.length) {
          throw apiResponse(status.FORBIDDEN, "Create new attendances failed");
        }

        return Promise.resolve(
          apiResponse(status.OK, "Create new attendance success")
        );
      } else {
        throw apiResponse(
          status.NOT_FOUND,
          "Ekskul does not exist for the given id"
        );
      }
    } catch (error: any) {
      return Promise.reject(
        apiResponse(
          error.statusCode || status.INTERNAL_SERVER_ERROR,
          error.statusMessage,
          error.message
        )
      );
    }
  }

  async exportAttendance(req: Request): Promise<any> {
    try {
      const date = Date.now();
      const options = { timeZone: "Asia/Jakarta" };
      const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
      const formattedDate = dateTimeFormat.format(date);

      const ekskuls = (req.session as ISession).user.ekskul;
      const selectedEkskulId = req.query.ekskul_id as string;
      const ekskul = await db.ekskul.findOne({
        where: { id: selectedEkskulId },
      });

      if (ekskuls.includes(selectedEkskulId)) {
        const attendances = await db.attendance.findAll({
          where: {
            ekskul_id: selectedEkskulId,
          },
          include: [
            {
              model: db.student,
              as: "student",
              attributes: ["name", "nis", "gender"],
              include: [
                {
                  model: db.rombel,
                  as: "rombel",
                  attributes: ["name"],
                },
                {
                  model: db.rayon,
                  as: "rayon",
                  attributes: ["name"],
                },
              ],
            },
            {
              model: db.ekskul,
              as: "ekskul",
              attributes: ["name"],
            },
          ],
          attributes: ["category", "date"],
        });

        const modifiedAttendances = attendances.map((attendance) => {
          return {
            no: attendances.indexOf(attendance) + 1,
            student_name: attendance.student ? attendance.student.name : null,
            student_nis: attendance.student ? attendance.student.nis : null,
            student_gender: attendance.student
              ? attendance.student.gender === "male"
                ? "Laki-laki"
                : "Perempuan"
              : null,
            student_rombel: attendance.student
              ? attendance.student.rombel.name
              : null,
            student_rayon: attendance.student
              ? attendance.student.rayon.name
              : null,
            ekskul_name: attendance.ekskul ? attendance.ekskul.name : null,
            category: attendance.category,
            date: attendance.date,
          };
        });

        const columns = [
          { header: "No", key: "no", width: 15 },
          { header: "Nama", key: "student_name", width: 15 },
          { header: "Nis", key: "student_nis", width: 15 },
          { header: "JK", key: "student_gender", width: 15 },
          { header: "Rombel", key: "student_rombel", width: 15 },
          { header: "Rayon", key: "student_rayon", width: 15 },
          { header: "Ekstrakurikuler", key: "ekskul_name", width: 15 },
          { header: "Keterangan", key: "category", width: 15 },
          { header: "Tanggal", key: "date", width: 15 },
        ];
        const file = `data-kehadiran-${ekskul.name}.xlsx`;

        const exportSuccess = await exportExcel(
          columns,
          modifiedAttendances,
          file
        );

        if (!exportSuccess)
          throw apiResponse(status.FORBIDDEN, "Export failed");

        return Promise.resolve(apiResponse(status.OK, "Export Success"));
      } else {
        throw apiResponse(
          status.NOT_FOUND,
          "Ekskul does not exist for the given id"
        );
      }
    } catch (error: any) {
      return Promise.reject(
        apiResponse(
          error.statusCode || status.INTERNAL_SERVER_ERROR,
          error.statusMessage,
          error.message
        )
      );
    }
  }

  async getAllAttendanceService(req: Request): Promise<any> {
    try {
      const ekskuls = (req.session as ISession).user.ekskul;
      const selectedEkskulId = req.query.ekskul_id as string;

      const sort: string =
        typeof req.query.sort === "string" ? req.query.sort : "";
      const page: any = req.query.page;

      if (ekskuls.includes(selectedEkskulId)) {
        const paramQuerySQL: any = {
          where: { ekskul_id: selectedEkskulId },
        };
        let limit: number;
        let offset: number;

        const totalRows = await db.attendance.count();

        if (sort) {
          const sortOrder = sort.startsWith("-") ? "DESC" : "ASC";
          const fieldName = sort.replace(/^-/, "");
          paramQuerySQL.order = [[fieldName, sortOrder]];
        }

        if (page && page.size && page.number) {
          limit = parseInt(page.size, 10);
          offset = (parseInt(page.number, 10) - 1) * limit;
          paramQuerySQL.limit = limit;
          paramQuerySQL.offset = offset;
        } else {
          limit = 10;
          offset = 0;
          paramQuerySQL.limit = limit;
          paramQuerySQL.offset = offset;
        }

        paramQuerySQL.include = [
          {
            model: db.ekskul,
            attributes: ["id", "name"],
            as: "ekskul",
          },
          {
            model: db.student,
            attributes: ["id", "name"],
            as: "student",
          },
        ];

        const attendance = await db.attendance.findAll(paramQuerySQL);

        if (!attendance || attendance.length === 0) {
          return Promise.resolve(
            apiResponse(
              status.NOT_FOUND,
              "No attendances found with the specified filter"
            )
          );
        }

        const modifiedAttendances = attendance.map((attendance) => {
          return {
            id: attendance.id,
            ekskul: attendance.ekskul
              ? {
                  id: attendance.ekskul.id,
                  name: attendance.ekskul.name,
                }
              : null,
            student: attendance.student
              ? {
                  id: attendance.student.id,
                  name: attendance.student.name,
                }
              : null,
            category: attendance.category,
            date: attendance.date,
            createdAt: attendance.createdAt,
            updatedAt: attendance.updatedAt,
          };
        });

        return Promise.resolve(
          apiResponse(
            status.OK,
            "Fetched all attendances success",
            modifiedAttendances,
            totalRows
          )
        );
      } else {
        throw apiResponse(
          status.NOT_FOUND,
          "Ekskul do not exist for the given id"
        );
      }
    } catch (error: any) {
      return Promise.reject(
        apiResponse(
          error.statusCode || status.INTERNAL_SERVER_ERROR,
          error.statusMessage,
          error.message
        )
      );
    }
  }

  async getChartAttendanceService(req: Request): Promise<any> {
    try {
      const weeklyAttendance = {};
      const monthlyAttendance = {};
      const dailyAttendance = {};
      // const ekskuls = (req.session as ISession).user.ekskul;
      const selectedType = req.query.type;

      const sort: string =
        typeof req.query.sort === "string" ? req.query.sort : "";
      const page: any = req.query.page;

      // if (ekskuls.includes(Number(selectedEkskulId))) {
        const paramQuerySQL: any = {
          where: { category: selectedType },
        };
        let limit: number;
        let offset: number;

        if (sort) {
          const sortOrder = sort.startsWith("-") ? "DESC" : "ASC";
          const fieldName = sort.replace(/^-/, "");
          paramQuerySQL.order = [[fieldName, sortOrder]];
        }

        if (page && page.size && page.number) {
          limit = parseInt(page.size, 10);
          offset = (parseInt(page.number, 10) - 1) * limit;
          paramQuerySQL.limit = limit;
          paramQuerySQL.offset = offset;
        } else {
          limit = 10;
          offset = 0;
          paramQuerySQL.limit = limit;
          paramQuerySQL.offset = offset;
        }

        const attendanceFilter = await db.attendance.findAll(paramQuerySQL);         

        if (!attendanceFilter || attendanceFilter.length === 0) {
          return Promise.resolve(
            apiResponse(
              status.NOT_FOUND,
              "No attendances found with the specified filter"
            )
          );
        }

        attendanceFilter.forEach((attendance) => {
          
            const formattedDate = formatDate(attendance.date)
            
            if (!dailyAttendance[formattedDate]) {
              dailyAttendance[formattedDate] = []
            }
            dailyAttendance[formattedDate].push(attendance)

            const { weekNumber, year } = getWeekNumberAndYear(attendance.date)

            const weekKey = `${year}-W${weekNumber}`
            if (!weeklyAttendance[weekKey]) {
              weeklyAttendance[weekKey] = []
            }
            weeklyAttendance[weekKey].push(attendance)

            const { month, formattedYear } = getMonthAndYear(attendance.date)

            const monthKey = `${formattedYear}-${month}`
            if (!monthlyAttendance[monthKey]) {
              monthlyAttendance[monthKey] = []
            }
            monthlyAttendance[monthKey].push(attendance)

        })

        return Promise.resolve(
          apiResponse(status.OK, "Fetched all attendances success", {
            weeklyAttendance,
            monthlyAttendance,
            dailyAttendance,
            // attendances,
          })
        );
      // } else {
      //   throw apiResponse(
      //     status.NOT_FOUND,
      //     "Ekskul do not exist for the given id"
      //   );
      // }
    } catch (error: any) {
      return Promise.reject(
        apiResponse(
          error.statusCode || status.INTERNAL_SERVER_ERROR,
          error.statusMessage,
          error.message
        )
      );
    }
``}

  async updateAttendanceService(req: Request): Promise<any> {
    try {
      const attendanceExist = await db.attendance.findOne({
        where: { id: req.params.id },
      });

      if (!attendanceExist)
        throw apiResponse(
          status.NOT_FOUND,
          "Attendance do not exist for the given id"
        );

      const updateAttendance = await db.attendance.update(req.body, {
        where: {
          id: attendanceExist.id,
        },
      });

      if (!updateAttendance)
        throw apiResponse(status.FORBIDDEN, "Update attendance failed");

      return Promise.resolve(
        apiResponse(status.OK, "Update attendance success")
      );
    } catch (error: any) {
      return Promise.reject(
        apiResponse(
          error.statusCode || status.INTERNAL_SERVER_ERROR,
          error.statusMessage,
          error.message
        )
      );
    }
  }

  async getHistoryWeeklyAttendanceService(req: Request): Promise<any> {
    try {
      const weeklyAttendanceData = await db.historyAttendance.findAll({
        where: {
          type: "week",
        },
        attributes: [
          "startDate",
          "endDate",
          "totalAttendance",
          "type",
          "name",
          "year",
        ],
        include: [
          {
            model: db.ekskul,
            as: "ekskul",
            attributes: ["name"],
          },
        ],
      });

      const formattedData = {};

      weeklyAttendanceData.forEach((attendance) => {
        const weekName = `week ${attendance.name}`;
        if (!formattedData[weekName]) {
          formattedData[weekName] = [];
        }

        formattedData[weekName].push({
          ekskulName: attendance.ekskul.name,
          startDate: attendance.startDate,
          year: attendance.year,
          endDate: attendance.endDate,
          totalAttendance: attendance.totalAttendance,
        });
      });

      const sortedWeeks = Object.keys(formattedData).sort();

      const sortedFormattedData = {};
      sortedWeeks.forEach((week) => {
        sortedFormattedData[week] = formattedData[week];
      });

      return Promise.resolve(
        apiResponse(
          status.OK,
          "Fetched weekly attendance success",
          sortedFormattedData
        )
      );
    } catch (error: any) {
      return Promise.reject(
        apiResponse(
          error.statusCode || status.INTERNAL_SERVER_ERROR,
          error.statusMessage,
          error.message
        )
      );
    }
  }
}
