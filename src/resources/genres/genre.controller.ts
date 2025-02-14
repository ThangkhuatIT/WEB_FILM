import { Body, Controller, Get, Post } from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dtos/create-genre.dto';
import { Genre } from './genre.entity';
import { slug } from 'src/common/slug';

@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}
  @Post()
  async createGenre(@Body() createGenreDto: CreateGenreDto): Promise<Genre> {
    return this.genreService.store({
      ...createGenreDto,
      slug: slug(createGenreDto.name),
    });
  }
  @Get()
  async getAll(): Promise<Genre[]> {
    return this.genreService.index();
  }
}
