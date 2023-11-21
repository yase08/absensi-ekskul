import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request } from "express";
import { exportExcel } from "../libs/excel.lib";
import { ISession } from "../interfaces/user.interface";
import { Op } from "sequelize";
import * as cron from "node-cron";

// Berfungsi untuk menghandle logic dari controler

const db = require("../db/models");

function getStartAndEndWeek(date) {
  const currentDate = date || new Date();

  // Atur zona waktu ke 'Asia/Jakarta' (zona waktu Indonesia Barat)
  const options = { timeZone: "Asia/Jakarta" };
  const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);

  const currentDay = currentDate.getDay();
  const startDate = new Date(currentDate);
  const endDate = new Date(currentDate);

  // Mengatur tanggal menjadi hari Senin
  startDate.setDate(
    startDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1)
  );

  // Mengatur tanggal menjadi hari Minggu
  endDate.setDate(endDate.getDate() - currentDay + (currentDay === 0 ? 0 : 7));

  // Mendapatkan tanggal awal dan akhir dalam format string
  const start = dateTimeFormat.format(startDate);
  const end = dateTimeFormat.format(endDate);

  return {
    start,
    end,
  };
}

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
          const historyAttendance = await db.historyAttendance.create({
            ekskul_id: ekskuls[index].id,
            totalAttendance: ekskulCount,
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

cron.schedule("* * * * *", () => {
  countAttendancePerWeekService();
});

export class AttendanceService {
  async createAttendanceService(req: Request): Promise<any> {
    try {
      const ekskuls = (req.session as ISession).user.ekskul;
      const selectedEkskulId = Number(req.query.ekskul_id);
      console.log(ekskuls);

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
      // const attendanceData = await db.attendance.findAll();
      const attendanceData = [
        {
          siswa_id: 1,
          category: "hadir",
          date: "2021-10-01",
        },
      ];

      const columns = [
        { header: "Student", key: "siswa_id", width: 15 },
        { header: "Category", key: "category", width: 15 },
        { header: "Date", key: "date", width: 15 },
      ];
      const file = "ajdoad.xlsx"; // Use 'filename' here

      const exportSuccess = await exportExcel(columns, attendanceData, file);

      if (!exportSuccess) throw apiResponse(status.FORBIDDEN, "Export failed");

      return Promise.resolve(apiResponse(status.OK, "Export Success"));
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
      const selectedEkskulId = req.query.ekskul_id;

      const sort: string =
        typeof req.query.sort === "string" ? req.query.sort : "";
      const page: any = req.query.page;

      if (ekskuls.includes(Number(selectedEkskulId))) {
        const paramQuerySQL: any = {
          where: { ekskul_id: selectedEkskulId },
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

        paramQuerySQL.include = [
          {
            model: db.ekskul,
            attributes: ["name"],
            as: "ekskul",
          },
          {
            model: db.student,
            attributes: ["name"],
            as: "student",
          },
        ];

        const attendanceFilter = await db.attendance.findAll(paramQuerySQL);
        // const attendances = await db.attendance.findAll({
        //   attributes: ["id"],
        // });

        if (!attendanceFilter || attendanceFilter.length === 0) {
          return Promise.resolve(
            apiResponse(
              status.NOT_FOUND,
              "No attendances found with the specified filter"
            )
          );
        }

        const modifiedAttendances = attendanceFilter.map((attendance) => {
          return {
            id: attendance.id,
            ekskul: attendance.ekskul.name,
            student: attendance.student.name,
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
            modifiedAttendances
            // attendances,
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

  async getWeeklyAttendanceChartService(req: Request): Promise<any> {
    try {
      const { start, end } = getStartAndEndWeek(new Date());
      const weeklyAttendanceData = await db.historyAttendance.findAll({
        attributes: ["startDate", "endDate", "totalAttendance"],
        include: [
          {
            model: db.ekskul,
            as: "ekskul",
            attributes: ["name"],
          },
        ],
      });

      const formattedData = weeklyAttendanceData.map((attendance) => {
        return {
          ekskulName: attendance.ekskul.name,
          startDate: attendance.startDate,
          endDate: attendance.endDate,
          totalAttendance: attendance.totalAttendance,
        };
      });

      return Promise.resolve(
        apiResponse(
          status.OK,
          "Fetched weekly attendance success",
          formattedData
          // attendances,
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
