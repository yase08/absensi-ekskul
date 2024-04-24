// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class DTOLogin {
  @IsNotEmpty({ message: "email must not be empty" })
  @IsEmail()
  @IsString({ message: "email must be a string" })
  email: string;

  @IsString({ message: "password must be a string" })
  @IsNotEmpty({ message: "password is not empty" })
  @MinLength(8, { message: "password must be at least 8 characters" })
  password: string;
}

export class DTOForgotPassword {
  @IsNotEmpty({ message: "email must not be empty" })
  @IsString({ message: "email must be a string" })
  @IsEmail()
  email: string;
}

export class DTOResetToken {
  @IsNotEmpty({ message: "password is not empty" })
  @MinLength(8, { message: "password must be at least 8 characters" })
  @IsString({ message: "password must be a string" })
  password: string;

  @IsNotEmpty({ message: "token is not empty" })
  @IsString({ message: "token must be a string" })
  token: string;
}
