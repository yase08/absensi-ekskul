// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { Transform } from "class-transformer";
import {
  IsNotEmpty,
  IsString,
  IsInt,
} from "class-validator";

export class DTOAttendance {
  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsInt()
  instructor_id: number;

  @IsNotEmpty()
  @IsInt()
  ekskul_id: number;
}

export class DTOAttendanceById {
  @IsNotEmpty()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsInt()
  id: number;
}
