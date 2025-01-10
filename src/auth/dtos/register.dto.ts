import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
export class RegisterDto {
  @IsNotEmpty()
  @Length(1, 30)
  @IsString()
  name: string;
  
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Length(6, 30)
  @IsString()
  password: string;
}
