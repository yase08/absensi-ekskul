// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { IsInt, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class DTORoom {
  @IsNotEmpty({ message: "Nama ruangan tidak boleh kosong" })
  @IsString({ message: "Nama ruangan harus berupa string" })
  name: string;
}

export class DTORoomById {
  @IsNotEmpty({ message: "Id ruangan tidak boleh kosong" })
  @IsUUID()
  id: string;
}
