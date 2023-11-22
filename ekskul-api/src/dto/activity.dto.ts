// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty, IsString, IsUUID } from "class-validator";

export class DTOActivity {
  @IsNotEmpty()
  @IsUUID()
  ekskul_id: string;

  @IsNotEmpty()
  @IsUUID()
  room_id: string;

  @IsNotEmpty()
  @IsUUID()
  rombel_id: string;

  @IsNotEmpty()
  @IsUUID()
  schedule_id: string;

  @IsNotEmpty()
  @IsString()
  startTime: string;

  @IsNotEmpty()
  @IsString()
  endTime: string;
}

export class DTOActivityById {
  @IsNotEmpty()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsInt()
  id: number;
}
