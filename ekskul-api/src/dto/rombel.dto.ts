// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class DTORombel {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class DTORombelById {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  id: string;
}
