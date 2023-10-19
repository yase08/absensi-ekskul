// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { IsNotEmpty, IsString, IsInt, IsEmail, MaxLength, MinLength } from "class-validator";

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

  @IsNotEmpty()
  @IsString()
  id: string;

}