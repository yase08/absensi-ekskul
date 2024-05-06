import { StatusCodes as status } from "http-status-codes";
import { apiResponse } from "../helpers/apiResponse.helper";
import { Request, Response } from "express";
import { exportExcel } from "../libs/excel.lib";
import { ISession } from "../interfaces/user.interface";
import { Op } from "sequelize";

const db = require("../db/models");

async function checkSemester(): Promise<string> {
  const currentMonth = new Date().getMonth();

  if (currentMonth >= 6 && currentMonth <= 11) {
    return "odd";
  } else {
    return "even";
  }
}

function calculateAttendanceValueBasedOnCategory(category: string): number {
  const result = category === "hadir" ? 1 : 0;

  return result;
}

function calculateTotalAttendanceByCategory(
  attendance: any[]
): Record<string, number> {
  const totalAttendanceByStudent: Record<string, number> = {};

  attendance.forEach((attendance) => {
    const studentId = attendance.student.id;
    const category = attendance.category;

    if (!totalAttendanceByStudent[studentId]) {
      totalAttendanceByStudent[studentId] = 0;
    }

    totalAttendanceByStudent[studentId] +=
      calculateAttendanceValueBasedOnCategory(category);
  });

  return totalAttendanceByStudent;
}

function calculateTotalAttendance(attendance: any[]): Record<string, number> {
  const totalAttendanceByStudent: Record<string, number> = {};

  attendance.forEach((attendance) => {
    const studentId = attendance.student.id;

    if (!totalAttendanceByStudent[studentId]) {
      totalAttendanceByStudent[studentId] = 0;
    }

    totalAttendanceByStudent[studentId] += 1;
  });

  return totalAttendanceByStudent;
}

