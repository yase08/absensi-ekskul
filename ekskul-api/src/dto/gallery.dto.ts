// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { Transform } from "class-transformer";
import { IsNotEmpty, IsString, IsInt, IsArray, IsUUID } from "class-validator";

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
  @IsUUID()
  ekskul_id: string;
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
