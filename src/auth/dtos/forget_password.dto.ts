import { IsByteLength, IsNotEmpty, IsString, Length } from 'class-validator';
export class ForGetPasswordDto {
  @IsNotEmpty()
  @IsString()
  userId: string;
  @IsNotEmpty()
  @IsString()
  @Length(6, 30)
  password: string;
}
