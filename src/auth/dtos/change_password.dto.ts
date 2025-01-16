import { IsByteLength, IsNotEmpty, IsString, Length } from 'class-validator';
export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  userId: string;
  @IsNotEmpty()
  @IsString()
  @Length(6, 30)
  password: string;
  @IsNotEmpty()
  @IsString()
  oldPassword: string;
}
