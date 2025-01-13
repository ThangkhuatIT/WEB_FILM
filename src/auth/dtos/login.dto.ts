import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @Length(6, 30)
  @IsString()
  password: string;
}