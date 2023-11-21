// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { Transform } from "class-transformer";
import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsEmail,
  MaxLength,
} from "class-validator";

export class DTOStudent {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(8)
  nis: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(13)
  mobileNumber: string;

  @IsNotEmpty()
  @IsInt()
  rombel_id: number;

  @IsNotEmpty()
  @IsInt()
  rayon_id: number;
}

export class DTOStudentById {
  @IsNotEmpty()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsInt()
  id: number;
}
