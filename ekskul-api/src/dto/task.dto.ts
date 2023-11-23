// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class DTOTask {
  @IsNotEmpty({ message: "Nama tidak boleh kosong" })
  @IsString({ message: "Tipe data harus string" })
  name: string;

  @IsNotEmpty({ message: "Ekskul tidak boleh kosong" })
  @IsUUID()
  ekskul_id: string;
}

export class DTOTaskById {
  @IsNotEmpty({ message: "ID tidak boleh kosong" })
  @IsUUID()
  id: string;
}
