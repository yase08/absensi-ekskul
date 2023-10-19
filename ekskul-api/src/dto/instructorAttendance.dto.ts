// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { IsNotEmpty, IsString, IsInt, IsEmail, MaxLength, MinLength } from "class-validator";

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
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsInt()
  instructor_id: number;

  @IsNotEmpty()
  @IsInt()
  ekskul_id: number;

  @IsNotEmpty()
  @IsString()
  id: string;
}
