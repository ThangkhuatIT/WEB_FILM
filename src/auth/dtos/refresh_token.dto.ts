import {  IsNotEmpty, IsString } from 'class-validator';
export class RefreshTokenDto {
  @IsNotEmpty()
  @IsString()
  userId: string;
  @IsNotEmpty()
  @IsString()
  token: string;
}
