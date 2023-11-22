// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, IsInt, IsUUID } from "class-validator";

export class DTOTask {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsUUID()
  ekskul_id: string;
}

export class DTOTaskById {
  @IsNotEmpty()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsInt()
  id: number;
}
