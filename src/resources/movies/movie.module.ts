import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { UploadModule } from 'src/upload/upload.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { GenreModule } from '../genres/genre.module';

@Module({
  imports: [UploadModule,TypeOrmModule.forFeature([Movie]),GenreModule],
  exports: [MovieService],
  providers: [MovieService],
  controllers: [MovieController],
})
export class MovieModule {}
