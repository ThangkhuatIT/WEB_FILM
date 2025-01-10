import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
} from 'typeorm';

@Entity('tokens')
export class Token extends BaseEntity {
  @PrimaryColumn('uuid')
  @Generated('uuid')
  id: string;
  @Column({ length: 50 })
  token: string;
  @Column({ type: 'enum', enum: Token, default: Token.USER })
  typeToken: Token;
  @CreateDateColumn({
    nullable: true,
  })
  createdAt: string;
}
