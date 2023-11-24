// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { IsDate, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class DTOSchedule {
  @IsNotEmpty({ message: "Hari tidak boleh kosong" })
  @IsString({ message: "Hari harus berupa string" })
  day: string;
}

export class DTOScheduleById {
  @IsNotEmpty({ message: "Hari tidak boleh kosong" })
  @IsUUID()
  id: string;
}

export class DTOActivity {
  @IsNotEmpty({ message: "Hari tidak boleh kosong" })
  @IsUUID()
  schedule_id: string;

  @IsNotEmpty({ message: "Rombel tidak boleh kosong" })
  @IsUUID()
  rombel_id: string;

  @IsNotEmpty({ message: "Ruangan tidak boleh kosong" })
  @IsUUID()
  room_id: string;

  @IsNotEmpty({ message: "Ekstrakurikuler tidak boleh kosong" })
  @IsUUID()
  ekskul_id: string;

  @IsNotEmpty({ message: "Waktu mulai tidak boleh kosong" })
  @IsDate({ message: "Waktu mulai harus berupa tanggal" })
  startTime: Date;

  @IsNotEmpty({ message: "Waktu selesai tidak boleh kosong" })
  @IsDate({ message: "Waktu selesai harus berupa tanggal" })
  endTime: Date;
}

export class DTOActivityById {
  @IsNotEmpty({ message: "ID aktivitas tidak boleh kosong" })
  @IsString({ message: "ID aktivitas harus berupa string" })
  id: string;
}
