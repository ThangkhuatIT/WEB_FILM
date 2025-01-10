import { UserRole } from 'src/type';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryColumn('uuid')
  @Generated('uuid')
  id: string;
  @Column({ length: 50 })
  name: string;
  @Column({ unique: true, length: 100 })
  email: string;

  @Column()
  password: string;
  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;
  @Column({ default: false })
  isActive: boolean;

  @CreateDateColumn({
    nullable: true,
  })
  createdAt: string;
  @UpdateDateColumn({
    nullable: true,
  })
  updatedAt: string;
  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }
}
