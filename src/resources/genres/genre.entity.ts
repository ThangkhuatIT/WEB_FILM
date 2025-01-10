import { Entity, PrimaryColumn, Column, Generated } from 'typeorm';

@Entity('genres')
export class Genre {
  @PrimaryColumn('uuid')
  @Generated('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;
}