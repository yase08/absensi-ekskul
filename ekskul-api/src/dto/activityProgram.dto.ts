// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { Transform } from "class-transformer";
import {
  IsNotEmpty,
  IsString,
  IsInt,
} from "class-validator";

export class DTOActivityProgram {
  @IsNotEmpty()
  @IsString()
  activity: string;

  @IsNotEmpty()
  @IsString()
  task: string;

  @IsNotEmpty()
  @IsString()
  startDate: string;

  @IsNotEmpty()
  @IsString()
  endDate: string;

  @IsNotEmpty()
  @IsInt()
  instructor_id: number;

  @IsNotEmpty()
  @IsInt()
  ekskul_id: number;
}

export class DTOActivityProgramById {
  @IsNotEmpty()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsInt()
  id: number;
}