const countAttendancePerWeekService = async () => {
  try {
    let currentWeekNumber = 1;
    const ekskuls = await db.ekskul.findAll({
      attributes: ["id"],
    });

    const totalAttendance = await Promise.all(
      ekskuls.map(async (ekskul) => {
        try {
          const attendance = await db.attendance.count({
            where: {
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

    if (!totalAttendance) {
      throw apiResponse(status.NOT_FOUND, "No attendance found");
    }

    let createOrUpdateHistoryAttendance = [];

    for (const ekskul of ekskuls) {
      const historyAttendanceExist = await db.historyAttendance.findAll({
        where: {
          ekskul_id: ekskul.id,
        },
      });

      if (historyAttendanceExist.length > 0) {
        const updatedRecords = await Promise.all(
          totalAttendance.map(async (ekskulCount, index) => {
            try {
              const existingRecord = historyAttendanceExist.find(
                (record) => record.ekskul_id === ekskul.id
              );

              const updatedRecord = await db.historyAttendance.update(
                {
                  totalAttendance: ekskulCount,
                  weekNumber: existingRecord.weekNumber + 1,
                },
                {
                  where: {
                    ekskul_id: ekskul.id,
                  },
                }
              );

              return updatedRecord;
            } catch (error) {
              console.error(
                `Error updating history attendance for ekskul ${ekskul.id}:`,
                error
              );
              return null;
            }
          })
        );

        createOrUpdateHistoryAttendance.push(...updatedRecords);
      } else {
        const createdRecords = await Promise.all(
          totalAttendance.map(async (ekskulCount, index) => {
            try {
              const historyAttendance = await db.historyAttendance.create({
                ekskul_id: ekskul.id,
                totalAttendance: ekskulCount,
                year: new Date().getFullYear(),
                weekNumber: currentWeekNumber,
              });

              return historyAttendance;
            } catch (error) {
              console.error(
                `Error creating history attendance for ekskul ${ekskul.id}:`,
                error
              );
              return null;
            }
          })
        );

        createOrUpdateHistoryAttendance.push(...createdRecords);
      }
    }

    currentWeekNumber++;

    return createOrUpdateHistoryAttendance;
  } catch (error: any) {
    console.error("Unhandled promise rejection:", error);
    return Promise.reject(
      apiResponse(
        error.statusCode || status.INTERNAL_SERVER_ERROR,
        error.statusMessage,
        error.message
      )
    );
  }
};

const countAttendancePerMonthService = async () => {
  try {
    const ekskuls = await db.ekskul.findAll({
      attributes: ["id"],
    });

    const totalAttendance = await Promise.all(
      ekskuls.map(async (ekskul) => {
        try {
          const attendance = await db.attendance.count({
            where: {
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
            type: "month",
            year: new Date().getFullYear(),
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

    return createHistoryAttendance;
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

export class AttendanceService {
  async createAttendanceService(req: Request): Promise<any> {
    try {
      const ekskuls = (req.session as ISession).user.ekskul;
      const selectedEkskulId = req.query.ekskul_id as string;
      const semester = await checkSemester();
      const date = req.body.date;
      const newDate = new Date(date);
      const timestamp = newDate.getTime();

      if (ekskuls.includes(selectedEkskulId)) {
        const createAttendancePromises = [];

        for (const attendance of req.body) {
          const studentId = attendance.student_id;
          const studentOnEkskul = await db.studentOnEkskul.findOne({
            where: { student_id: studentId, ekskul_id: selectedEkskulId },
          });

          if (studentOnEkskul) {
            const createAttendancePromise = db.attendance.create({
              ...attendance,
              date: timestamp,
              semester: semester,
              ekskul_id: selectedEkskulId,
            });
            createAttendancePromises.push(createAttendancePromise);
          } else {
            throw apiResponse(
              status.FORBIDDEN,
              `Siswa dengan id ${studentId} tidak ada di ekskul ini`
            );
          }
        }

        const createdAttendances = await Promise.all(createAttendancePromises);

        if (!createdAttendances.length) {
          throw apiResponse(status.FORBIDDEN, "Gagal menambahkan kehadiran");
        }

        return Promise.resolve(
          apiResponse(status.OK, "Berhasil menambahkan kehadiran")
        );
      } else {
        throw apiResponse(status.NOT_FOUND, "Ektrakurikuler tidak ditemukan");
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

  async exportAttendanceByInstructorService(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      const date = Date.now();
      const options = { timeZone: "Asia/Jakarta" };
      const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
      const formattedDate = dateTimeFormat.format(date);

      const ekskuls = (req.session as ISession).user.ekskul;
      const selectedEkskulId = req.query.ekskul_id as string;
      const selectedGrade = req.query.grade as string;
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
              where: {
                grade: selectedGrade,
              },
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
        const file = `data-kehadiran-${ekskul.name}-${formattedDate}.xlsx`;

        const exportSuccess = await exportExcel(
          file,
          columns,
          modifiedAttendances,
          "Absensi",
          res
        );

        res.setHeader(
          "Content-Type",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader("Content-Disposition", `attachment; filename=${file}`);

        if (!exportSuccess) {
          throw apiResponse(status.FORBIDDEN, "Export failed");
        }

        return Promise.resolve(
          apiResponse(status.OK, "Export Success", exportSuccess)
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

  async exportAttendanceService(req: Request, res: Response): Promise<any> {
    try {
      const date = Date.now();
      const options = { timeZone: "Asia/Jakarta" };
      const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
      const formattedDate = dateTimeFormat.format(date);

      const attendances = await db.attendance.findAll({
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
      const file = `data-kehadiran-ekstrakurikuler-${formattedDate}.xlsx`;

      const exportSuccess = await exportExcel(
        file,
        columns,
        modifiedAttendances,
        "Absensi",
        res
      );

      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader("Content-Disposition", `attachment; filename=${file}`);

      if (!exportSuccess) {
        throw apiResponse(status.FORBIDDEN, "Export failed");
      }

      return Promise.resolve(
        apiResponse(status.OK, "Export Success", exportSuccess)
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

  async getStudentAttendanceService(req: Request): Promise<any> {
    try {
      const { user } = req.session as ISession;
      const ekskuls = user.ekskul;
      const selectedEkskulId = req.query.ekskul_id as string | undefined; // Make it optional
      const selectedGrade = req.query.grade as string | undefined; // Make it optional

      const paramQuerySQL: any = {};

      // Include associations (ekskul and student) in the query
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
          where: {}, // Initialize where condition
        },
      ];

      if (user.role === "admin") {
        paramQuerySQL.where = {};
      } else if (user.role === "instructor") {
        if (selectedEkskulId) {
          if (selectedGrade) {
            // Check if grade is provided
            paramQuerySQL.include[1].where.grade = selectedGrade; // Apply grade filter
          }
          if (ekskuls.includes(selectedEkskulId)) {
            paramQuerySQL.where = { ekskul_id: selectedEkskulId };
          } else {
            throw apiResponse(
              status.NOT_FOUND,
              "Ekskul does not exist for the given id"
            );
          }
        }
      }

      // Fetch attendance data based on the query parameters
      const attendance = await db.attendance.findAll(paramQuerySQL);

      // Handle case where no attendance records are found
      if (!attendance || attendance.length === 0) {
        return apiResponse(
          status.NOT_FOUND,
          "No attendances found with the specified filter"
        );
      }

      // Calculate total attendance for each student based on the "category" column
      const totalAttendanceStudentByPresentCategory =
        calculateTotalAttendanceByCategory(attendance);

      // Calculate total attendance for each student by all category
      const totalAttendanceStudent = calculateTotalAttendance(attendance);

      const result: Record<string, number> = {};

      // Iterate through each student
      Object.keys(totalAttendanceStudentByPresentCategory).forEach(
        (studentId) => {
          // Calculate the percentage and store it in the result object
          result[studentId] =
            (totalAttendanceStudentByPresentCategory[studentId] /
              totalAttendanceStudent[studentId]) *
            100;
        }
      );

      // Fetch all students
      const students = await db.student.findAll();

      const modifiedAttendances = students.map((student) => {
        const studentId = student.id;
        const studentAttendance = attendance.find(
          (a) => a.student.id === studentId
        );

        // Filter out entries where both ekskul and name are null
        if (
          !studentAttendance ||
          (!studentAttendance.ekskul && !studentAttendance.student.name)
        ) {
          return null; // Skip this entry
        }

        return {
          id: studentId,
          name: studentAttendance?.student
            ? studentAttendance.student.name
            : null,
          ekskul: studentAttendance?.ekskul
            ? studentAttendance.ekskul.name
            : null,
          percentage: Math.round(result[studentId]) || 0,
        };
      });

      // Remove null entries from the array
      const filteredAttendances = modifiedAttendances.filter(
        (entry) => entry !== null
      );

      // Count total number of rows in the attendance table
      const totalRows = filteredAttendances.length;

      return apiResponse(
        status.OK,
        "Fetched all attendances successfully",
        filteredAttendances,
        totalRows
      );
    } catch (error: any) {
      // Handle errors and return an appropriate API response
      return Promise.reject(
        apiResponse(
          error.statusCode || status.INTERNAL_SERVER_ERROR,
          error.statusMessage,
          error.message
        )
      );
    }
  }

  async getDetailAttendanceService(req: Request): Promise<any> {
    try {
      const ekskuls = (req.session as ISession).user.ekskul;
      const selectedEkskulId = req.query.ekskul_id as string;
      const selectedStudentId = req.query.student_id as string;

      if (!selectedStudentId) {
        return Promise.resolve(
          apiResponse(
            status.BAD_REQUEST,
            "Missing required parameter: student_id"
          )
        );
      }

      if (ekskuls.includes(selectedEkskulId)) {
        const paramQuerySQL: any = {
          where: { ekskul_id: selectedEkskulId, student_id: selectedStudentId },
        };

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
          };
        });

        return Promise.resolve(
          apiResponse(
            status.OK,
            "Fetched all attendances success",
            modifiedAttendances
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

  async getDailyAttendanceService(req: Request): Promise<any> {
    try {
      const twelveMonthsAgo = new Date();
      twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

      const attendanceDate = await db.attendance.findAll({
        where: {
          date: {
            [Op.gte]: twelveMonthsAgo,
          },
        },
        attributes: [
          "date",
          [db.sequelize.fn("COUNT", db.sequelize.col("id")), "count"],
        ],
        group: ["date"],
      });

      return Promise.resolve(
        apiResponse(status.OK, "Get daily attendance success", attendanceDate)
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

  async getMonthlyAttendanceService(req: Request): Promise<any> {
    try {
      const twelveMonthsAgo = new Date();
      twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
      console.log(twelveMonthsAgo);

      const attendanceData = await db.attendance.findAll({
        where: {
          date: {
            [Op.gte]: twelveMonthsAgo,
          },
        },
        attributes: [
          [db.sequelize.fn("MONTH", db.sequelize.col("date")), "month"],
          [db.sequelize.fn("COUNT", db.sequelize.col("id")), "count"],
        ],
        group: [db.sequelize.fn("MONTH", db.sequelize.col("date"))],
      });

      const formattedData = attendanceData.map((data) => ({
        month: data.get("month"),
        count: data.get("count"),
      }));

      return Promise.resolve(
        apiResponse(status.OK, "Get monthly attendance success", formattedData)
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

  async getSemesterlyAttendanceService(req: Request): Promise<any> {
    try {
      const semestersAgo = 2;
      const currentDate = new Date();
      const semesterStart = new Date(currentDate);
      semesterStart.setMonth(semesterStart.getMonth() - 6 * semestersAgo);
      const semesterEnd = new Date(currentDate);
      semesterEnd.setMonth(semesterEnd.getMonth() - 6 * (semestersAgo - 1));

      const attendanceData = await db.attendance.findAll({
        where: {
          date: {
            [Op.gte]: semesterStart,
            [Op.lt]: semesterEnd,
          },
        },
        attributes: [
          [db.sequelize.fn("YEAR", db.sequelize.col("date")), "year"],
          [db.sequelize.fn("QUARTER", db.sequelize.col("date")), "quarter"],
          [db.sequelize.fn("COUNT", db.sequelize.col("id")), "count"],
        ],
        group: [
          db.sequelize.fn("YEAR", db.sequelize.col("date")),
          db.sequelize.fn("QUARTER", db.sequelize.col("date")),
        ],
      });

      console.log(`attendanceData: ${JSON.stringify(attendanceData)}`);

      if (attendanceData.length === 0) {
        return Promise.resolve(
          apiResponse(
            status.OK,
            "No attendance data found for the specified semester",
            []
          )
        );
      }

      const formattedData = attendanceData.map((data) => ({
        semester: `Semester ${data.get("quarter")} ${data.get("year")}`,
        count: data.get("count"),
      }));

      console.log(`formattedData: ${JSON.stringify(formattedData)}`);

      return Promise.resolve(
        apiResponse(
          status.OK,
          "Get semesterly attendance success",
          formattedData
        )
      );
    } catch (error: any) {
      console.error(`Error: ${error}`);
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
