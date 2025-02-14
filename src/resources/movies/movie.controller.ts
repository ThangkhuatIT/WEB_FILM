import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dtos/create_movie.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Movie } from './movie.entity';
import { UpdateMovieDto } from './dtos/update_movie.dto';
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}
  @Post()
  @Roles('admin', 'user')
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('posterUrl'))
  async create(
    @Body() createMovieDto: CreateMovieDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<Movie> {
    if (image) {
      createMovieDto.poster = image;
    }
    return await this.movieService.createMovie(createMovieDto);
  }
  @Put(':id')
  @Roles('admin', 'user')
  @UseGuards(AuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('posterUrl'))
  async update(
    @Body() updateMovieDto: UpdateMovieDto,
    @UploadedFile() image: Express.Multer.File,
    @Param('id') id: string,
  ): Promise<Movie> {
    if (image) {
      updateMovieDto.poster = image;
    }
    return await this.movieService.updateMovie(id, updateMovieDto);
  }
}
