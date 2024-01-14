// Berfungsi untuk memvalidasi req.body / req.params / req.query

import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MaxLength,
  IsUUID,
} from "class-validator";

export class DTOStudent {
  @IsNotEmpty({ message: "Nama tidak boleh kosong" })
  @IsString({ message: "Nama harus berupa string" })
  name: string;

  @IsNotEmpty({ message: "NIS tidak boleh kosong" })
  @IsString({ message: "NIS harus berupa string" })
  @MaxLength(8, { message: "NIS tidak boleh lebih dari 8 karakter" })
  nis: string;

  @IsNotEmpty({ message: "Email tidak boleh kosong" })
  @IsString({ message: "Email harus berupa string" })
  @IsEmail({}, { message: "Email tidak valid" })
  email: string;

  @IsNotEmpty({ message: "No. HP tidak boleh kosong" })
  @IsString({ message: "No. HP harus berupa string" })
  @MaxLength(13, { message: "No. HP tidak valid" })
  mobileNumber: string;

  @IsNotEmpty({ message: "Password tidak boleh kosong" })
  @IsUUID()
  rombel_id: string;

  @IsNotEmpty({ message: "Password tidak boleh kosong" })
  @IsUUID()
  rayon_id: string;

  @IsNotEmpty({ message: "Gender tidak boleh kosong" })
  gender: string;
}

export class DTOStudentById {
  @IsNotEmpty({ message: "Id tidak boleh kosong" })
  @IsUUID()
  id: string;
}
