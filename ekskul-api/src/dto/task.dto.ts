// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { IsNotEmpty, IsString, IsInt } from "class-validator";

export class DTOTask {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  ekskul_id: number;

  @IsNotEmpty()
  @IsInt()
  author_id: number;

}

export class DTOTaskById {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  ekskul_id: number;

  @IsNotEmpty()
  @IsInt()
  author_id: number;

  @IsNotEmpty()
  @IsString()
  id: string;
}