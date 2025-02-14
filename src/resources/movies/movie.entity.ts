import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  Generated,
  ManyToOne,
  ManyToMany,
  BaseEntity,
  JoinTable,
  CreateDateColumn,
} from 'typeorm';
import { Episode } from '../episodes/episode.entity';
import { Genre } from '../genres/genre.entity';

@Entity('movies')
export class Movie extends BaseEntity {
  @PrimaryColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'date', nullable: true })
  releaseDate: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  posterUrl: string;
  @Column({ type: 'varchar', length: 255, nullable: true })
  posterId: string;

  @Column({
    type: 'decimal',
    precision: 3,
    scale: 1,
    nullable: true,
    default: 0,
  })
  rating: number;

  @Column({
    type: 'enum',
    enum: ['movie', 'series', 'trailer'],
    default: 'movie',
  })
  type: 'movie' | 'series' | 'trailer';

  @Column({ type: 'varchar', nullable: true, default: '' })
  seriesName: string;
  @Column({ type: 'varchar', nullable: true, default: '' })
  slug: string;

  @Column({ type: 'int', nullable: true, default: 1 })
  partNumber: number;

  @Column({ type: 'boolean', nullable: true, default: true })
  fistPart: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => Episode, (episode) => episode.movie)
  episodes: Episode[];
  @ManyToMany(() => Genre, (genre) => genre.movies, {
    cascade: true,
  })
  @JoinTable()
  genres: Genre[];
}
