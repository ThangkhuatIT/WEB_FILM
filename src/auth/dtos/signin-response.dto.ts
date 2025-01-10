import { Expose, Transform, plainToInstance } from 'class-transformer';
import { UserResponseDto } from 'src/resources/users/dtos/user_response.dto';

export class SignInResponseDto {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;

  @Expose()
  @Transform(({ value }) => plainToInstance(UserResponseDto, value))
  user: UserResponseDto;
}
