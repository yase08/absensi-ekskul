// Berfungsi untuk memvalidasi req.body / req.params / req.query

import {
  IsNotEmpty,
  IsString,
  IsArray,
  IsUUID,
  IsDate,
} from "class-validator";

export class DTOGallery {
  @IsNotEmpty({ message: "Nama tidak boleh kosong" })
  @IsString({ message: "Tipe data harus string" })
  name: string;

  @IsNotEmpty({ message: "Tanggal tidak boleh kosong" })
  @IsDate({ message: "Tipe data harus tanggal" })
  date: Date;

  @IsNotEmpty({ message: "Gambar tidak boleh kosong" })
  @IsArray({ message: "Tipe data harus array" })
  images: Array<string>;

  @IsNotEmpty({ message: "Ekstrakurikuler tidak boleh kosong" })
  @IsUUID()
  ekskul_id: string;
}

export class DTOGalleryById {
  @IsNotEmpty({ message: "ID tidak boleh kosong" })
  @IsUUID()
  id: string;
}

export class DTOGalleryBySlug {
  @IsNotEmpty({ message: "Slug tidak boleh kosong" })
  @IsString({ message: "Tipe data harus string" })
  slug: string;
}
