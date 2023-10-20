// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { Transform } from "class-transformer";
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MaxLength,
  MinLength,
  IsInt,
} from "class-validator";

export class DTOUser {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(13)
  mobileNumber: string;

  @IsNotEmpty()
  @IsString()
  image: string;

  @IsString()
  @IsNotEmpty({ message: "password is not empty" })
  @MinLength(8)
  password: string;
}

export class DTOUserById {
  @IsNotEmpty()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsInt()
  id: number;
}
