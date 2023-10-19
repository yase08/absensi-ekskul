// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { IsNotEmpty, IsString } from "class-validator";

export class DTORoom {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class DTORoomById {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  id: string;
}
