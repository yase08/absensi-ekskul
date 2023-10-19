// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { IsNotEmpty, IsString, IsInt, IsEmail, MaxLength, MinLength } from "class-validator";

export class DTOAssessment {
  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsInt()
  grade: number;

  @IsNotEmpty()
  @IsInt()
  task_id: number;

  @IsNotEmpty()
  @IsInt()
  student_id: number;

}

export class DTOAssessmentById {
  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsInt()
  grade: number;

  @IsNotEmpty()
  @IsInt()
  task_id: number;

  @IsNotEmpty()
  @IsInt()
  student_id: number;

  @IsNotEmpty()
  @IsString()
  id: string;

}
