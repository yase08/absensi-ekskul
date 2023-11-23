// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class DTOActivity {
  @IsNotEmpty({ message: "Ekskul tidak boleh kosong" })
  @IsUUID()
  ekskul_id: string;

  @IsNotEmpty({ message: "Ruangan tidak boleh kosong" })
  @IsUUID()
  room_id: string;

  @IsNotEmpty({ message: "Rombel tidak boleh kosong" })
  @IsUUID()
  rombel_id: string;

  @IsNotEmpty({ message: "Jadwal tidak boleh kosong" })
  @IsUUID()
  schedule_id: string;

  @IsNotEmpty({ message: "Waktu mulai tidak boleh kosong" })
  @IsDate({ message: "Waktu mulai harus berupa tanggal" })
  startTime: Date;

  @IsNotEmpty({ message: "Waktu selesai tidak boleh kosong" })
  @IsDate({ message: "Waktu selesai harus berupa tanggal" })
  endTime: Date;
}

export class DTOActivityById {
  @IsNotEmpty({ message: "ID Aktivitas tidak boleh kosong" })
  @IsUUID()
  id: string;
}
