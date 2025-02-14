import {
  BaseEntity,
  DeleteResult,
  FindOneOptions,
  FindOperator,
  In,
  Repository,
} from 'typeorm';
import { IBaseService } from './i.base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException } from '@nestjs/common';

export class BaseService<T extends BaseEntity> implements IBaseService<T> {
  constructor(protected readonly repository: Repository<T>) {}
  index(): Promise<T[]> {
    return this.repository.find();
  }

  findById(id: string): Promise<T | null> {
    return this.repository.findOne({ where: { id: id } } as FindOneOptions);
  }

  store(data: any): Promise<T> {
    return this.repository.save(data);
  }

  async update(id: string, data: any): Promise<T> {
    await this.repository.update(id, data);
    return this.findById(id);
  }

  delete(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
  findByIds(ids: string[]): Promise<T[] | null> {
    return this.repository.find({
      where: {
        id: In(ids),
      } as any,
    });
  }
}
