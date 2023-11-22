// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { Transform } from "class-transformer";
import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsEmail,
  MaxLength,
  IsUUID,
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
  @IsUUID()
  rombel_id: string;

  @IsNotEmpty()
  @IsUUID()
  rayon_id: string;
}

export class DTOStudentById {
  @IsNotEmpty()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsInt()
  id: number;
}
