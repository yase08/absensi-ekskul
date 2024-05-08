// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class DTOActivity {
  @IsNotEmpty({ message: "Ekskul tidak boleh kosong" })
  @IsUUID()
  ekskul_id: string;

  @IsNotEmpty({ message: "Ruangan tidak boleh kosong" })
  @IsUUID()
  room_id: string;

  @IsNotEmpty({ message: "Kelas tidak boleh kosong" })
  grade: string;

  @IsNotEmpty({ message: "Waktu mulai tidak boleh kosong" })
  @IsString({ message: "Waktu mulai tidak sesuai dengan format jam" })
  startTime: string;

  @IsNotEmpty({ message: "Waktu selesai tidak boleh kosong" })
  @IsString({ message: "Waktu selesai tidak sesuai dengan format jam" })
  endTime: string;
}

export class DTOActivityById {
  @IsNotEmpty({ message: "ID Aktivitas tidak boleh kosong" })
  @IsUUID()
  id: string;
}
