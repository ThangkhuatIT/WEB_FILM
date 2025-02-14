import { Repository } from 'typeorm';
import { BaseService } from '../base/base.service';
import { Genre } from './genre.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class GenreService extends BaseService<Genre> {
  constructor(@InjectRepository(Genre) genreRepository: Repository<Genre>) {
    super(genreRepository);
  }
}
