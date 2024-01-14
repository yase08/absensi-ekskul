// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class DTORombel {
  @IsNotEmpty({ message: "Name rombel tidak boleh kosong" })
  @IsString({ message: "Name rombel harus berupa string" })
  name: string;
}

export class DTORombelById {
  @IsNotEmpty({ message: "ID tidak boleh kosong" })
  @IsUUID()
  id: string;
}
