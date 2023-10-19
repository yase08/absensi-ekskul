// Berfungsi untuk memvalidasi req.body / req.params / req.query

import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class DTOSchedule {
  @IsNotEmpty()
  @IsString()
  day: string;

}

export class DTOScheduleById {
  @IsNotEmpty()
  @IsString()
  day: string;
  
  @IsNotEmpty()
  @IsInt()
  id: number;
}

export class DTOActivity {
  @IsNotEmpty()
  @IsInt()
  schedule_id: number;

  @IsNotEmpty()
  @IsInt()
  rombel_id: number;

  @IsNotEmpty()
  @IsInt()
  room_id: number;
  
  @IsNotEmpty()
  @IsInt()
  ekskul_id: number;

  @IsNotEmpty()
  @IsString()
  startTime: string;

  @IsNotEmpty()
  @IsString()
  endTime: string;

}

export class DTOActivityById {
  @IsNotEmpty()
  @IsInt()
  schedule_id: number;

  @IsNotEmpty()
  @IsInt()
  rombel_id: number;

  @IsNotEmpty()
  @IsInt()
  room_id: number;
  
  @IsNotEmpty()
  @IsInt()
  ekskul_id: number;

  @IsNotEmpty()
  @IsString()
  startTime: string;

  @IsNotEmpty()
  @IsString()
  endTime: string;

  @IsNotEmpty()
  @IsString()
  id: string;
}
