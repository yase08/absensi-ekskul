// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { Transform } from "class-transformer";
import {
  IsNotEmpty,
  IsString,
  IsInt,
} from "class-validator";

export class DTOInstructorAttendance {
  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsInt()
  instructor_id: number;

  @IsNotEmpty()
  @IsInt()
  ekskul_id: number;
}

export class DTOInstructorAttendanceById {
  @IsNotEmpty()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsInt()
  id: number;
}
