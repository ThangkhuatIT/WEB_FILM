import { Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryColumn } from 'typeorm';
import { Movie } from '../movies/movie.entity';

@Entity('episodes')
export class Episode {
  @PrimaryColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  videoUrl: string;

  @Column({ type: 'date', nullable: true })
  releaseDate: Date;
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => Movie, (movie) => movie.episodes, { onDelete: 'CASCADE' })
  movie: Movie;
}
