// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class DTOLogin {
  @IsNotEmpty({ message: "Email tidak boleh kosong" })
  @IsEmail()
  @IsString({ message: "Email harus berupa string" })
  email: string;

  @IsString({ message: "Password harus berupa string" })
  @IsNotEmpty({ message: "password is not empty" })
  @MinLength(8, { message: "Password minimal 8 karakter" })
  password: string;
}

export class DTOForgotPassword {
  @IsNotEmpty({ message: "Email tidak boleh kosong" })
  @IsString({ message: "Email harus berupa string" })
  @IsEmail()
  email: string;
}

export class DTOResetToken {
  @IsNotEmpty({ message: "Password tidak boleh kosong" })
  @MinLength(8, { message: "Password minimal 8 karakter" })
  @IsString({ message: "Password harus berupa string" })
  password: string;

  @IsNotEmpty({ message: "Token tidak boleh kosong" })
  @IsString({ message: "Token harus berupa string" })
  token: string;
}
