import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { UserHttpModule } from './resources/users/users-http.module';
import { AuthModule } from './auth/auth.module';
import { JwtMiddleware } from './middlewares/jwt.middleware';
import { TokenModule } from './resources/tokens/token.module';
import { UploadModule } from './upload/upload.module';
import { AUTH_GUARD, AuthGuard } from './guards/auth.guard';
import { MovieModule } from './resources/movies/movie.module';
import { GenreModule } from './resources/genres/genre.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    UserHttpModule,
    AuthModule,
    TokenModule,
    UploadModule,
    MovieModule,
    GenreModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(JwtMiddleware).forRoutes('*');
  }
}
