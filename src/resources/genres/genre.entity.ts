import {
  Entity,
  PrimaryColumn,
  Column,
  Generated,
  ManyToMany,
  BaseEntity,
  JoinTable,
} from 'typeorm';
import { Movie } from '../movies/movie.entity';

@Entity('genres')
export class Genre extends BaseEntity {
  @PrimaryColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true, default: '' })
  slug: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @ManyToMany(() => Movie, (movie) => movie.genres)
  movies: Movie[];
}
