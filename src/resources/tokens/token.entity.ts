import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
} from 'typeorm';
import { TokenType } from './types/token';

@Entity('tokens')
export class Token extends BaseEntity {
  @PrimaryColumn('uuid')
  @Generated('uuid')
  id: string;
  @Column({ length: 50 })
  token: string;
  @Column({ type: 'enum', enum: TokenType, default: TokenType.ACCESS })
  type: Token;
  @CreateDateColumn({
    nullable: true,
  })
  createdAt: string;
}
