// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class DTORayon {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class DTORayonById {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  id: string;
}
