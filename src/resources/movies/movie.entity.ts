import { Entity, PrimaryColumn, Column, OneToMany, Generated } from 'typeorm';
import { Episode } from '../episodes/episode.entity';

@Entity('movies')
export class Movie {
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

  @Column({ type: 'decimal', precision: 3, scale: 1, nullable: true })
  rating: number;

  @Column({ type: 'enum', enum: ['movie', 'series'], default: 'movie' })
  type: 'movie' | 'series';

  @Column({ type: 'uuid', nullable: true })
  parentId: string;

  @Column({ type: 'int', nullable: true })
  partNumber: number;

  @OneToMany(() => Episode, (episode) => episode.movie)
  episodes: Episode[];
}
