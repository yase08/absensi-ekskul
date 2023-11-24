// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class DTORayon {
  @IsNotEmpty({ message: "Nama rayon tidak boleh kosong" })
  @IsString({ message: "Nama rayon harus berupa string" })
  name: string;
}

export class DTORayonById {
  @IsNotEmpty({ message: "ID rayon tidak boleh kosong" })
  @IsUUID()
  id: string;
}