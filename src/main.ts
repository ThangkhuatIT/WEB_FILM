import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as multer from 'multer';
import * as bodyParser from 'body-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT', 3000);
  await app.init();
  app.enableCors();
  app.use(multer);
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.text({ type: 'text/html' }));
  app.use(bodyParser.json());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(port ?? 3000);
}
bootstrap();
