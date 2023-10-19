// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class DTOEkskul {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  category: string;
}

export class DTOEkskulById {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  id: string;
}
