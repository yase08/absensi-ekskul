import express, { Express } from "express";
import "dotenv/config";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import http, { Server } from "http";
import consola from "consola";
import nocache from "nocache";
import SlowDown from "express-slow-down";
import hpp from "hpp";
import session from "express-session";
import { swaggerClient, swaggerServe } from "./libs/swagger.lib";
import "reflect-metadata";
import AuthRoutes from "./routes/auth.route";
import AttendanceRoutes from "./routes/attendance.route";
import RayonRoutes from "./routes/rayon.route";
import RombelRoutes from "./routes/rombel.route";
import EkskulRoutes from "./routes/ekskul.route";
import StudentRoutes from "./routes/student.route";
import ScheduleRoutes from "./routes/schedule.route";
import GalleryRoutes from "./routes/gallery.route";
import RoomRoutes from "./routes/room.route";
import ActivityProgramRoutes from "./routes/activityProgram.route";
import AssessmentRoutes from "./routes/assessment.route";
import UserRoutes from "./routes/user.route";
import TaskRoute from "./routes/task.route";
import ActivityRoute from "./routes/activity.route";
import InstructorAttendanceRoute from "./routes/instructorAttendance.route";

// Membuat class App yang yang berfungsi sebagai server express
export class App {
  public app: Express;
  protected version: string;
  protected env: string;
  protected port: number;
  protected server: Server;

  constructor() {
    this.app = express();
    this.version = "/api/v1";
    this.env = process.env.NODE_ENV!;
    this.server = http.createServer(this.app);
    this.port = +process.env.PORT!;
    this.plugins();
    this.route();
  }

  // Digunakan untuk mengatur middleware express
  protected plugins(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(compression());
    this.app.use(morgan("dev"));
    this.app.use(nocache());
    this.app.use("/gallery", express.static("public"));
    this.app.enable("trust proxy");
    this.app.use(helmet({ contentSecurityPolicy: false }));
    this.app.use(hpp({ checkBody: true, checkQuery: true }));
    if (!["production", "test"].includes(this.env)) {
      this.app.use(`${this.version}/docs`, swaggerServe, swaggerClient());
    }
    this.app.use(
      session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET_KEY as string,
        cookie: { httpOnly: true, sameSite: "strict" },
      })
    );
    this.app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "DELETE", "PUT", "PATCH", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "Accept"],
        credentials: true,
      })
    );
    this.app.use(
      rateLimit({
        windowMs: 24 * 60 * 3,
        max: 1000,
        message: "Too many request, send back request after 3 minute",
      })
    );
    this.app.use(
      SlowDown({
        windowMs: 24 * 60 * 1,
        delayMs: 24 * 60 * 2000,
        delayAfter: 1000,
      })
    );
  }

  // Digunakan untuk memanggil route
  protected route(): void {
    this.app.use(`${this.version}/auth`, AuthRoutes);
    this.app.use(`${this.version}/attendance`, AttendanceRoutes);
    this.app.use(`${this.version}/rayon`, RayonRoutes);
    this.app.use(`${this.version}/rombel`, RombelRoutes);
    this.app.use(`${this.version}/ekskul`, EkskulRoutes);
    this.app.use(`${this.version}/student`, StudentRoutes);
    this.app.use(`${this.version}/user`, UserRoutes);
    this.app.use(`${this.version}/activity-program`, ActivityProgramRoutes);
    this.app.use(`${this.version}/schedule`, ScheduleRoutes);
    this.app.use(`${this.version}/gallery`, GalleryRoutes);
    this.app.use(`${this.version}/room`, RoomRoutes);
    this.app.use(`${this.version}/assessment`, AssessmentRoutes);
    this.app.use(`${this.version}/task`, TaskRoute);
    this.app.use(`${this.version}/activity`, ActivityRoute);
    this.app.use(
      `${this.version}/instructor-attendance`,
      InstructorAttendanceRoute
    );
  }

  // Digunakan untuk menjalankan server express
  protected async run(): Promise<void> {
    if (this.env != "production") {
      this.server.listen(this.port, () =>
        consola.success(
          `[server]: Server is running at http://localhost:${this.port}`
        )
      );
    }
  }

  public async main(): Promise<void> {
    await this.run();
  }
}

(async function () {
  if (process.env.NODE_ENV != "test") await new App().main();
})();
