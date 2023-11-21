// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { Transform } from "class-transformer";
import {
  IsNotEmpty,
  IsString,
  IsInt,
} from "class-validator";

export class DTOAssessment {
  // @IsNotEmpty()
  // @IsInt()
  // grade: number;

  // @IsNotEmpty()
  // @IsInt()
  // task_id: number;

  // @IsNotEmpty()
  // @IsInt()
  // student_id: number;
}

export class DTOAsessmentById {
  @IsNotEmpty()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsInt()
  id: number;
}
