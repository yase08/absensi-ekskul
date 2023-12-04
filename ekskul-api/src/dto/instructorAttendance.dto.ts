// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class DTOInstructorAttendance {
  @IsNotEmpty({ message: "Kategori absensi tidak boleh kosong" })
  @IsString({ message: "Kategori absensi harus berupa string" })
  category: string;

  @IsNotEmpty({ message: "Waktu absensi tidak boleh kosong" })
  @IsString({ message: "Waktu absensi harus berupa tanggal" })
  date: Date;
}

export class DTOInstructorAttendanceById {
  @IsNotEmpty({ message: "ID absensi tidak boleh kosong" })
  @IsUUID()
  id: string;
}
