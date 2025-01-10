import { Column, Entity, Generated, ManyToOne, PrimaryColumn } from 'typeorm';
import { Movie } from '../movies/movie.entity';

@Entity('episodes')
export class Episode {
  @PrimaryColumn('uuid')
  @Generated('uuid')
  id: string;

  @ManyToOne(() => Movie, (movie) => movie.episodes, { onDelete: 'CASCADE' })
  movie: Movie;

  @Column({ type: 'int' })
  seasonNumber: number;

  @Column({ type: 'int' })
  episodeNumber: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'int', nullable: true })
  duration: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  videoUrl: string;

  @Column({ type: 'date', nullable: true })
  releaseDate: Date;
}
