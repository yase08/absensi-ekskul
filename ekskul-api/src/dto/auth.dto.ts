// // Berfungsi untuk memvalidasi req.body / req.params / req.query

// import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

// export class DTOLogin {
//   @IsNotEmpty()
//   @IsEmail()
//   @IsString()
//   email: string;

//   @IsString()
//   @IsNotEmpty({ message: "password is not empty" })
//   @MinLength(8)
//   password: string;
// }

// export class DTOForgotPassword {
//   @IsNotEmpty()
//   @IsString()
//   @IsEmail()
//   email: string;
// }

// export class DTOResetToken {
//   @IsNotEmpty({ message: "password is not empty" })
//   @MinLength(8)
//   @IsString()
//   password: string;

//   @IsNotEmpty()
//   @IsString()
//   token: string;
// }
