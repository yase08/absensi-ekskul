// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class DTOEkskul {
  @IsNotEmpty({ message: "Nama tidak boleh kosong" })
  @IsString({ message: "Nama harus berupa string" })
  name: string;

  @IsNotEmpty({ message: "Kategori ekskul tidak boleh kosong" })
  @IsString({ message: "Kategori harus berupa string" })
  category: string;
}

export class DTOEkskulById {
  @IsNotEmpty({ message: "ID ekskul tidak boleh kosong" })
  @IsUUID()
  id: string;
}
