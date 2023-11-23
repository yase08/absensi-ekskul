// Berfungsi untuk memvalidasi req.body / req.params / req.query

import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MaxLength,
  MinLength,
  IsOptional,
  IsUUID,
} from "class-validator";

export class DTOUser {
  @IsNotEmpty({ message: "Nama tidak boleh kosong" })
  @IsString({ message: "Nama harus berupa string" })
  name: string;

  @IsNotEmpty({ message: "Email tidak boleh kosong" })
  @IsString({ message: "Email harus berupa string" })
  @IsEmail({}, { message: "Email tidak valid" })
  email: string;

  @IsNotEmpty({ message: "Nomor HP tidak boleh kosong" })
  @IsString({ message: "Nomor HP harus berupa string" })
  @MaxLength(13, { message: "Nomor HP tidak valid" })
  mobileNumber: string;

  @IsString({ message: "Jenis kelamin harus berupa string" })
  @IsOptional()
  image?: string;

  @IsString({ message: "Password harus berupa string" })
  @IsNotEmpty({ message: "Password tidak boleh kosong" })
  @MinLength(8, { message: "Password minimal 8 karakter" })
  password: string;
}

export class DTOUserById {
  @IsNotEmpty({ message: "Id tidak boleh kosong" })
  @IsUUID()
  id: string;
}
