import { ConfigService } from '@nestjs/config';

export const config = (configService: ConfigService) => ({
  redis: {
    host: configService.get<string>('REDIS_HOST'),
    port: configService.get<number>('REDIS_PORT'),
  },
});