// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, IsInt } from "class-validator";

export class DTOTask {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsInt()
  ekskul_id: number;
}

export class DTOTaskById {
  @IsNotEmpty()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsInt()
  id: number;
}
