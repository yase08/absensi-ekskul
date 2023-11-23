// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { Type } from "class-transformer";
import {
  IsNotEmpty,
  IsInt,
  IsUUID,
  IsDate,
  IsArray,
  ValidateNested,
} from "class-validator";

export class DTOAssessment {
  @IsNotEmpty({ message: "Nilai tidak boleh kosong" })
  @IsInt({ message: "Nilai harus berupa angka" })
  grade: number;

  @IsNotEmpty({ message: "Tugas tidak boleh kosong" })
  @IsUUID()
  task_id: number;

  @IsNotEmpty({ message: "Siswa tidak boleh kosong" })
  @IsUUID()
  student_id: string;

  @IsNotEmpty({ message: "Waktu tidak boleh kosong" })
  @IsDate({ message: "Waktu harus berupa tanggal" })
  date: Date;
}

export class DTOAssessmentArray {
  @IsArray({ message: "Array data assessment tidak valid" })
  @ValidateNested({ each: true })
  @Type(() => DTOAssessment)
  attendanceArray: DTOAssessment[];
}

export class DTOAsessmentById {
  @IsNotEmpty({ message: "ID tidak boleh kosong" })
  @IsUUID()
  id: string;
}
