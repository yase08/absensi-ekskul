// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class DTOActivityProgram {
  @IsNotEmpty({ message: "Nama aktivitas program tidak boleh kosong" })
  @IsString({ message: "Ekskul harus berupa string" })
  activity: string;

  @IsNotEmpty({ message: "Tugas aktivitas program tidak boleh kosong" })
  @IsString({ message: "Tugas harus berupa string" })
  task: string;

  @IsNotEmpty({ message: "Tanggal mulai tidak boleh kosong" })
  @IsDate({ message: "Tanggal mulai harus berupa tanggal" })
  startDate: Date;

  @IsNotEmpty({ message: "Tanggal selesai tidak boleh kosong" })
  @IsDate({ message: "Tanggal akhir harus berupa tanggal" })
  endDate: Date;
}

export class DTOActivityProgramById {
  @IsNotEmpty({ message: "ID aktivitas program tidak boleh kosong" })
  @IsUUID()
  id: string;
}
