import { Entity, PrimaryColumn, ManyToOne, Generated } from 'typeorm';
import { Movie } from '../movies/movie.entity';
import { Genre } from '../genres/genre.entity';

@Entity('movie_genres')
export class MovieGenre {
  @PrimaryColumn('uuid')
  @Generated('uuid')
  id: string;

  @ManyToOne(() => Movie, { onDelete: 'CASCADE' })
  movie: Movie;

  @ManyToOne(() => Genre, { onDelete: 'CASCADE' })
  genre: Genre;
}
