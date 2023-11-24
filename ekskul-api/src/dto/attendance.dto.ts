import { Type } from "class-transformer";
import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";

export class DTOAttendance {
  @IsNotEmpty({ message: "Kategori absensi tidak boleh kosong" })
  @IsString({ message: "Kategori absensi harus berupa string" })
  category: string;

  @IsNotEmpty({ message: "Tanggal absensi tidak boleh kosong" })
  @IsString({ message: "Tanggal absensi harus berupa string" })
  date: string;

  @IsNotEmpty({ message: "ID student tidak boleh kosong" })
  @IsUUID()
  student_id: string;
}

export class DTOAttendanceArray {
  // @IsArray({ message: "Array data absensi tidak valid" })
  @ValidateNested({ each: true })
  @Type(() => DTOAttendance)
  attendanceArray: DTOAttendance[];
}

export class DTOAttendanceById {
  @IsNotEmpty({ message: "ID absensi tidak boleh kosong" })
  @IsUUID()
  id: number;
}
