// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, IsInt, IsArray } from "class-validator";

export class DTOGallery {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsArray()
  images: Array<string>;

  @IsNotEmpty()
  @IsInt()
  ekskul_id: number;
}

export class DTOGalleryById {
  @IsNotEmpty()
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  @IsInt()
  id: number;
}

export class DTOGalleryBySlug {
  @IsNotEmpty()
  @IsString()
  slug: string;
}